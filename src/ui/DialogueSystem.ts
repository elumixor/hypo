export interface DialogueOption {
  text: string;
  action?: () => void;
  nextDialogue?: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  options?: DialogueOption[];
  nextDialogue?: string;
}

export class DialogueSystem {
  private readonly dialogues: Map<string, DialogueNode> = new Map();
  private currentDialogue: DialogueNode | null = null;
  private onDialogueChange?: (dialogue: DialogueNode | null) => void;

  constructor() {
    // Add some dummy dialogue data
    this.addDialogue({
      id: "greeting",
      speaker: "Guard",
      text: "Halt! Who goes there?",
      options: [
        { text: "I'm a traveler", nextDialogue: "traveler" },
        { text: "None of your business", nextDialogue: "rude" },
        { text: "I'm here to help", nextDialogue: "help" },
      ],
    });

    this.addDialogue({
      id: "traveler",
      speaker: "Guard",
      text: "A traveler, eh? These lands are dangerous. Be careful out there.",
      options: [
        { text: "Thank you for the warning", nextDialogue: "thanks" },
        { text: "I can handle myself", nextDialogue: "confident" },
      ],
    });

    this.addDialogue({
      id: "rude",
      speaker: "Guard",
      text: "Watch your tongue, stranger! I could have you arrested.",
      options: [
        { text: "Sorry, I didn't mean to be rude", nextDialogue: "apologize" },
        { text: "Try it", nextDialogue: "fight" },
      ],
    });

    this.addDialogue({
      id: "help",
      speaker: "Guard",
      text: "Help? We could use someone with your skills. There are creatures attacking our town.",
      options: [
        { text: "I'll take care of it", nextDialogue: "accept" },
        { text: "What's in it for me?", nextDialogue: "reward" },
      ],
    });

    this.addDialogue({
      id: "thanks",
      speaker: "Guard",
      text: "Safe travels, friend. May the road be kind to you.",
    });

    this.addDialogue({
      id: "confident",
      speaker: "Guard",
      text: "I like your confidence! Still, watch yourself out there.",
    });

    this.addDialogue({
      id: "apologize",
      speaker: "Guard",
      text: "Apology accepted. Now move along before I change my mind.",
    });

    this.addDialogue({
      id: "fight",
      speaker: "Guard",
      text: "You've made a grave mistake, stranger!",
      options: [{ text: "[End Conversation]", action: () => this.endDialogue() }],
    });

    this.addDialogue({
      id: "accept",
      speaker: "Guard",
      text: "Excellent! Clear out the creatures and return to me. Good luck, hero.",
    });

    this.addDialogue({
      id: "reward",
      speaker: "Guard",
      text: "Coin, of course! And perhaps some equipment. Deal?",
      options: [
        { text: "Deal", nextDialogue: "accept" },
        { text: "Not interested", nextDialogue: "decline" },
      ],
    });

    this.addDialogue({
      id: "decline",
      speaker: "Guard",
      text: "Your loss. The creatures will only get stronger.",
    });
  }

  addDialogue(dialogue: DialogueNode) {
    this.dialogues.set(dialogue.id, dialogue);
  }

  startDialogue(dialogueId: string) {
    const dialogue = this.dialogues.get(dialogueId);
    if (dialogue) {
      this.currentDialogue = dialogue;
      this.onDialogueChange?.(this.currentDialogue);
      return true;
    }
    return false;
  }

  selectOption(optionIndex: number) {
    if (!this.currentDialogue?.options) return;

    const option = this.currentDialogue.options[optionIndex];
    if (!option) return;

    // Execute option action if provided
    option.action?.();

    // Move to next dialogue if specified
    if (option.nextDialogue) {
      this.startDialogue(option.nextDialogue);
    } else {
      this.endDialogue();
    }
  }

  endDialogue() {
    this.currentDialogue = null;
    this.onDialogueChange?.(null);
  }

  getCurrentDialogue(): DialogueNode | null {
    return this.currentDialogue;
  }

  isActive(): boolean {
    return this.currentDialogue !== null;
  }

  setOnDialogueChange(callback: (dialogue: DialogueNode | null) => void) {
    this.onDialogueChange = callback;
  }
}
