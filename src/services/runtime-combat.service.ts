import { EventEmitter } from "@elumixor/event-emitter";
import { Service, type TimeoutHandle, timeout } from "@engine";
import { type CharacterDefinition, getCharacterDefinition } from "data/character-definitions";
import { CharacterStatusService } from "services/character-status.service";

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Represents the current combat status of a character
 */
export interface CombatCharacterState {
  characterId: string;
  character: CharacterDefinition;

  // Current stats
  currentHealth: number;
  maxHealth: number;
  currentEnergy: number;
  maxEnergy: number;
  energyRegenRate: number;

  // Dash system
  currentDashCharges: number;
  maxDashCharges: number;
  dashChargeTimers: number[];
  dashDistance: number;
  dashRegenTime: number;

  // Ability cooldowns
  abilityCooldowns: Record<string, number>;
}

/**
 * Events emitted by RuntimeCombatService
 */
export interface CombatStateChangedEvent {
  character: CombatCharacterState;
}

export interface HealthChangedEvent {
  characterId: string;
  currentHealth: number;
  maxHealth: number;
  diff: number;
  isAlive: boolean;
}

export interface EnergyChangedEvent {
  characterId: string;
  currentEnergy: number;
  maxEnergy: number;
  diff: number;
}

export interface DashChargesChangedEvent {
  characterId: string;
  currentCharges: number;
  maxCharges: number;
  chargeTimers: readonly number[];
}

export interface AbilityCooldownChangedEvent {
  characterId: string;
  abilityName: string;
  cooldown: number;
  isReady: boolean;
}

export interface ActiveCharacterChangedEvent {
  previousCharacterId?: string;
  newCharacterId: string;
  character: CombatCharacterState;
}

/**
 * Runtime combat service that manages current player stats and abilities during combat
 * Centralizes health, energy, cooldowns, dash charges, etc.
 */
export class RuntimeCombatService extends Service {
  // Events
  readonly combatStateChanged = new EventEmitter<CombatStateChangedEvent>();
  readonly healthChanged = new EventEmitter<HealthChangedEvent>();
  readonly energyChanged = new EventEmitter<EnergyChangedEvent>();
  readonly dashChargesChanged = new EventEmitter<DashChargesChangedEvent>();
  readonly abilityCooldownChanged = new EventEmitter<AbilityCooldownChangedEvent>();
  readonly activeCharacterChanged = new EventEmitter<ActiveCharacterChangedEvent>();

  private readonly characterStatusService = this.require(CharacterStatusService);
  private readonly combatStates = new Map<string, CombatCharacterState>();
  private activeCharacterId?: string;
  private readonly energyRegenTimeouts = new Map<string, TimeoutHandle>();

  override async init() {
    await super.init();
    this.initializeCombatStates();
  }

  /**
   * Initialize combat states for all party members
   */
  private initializeCombatStates() {
    const partyMembers = this.characterStatusService.getPartyMembers();

    for (const characterId of partyMembers) {
      this.initializeCharacterCombatState(characterId);
    }

    // Set first party member as active (should be Helios by default)
    if (partyMembers.length > 0 && partyMembers[0]) {
      this.setActiveCharacter(partyMembers[0]);
    }

    // Listen to party changes
    this.characterStatusService.characterPartyChanged.subscribe(({ characterId, inParty }) => {
      if (inParty) {
        this.initializeCharacterCombatState(characterId);
      } else {
        this.removeCombatState(characterId);
      }
    });
  }

  /**
   * Initialize combat state for a specific character
   */
  private initializeCharacterCombatState(characterId: string) {
    const character = getCharacterDefinition(characterId);
    if (!character) return;

    const state: CombatCharacterState = {
      characterId,
      character,
      currentHealth: character.baseStats.health,
      maxHealth: character.baseStats.health,
      currentEnergy: character.baseStats.energy,
      maxEnergy: character.baseStats.energy,
      energyRegenRate: character.baseStats.energyRegen,
      currentDashCharges: character.baseStats.dashCharges,
      maxDashCharges: character.baseStats.dashCharges,
      dashChargeTimers: Array(character.baseStats.dashCharges).fill(0),
      dashDistance: character.baseStats.dashDistance,
      dashRegenTime: character.baseStats.dashRegenTime,
      abilityCooldowns: {},
    };

    this.combatStates.set(characterId, state);
    this.combatStateChanged.emit({ character: state });
  }

  /**
   * Remove combat state for a character (when they leave party)
   */
  private removeCombatState(characterId: string) {
    this.combatStates.delete(characterId);

    // Clear energy regen timeout
    const timeout = this.energyRegenTimeouts.get(characterId);
    if (timeout) {
      timeout.cancel();
      this.energyRegenTimeouts.delete(characterId);
    }

    // If this was the active character, switch to another
    if (this.activeCharacterId === characterId) {
      const partyMembers = this.characterStatusService.getPartyMembers();
      const nextCharacter = partyMembers.find((id) => id !== characterId);
      if (nextCharacter) {
        this.setActiveCharacter(nextCharacter);
      }
    }
  }

  /**
   * Get the current active character
   */
  getActiveCharacter(): CombatCharacterState | undefined {
    return this.activeCharacterId ? this.combatStates.get(this.activeCharacterId) : undefined;
  }

  /**
   * Get combat state for a specific character
   */
  getCharacterState(characterId: string): CombatCharacterState | undefined {
    return this.combatStates.get(characterId);
  }

  /**
   * Get all current combat states
   */
  getAllCharacterStates(): CombatCharacterState[] {
    return Array.from(this.combatStates.values());
  }

  /**
   * Set the active character
   */
  setActiveCharacter(characterId: string) {
    const state = this.combatStates.get(characterId);
    if (!state) return;

    const previousCharacterId = this.activeCharacterId;
    this.activeCharacterId = characterId;

    this.activeCharacterChanged.emit({
      previousCharacterId,
      newCharacterId: characterId,
      character: state,
    });
  }

  /**
   * Modify health for a character
   */
  modifyHealth(characterId: string, amount: number) {
    const state = this.combatStates.get(characterId);
    if (!state) return;

    const previousHealth = state.currentHealth;
    state.currentHealth = clamp(state.currentHealth + amount, 0, state.maxHealth);
    const diff = state.currentHealth - previousHealth;

    if (diff !== 0) {
      this.healthChanged.emit({
        characterId,
        currentHealth: state.currentHealth,
        maxHealth: state.maxHealth,
        diff,
        isAlive: state.currentHealth > 0,
      });
      this.combatStateChanged.emit({ character: state });
    }
  }

  /**
   * Modify energy for a character
   */
  modifyEnergy(characterId: string, amount: number) {
    const state = this.combatStates.get(characterId);
    if (!state) return;

    const previousEnergy = state.currentEnergy;
    state.currentEnergy = clamp(state.currentEnergy + amount, 0, state.maxEnergy);
    const diff = state.currentEnergy - previousEnergy;

    if (diff !== 0) {
      this.energyChanged.emit({
        characterId,
        currentEnergy: state.currentEnergy,
        maxEnergy: state.maxEnergy,
        diff,
      });
      this.combatStateChanged.emit({ character: state });

      // Handle energy regeneration delay if energy was consumed
      if (diff < 0) {
        this.handleEnergyConsumption(characterId);
      }
    }
  }

  /**
   * Handle energy consumption - stops regen temporarily
   */
  private handleEnergyConsumption(characterId: string) {
    // Cancel existing timeout
    const existingTimeout = this.energyRegenTimeouts.get(characterId);
    if (existingTimeout) {
      existingTimeout.cancel();
    }

    // Start new delay before energy regen resumes
    const delayTimeout = timeout(500, () => {
      this.energyRegenTimeouts.delete(characterId);
      // Energy regen will resume in the next update cycle
    });

    this.energyRegenTimeouts.set(characterId, delayTimeout);
  }

  /**
   * Use a dash charge for a character
   */
  useDashCharge(characterId: string): boolean {
    const state = this.combatStates.get(characterId);
    if (!state || state.currentDashCharges <= 0) return false;

    // Find first available charge and start its regen timer
    const chargeIndex = state.dashChargeTimers.indexOf(0);
    if (chargeIndex === -1) return false;

    state.dashChargeTimers[chargeIndex] = state.dashRegenTime;
    state.currentDashCharges = state.dashChargeTimers.filter((t) => t === 0).length;

    this.dashChargesChanged.emit({
      characterId,
      currentCharges: state.currentDashCharges,
      maxCharges: state.maxDashCharges,
      chargeTimers: [...state.dashChargeTimers],
    });
    this.combatStateChanged.emit({ character: state });

    return true;
  }

  /**
   * Start ability cooldown for a character
   */
  startAbilityCooldown(characterId: string, abilityName: string, cooldown: number) {
    const state = this.combatStates.get(characterId);
    if (!state) return;

    state.abilityCooldowns[abilityName] = cooldown;

    this.abilityCooldownChanged.emit({
      characterId,
      abilityName,
      cooldown,
      isReady: false,
    });
    this.combatStateChanged.emit({ character: state });
  }

  /**
   * Check if an ability is ready (not on cooldown)
   */
  isAbilityReady(characterId: string, abilityName: string): boolean {
    const state = this.combatStates.get(characterId);
    if (!state) return false;

    return (state.abilityCooldowns[abilityName] ?? 0) <= 0;
  }

  /**
   * Get remaining cooldown for an ability
   */
  getAbilityCooldown(characterId: string, abilityName: string): number {
    const state = this.combatStates.get(characterId);
    if (!state) return 0;

    return state.abilityCooldowns[abilityName] ?? 0;
  }

  /**
   * Check if character can use an ability (has energy and no cooldown)
   */
  canUseAbility(characterId: string, abilityName: string, energyCost: number = 0): boolean {
    const state = this.combatStates.get(characterId);
    if (!state) return false;

    return this.isAbilityReady(characterId, abilityName) && state.currentEnergy >= energyCost;
  }

  /**
   * Use an ability (consume energy and start cooldown)
   */
  useAbility(characterId: string, abilityName: string, energyCost: number, cooldown: number): boolean {
    if (!this.canUseAbility(characterId, abilityName, energyCost)) {
      return false;
    }

    this.modifyEnergy(characterId, -energyCost);
    if (cooldown > 0) {
      this.startAbilityCooldown(characterId, abilityName, cooldown);
    }

    return true;
  }

  /**
   * Reset all combat states (for new combat or respawn)
   */
  resetCombatStates() {
    for (const [_characterId, state] of this.combatStates) {
      // Reset health and energy to max
      state.currentHealth = state.maxHealth;
      state.currentEnergy = state.maxEnergy;

      // Reset dash charges
      state.currentDashCharges = state.maxDashCharges;
      state.dashChargeTimers.fill(0);

      // Clear all cooldowns
      state.abilityCooldowns = {};

      this.combatStateChanged.emit({ character: state });
    }

    // Clear energy regen timeouts
    for (const timeout of this.energyRegenTimeouts.values()) {
      timeout.cancel();
    }
    this.energyRegenTimeouts.clear();
  }

  override update(dt: number) {
    super.update(dt);

    const deltaTime = dt / 1000;

    for (const [characterId, state] of this.combatStates) {
      let stateChanged = false;

      // Update dash charge timers
      for (let i = 0; i < state.dashChargeTimers.length; i++) {
        const currentTimer = state.dashChargeTimers[i];
        if (currentTimer && currentTimer > 0) {
          state.dashChargeTimers[i] = Math.max(0, currentTimer - deltaTime);
          stateChanged = true;
        }
      }

      const newDashCharges = state.dashChargeTimers.filter((t) => t === 0).length;
      if (newDashCharges !== state.currentDashCharges) {
        state.currentDashCharges = newDashCharges;
        this.dashChargesChanged.emit({
          characterId,
          currentCharges: state.currentDashCharges,
          maxCharges: state.maxDashCharges,
          chargeTimers: [...state.dashChargeTimers],
        });
        stateChanged = true;
      }

      // Update ability cooldowns
      for (const [abilityName, cooldown] of Object.entries(state.abilityCooldowns)) {
        if (cooldown > 0) {
          const newCooldown = Math.max(0, cooldown - deltaTime);
          state.abilityCooldowns[abilityName] = newCooldown;

          this.abilityCooldownChanged.emit({
            characterId,
            abilityName,
            cooldown: newCooldown,
            isReady: newCooldown <= 0,
          });
          stateChanged = true;
        }
      }

      // Update energy regeneration (if not on delay)
      if (!this.energyRegenTimeouts.has(characterId) && state.currentEnergy < state.maxEnergy) {
        const energyGain = state.energyRegenRate * deltaTime;
        const previousEnergy = state.currentEnergy;
        state.currentEnergy = Math.min(state.maxEnergy, state.currentEnergy + energyGain);

        if (state.currentEnergy !== previousEnergy) {
          this.energyChanged.emit({
            characterId,
            currentEnergy: state.currentEnergy,
            maxEnergy: state.maxEnergy,
            diff: state.currentEnergy - previousEnergy,
          });
          stateChanged = true;
        }
      }

      if (stateChanged) {
        this.combatStateChanged.emit({ character: state });
      }
    }
  }

  override destroy() {
    super.destroy();

    // Clear all timeouts
    for (const timeout of this.energyRegenTimeouts.values()) {
      timeout.cancel();
    }
    this.energyRegenTimeouts.clear();
  }
}
