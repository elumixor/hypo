/**
 * Configuration interface for dash charges
 */
export interface DashChargeConfig {
  /** Maximum number of dash charges */
  maxCharges: number;
  /** Time in seconds to recharge one dash charge */
  chargeRegenTime: number;
  /** Distance traveled per dash */
  dashDistance: number;
  /** Duration of the dash movement in seconds */
  dashDuration: number;
}

/**
 * Character stats configuration
 */
export interface CharacterStats {
  dash: DashChargeConfig;
}

/**
 * Default character stats - configurable for different characters
 */
export const defaultCharacterStats: CharacterStats = {
  dash: {
    maxCharges: 2,
    chargeRegenTime: 0.5, // 0.5 seconds to regen one charge
    dashDistance: 8,
    dashDuration: 0.1,
  },
};
