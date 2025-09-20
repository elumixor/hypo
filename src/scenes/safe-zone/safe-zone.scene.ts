import { CollisionService, Scene } from "@engine";
import { CombatScene } from "scenes/combat/combat.scene";
import type { LevelConfig } from "services/level-progression.service";
import { LevelProgressionService } from "services/level-progression.service";
import { AmbientLight, DirectionalLight, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { NPC } from "./entities/npc";
import { SafeZonePortal } from "./entities/portal";
import { SafeZonePlayer } from "./entities/safe-zone-player";
import { SafeZoneInputMappingContext } from "./safe-zone-input-mapping.context";
import { ChatBubbleWidget } from "./ui/chat-bubble.widget";
import { type DialogueData, DialogueWidget } from "./ui/dialogue.widget";

export class SafeZoneScene extends Scene {
  override input = new SafeZoneInputMappingContext();

  private readonly player: SafeZonePlayer;
  private readonly npc: NPC;
  private readonly portal: SafeZonePortal;
  private readonly chatBubble: ChatBubbleWidget;
  private readonly dialogue: DialogueWidget;

  constructor(_levelConfig: LevelConfig) {
    super();

    // Add collision service
    this.addService(new CollisionService());

    // Add soft ambient lighting - fog not supported in this context

    // Add ambient lighting for general illumination
    const ambientLight = new AmbientLight(0x404040, 0.8);
    this.sceneRoot.add(ambientLight);

    // Add directional lighting for better depth
    const directionalLight = new DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    this.sceneRoot.add(directionalLight);

    // Create ground plane
    const groundGeometry = new PlaneGeometry(50, 50);
    const groundMaterial = new MeshStandardMaterial({ color: 0x4a5568 });
    const ground = new Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.sceneRoot.add(ground);

    // Create entities
    this.player = new SafeZonePlayer();
    this.npc = new NPC("Friendly Merchant");
    this.portal = new SafeZonePortal();

    // Position entities
    this.player.position.set(0, 0, 0);
    this.npc.position.set(-8, 0, 5);
    this.portal.position.set(8, 0, 8);

    this.addEntity(this.player);
    this.addEntity(this.npc);
    this.addEntity(this.portal);

    // Create UI widgets
    this.chatBubble = new ChatBubbleWidget();
    this.dialogue = new DialogueWidget();

    this.addWidget(this.chatBubble);
    this.addWidget(this.dialogue);
  }

  override async init() {
    await super.init();

    // Setup NPC interactions
    this.setupNPCInteraction();
    this.setupPortalInteraction();
    this.setupInputHandling();
  }

  private setupNPCInteraction() {
    this.on(this.npc.interactionAvailable, () => {
      this.chatBubble.showBubble(this.npc.position);
    });

    this.on(this.npc.interactionUnavailable, () => {
      this.chatBubble.hideBubble();
    });

    this.chatBubble.clicked.on("pointerdown", () => {
      if (this.npc.isPlayerNearby) {
        this.showNPCDialogue();
      }
    });
  }

  private setupPortalInteraction() {
    this.on(this.portal.interactionAvailable, () => {
      this.chatBubble.showBubble(this.portal.position);
    });

    this.on(this.portal.interactionUnavailable, () => {
      this.chatBubble.hideBubble();
    });

    this.chatBubble.clicked.on("pointerdown", () => {
      if (this.portal.isPlayerNearby) {
        this.showPortalDialogue();
      }
    });
  }

  private setupInputHandling() {
    this.on(this.input.interact, () => {
      // Check which entity we're near by checking if they have recent interaction events
      if (this.npc.isPlayerNearby) {
        this.showNPCDialogue();
      } else if (this.portal.isPlayerNearby) {
        this.showPortalDialogue();
      }
    });
  }

  private showNPCDialogue() {
    const npcDialogue: DialogueData = {
      text: "Welcome to the safe zone, traveler! I have supplies if you need them.",
      options: [
        {
          text: "Thank you!",
          action: () => {
            // Do nothing, just close dialogue
          },
        },
        {
          text: "Maybe later.",
          action: () => {
            // Do nothing, just close dialogue
          },
        },
      ],
    };

    this.dialogue.showDialogue(npcDialogue);
  }

  private showPortalDialogue() {
    const portalDialogue: DialogueData = {
      text: "Start fighting?",
      options: [
        {
          text: "Yes",
          action: () => {
            const progressionService = this.getService(LevelProgressionService);
            const nextLevel = progressionService.nextLevel();
            this.game.loadScene(new CombatScene(nextLevel));
          },
        },
        {
          text: "No",
          action: () => {
            // Do nothing, just close dialogue
          },
        },
      ],
    };

    this.dialogue.showDialogue(portalDialogue);
  }
}
