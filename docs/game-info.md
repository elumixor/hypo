### HYPO

# Narrative

Action takes place in a futuristic sci-fi + fantasy world.
It's a unique universe consisting of 6 worlds: Wrath, Desire, Greed, Attachment, Envy, and Pride.

In this universe a despotic regime rules, with the Empire of Pride controlling everything.
They murdered your parents and now you seek revenge.

Your goal is to raise form the world of Wrath and overthrow the Empire of Pride.
Each time you die, you get teleported back to the world of Wrath.

# Core gameplay

- Action roguelike/rpg: you control a character and fight against enemies
- 3D scene, camera that is close to isometric, but not quite, it's perspective with special FOV
- The character can move around, has basic/enhanced attacks and also can use different skills
- You can also use dash and block

# Level progression

- The game is divided into 8 worlds
- Each world has a section of regular levels with regular enemies, and then a boss fight
- The levels are custom made, and then randomly sampled during each playthrough
- There are safe zones where you can talk to companions/NPCs and prepare for the fight
- Next, there are 5 regular levels, and a boss fight
- After winning the boss fight, you transition to the next world

# Experience and leveling progression

- When character kills enemies, they drop experience particles, that you pick up to
  gain experience and level up

# Skills and leveling up

- You have different skill trees
- There are 4 characters in the game
- Each character

# Enemies and bosses

- There are different types of enemies with different logic and attacks
- Each world has its own set of enemies
- Each world has a unique boss with its own mechanics

# Skills and skill trees

- Each character has unique light attack skill tree, heavy attack skill tree, block skill tree, and dodge skill tree.
- They also have 4 unique skills, each one with their own skill tree
- Character skills (not attacks/blocks/dodges) require _progressing in the character relations_ to unlock, use,
  and level up

# Switching characters

- You start as the main character Helio
- During playthrough you can find and pick up other characters into your party
- They stay with until the first death
- You can switch between characters during the fight to use their attacks, abilities, and skills

# Companions and relations

- You develop relations with companions during the game by talking to them in safe zones

# Art style

- Very simple, low poly 3D models (unity asset store), or even primitive cubes/spheres
- Simple animations
- Heavy use of particles and VFX to create juicy feeling and feedback
  (also cause we cannot do complex models and animations in this time frame)
- Simple UI, with some animations and effects

# Tech stack

- Three.js as main 3D engine
- PIXI.js for 2D elements, like UI
- TypeScript
- Vite as bundler
- Biome as linter/formatter
- Bundled and deployed as a single HTML file with all assets inlined, without any external dependencies

# Additional Requirements

- The game should be playable on mobile, vertical orientation, if possible also later add landscape
- There should be a possibility to play with just a single finger, with automatic usage of skills and attacks,
  or even automatic movement, and only swapping the playable characters
