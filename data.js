// MORK BORG tables, lifted from the data files of codyrioux/owlbear-morkborg.
// Game content used under the MORK BORG Third Party License. See README.
// Loaded as a plain script so the sheet never needs fetch(), which keeps it
// working inside a sandboxed Owlbear iframe and when opened straight off disk.
const MB_DATA = {
 "classes": [
  {
   "id": "fanged-deserter",
   "name": "Fanged Deserter",
   "hpDie": 10,
   "omenDie": "d2",
   "desc": "You were a savage brute in an uncaring army. You deserted with teeth bared.",
   "traits": "Gnashing teeth, feral rage, covered in dried mud and scars."
  },
  {
   "id": "gutterborn-scum",
   "name": "Gutterborn Scum",
   "hpDie": 6,
   "omenDie": "d2",
   "desc": "An ill-fated wretch born in the filth beneath Galgenbeck.",
   "traits": "Twitching eye, stained rags, pockets full of sharp trinkets."
  },
  {
   "id": "esoteric-hermit",
   "name": "Esoteric Hermit",
   "hpDie": 4,
   "omenDie": "d4",
   "desc": "A crazed scholar who speaks to fungi and reads secrets in entrails.",
   "traits": "Wild unwashed beard, muttering prophecies of the two-headed basilisks."
  },
  {
   "id": "wretched-royalty",
   "name": "Wretched Royalty",
   "hpDie": 6,
   "omenDie": "d2",
   "desc": "Heir to a kingdom reduced to dust and cinders.",
   "traits": "Tattered velvet coat, dull brass signet ring, haughty sneer."
  },
  {
   "id": "heretical-priest",
   "name": "Heretical Priest",
   "hpDie": 8,
   "omenDie": "d4",
   "desc": "Cast out of the Cathedral of the Two-Headed Basilisks for forbidden preachings.",
   "traits": "Self-inflicted flagellation marks, charred holy symbol."
  },
  {
   "id": "occult-herbmaster",
   "name": "Occult Herbmaster",
   "hpDie": 6,
   "omenDie": "d2",
   "desc": "Maker of poisonous decoctions and bitter medicines in the dark marshes.",
   "traits": "Fingers permanently stained violet, glass vials rattling in pockets."
  },
  {
   "id": "classless-scum",
   "name": "Classless Scum",
   "hpDie": 8,
   "omenDie": "d2",
   "desc": "Just another desperate wretch struggling to breathe before the world ends.",
   "traits": "Hollow cheeks, desperate glare, carrying only what was scavenged."
  }
 ],
 "weapons": [
  {
   "id": "femur",
   "name": "Femur",
   "type": "melee",
   "damageDie": "d4",
   "costSilver": 0,
   "special": "Crude bone, worthless"
  },
  {
   "id": "knife",
   "name": "Knife",
   "type": "melee",
   "damageDie": "d4",
   "costSilver": 10,
   "special": "Concealable blade"
  },
  {
   "id": "shortsword",
   "name": "Shortsword",
   "type": "melee",
   "damageDie": "d4",
   "costSilver": 20,
   "special": "Thrusting blade"
  },
  {
   "id": "staff",
   "name": "Staff",
   "type": "melee",
   "damageDie": "d4",
   "costSilver": 5,
   "special": "Blunt wood"
  },
  {
   "id": "sling",
   "name": "Sling",
   "type": "ranged",
   "damageDie": "d4",
   "costSilver": 8,
   "special": "Leather strap and stone"
  },
  {
   "id": "shortbow",
   "name": "Shortbow",
   "type": "ranged",
   "damageDie": "d4",
   "costSilver": 13,
   "special": "Fires arrows"
  },
  {
   "id": "whip",
   "name": "Whip",
   "type": "melee",
   "damageDie": "d2",
   "costSilver": 5,
   "special": "Cracking lash"
  },
  {
   "id": "club",
   "name": "Club",
   "type": "melee",
   "damageDie": "d6",
   "costSilver": 10,
   "special": "Heavy wooden cudgel"
  },
  {
   "id": "handaxe",
   "name": "Handaxe",
   "type": "melee",
   "damageDie": "d6",
   "costSilver": 15,
   "special": "Chopping axe"
  },
  {
   "id": "mace",
   "name": "Mace",
   "type": "melee",
   "damageDie": "d6",
   "costSilver": 25,
   "special": "Flanged iron head"
  },
  {
   "id": "sword",
   "name": "Sword",
   "type": "melee",
   "damageDie": "d6",
   "costSilver": 30,
   "special": "Single-edged iron blade"
  },
  {
   "id": "warhammer",
   "name": "Warhammer",
   "type": "melee",
   "damageDie": "d6",
   "costSilver": 30,
   "special": "Spiked war hammer"
  },
  {
   "id": "bow",
   "name": "Bow",
   "type": "ranged",
   "damageDie": "d6",
   "costSilver": 25,
   "special": "Recurve hunting bow"
  },
  {
   "id": "battle-axe",
   "name": "Battle axe",
   "type": "melee",
   "damageDie": "d8",
   "costSilver": 35,
   "special": "Heavy double-bitted axe"
  },
  {
   "id": "flail",
   "name": "Flail",
   "type": "melee",
   "damageDie": "d8",
   "costSilver": 35,
   "special": "Spiked iron ball and chain"
  },
  {
   "id": "crossbow",
   "name": "Crossbow",
   "type": "ranged",
   "damageDie": "d8",
   "costSilver": 40,
   "special": "DR12 Presence to aim, shoots bolts"
  },
  {
   "id": "zweihander",
   "name": "Zweihänder",
   "type": "melee",
   "damageDie": "d10",
   "costSilver": 60,
   "special": "Requires 2 hands to wield"
  }
 ],
 "armor": {
  "tiers": [
   {
    "tier": 0,
    "name": "Rags & Flayed Skins",
    "damageReduction": "0",
    "slots": 0,
    "costSilver": 0,
    "defensePenalty": 0,
    "agilityPenalty": 0,
    "preventsPowers": false,
    "description": "Filthy tunics and crude hides offering no protection"
   },
   {
    "tier": 1,
    "name": "Padded Leather",
    "damageReduction": "-d2",
    "slots": 1,
    "costSilver": 20,
    "defensePenalty": 0,
    "agilityPenalty": 0,
    "preventsPowers": false,
    "description": "Boiled leather and stitched gambeson. Absorbs d2 damage."
   },
   {
    "tier": 2,
    "name": "Rusty Chainmail",
    "damageReduction": "-d4",
    "slots": 1,
    "costSilver": 100,
    "defensePenalty": 2,
    "agilityPenalty": 2,
    "preventsPowers": true,
    "description": "Interlocking iron rings. Absorbs d4 damage. +2 DR on Agility tests (including defense). Cannot wield Powers or read scrolls."
   },
   {
    "tier": 3,
    "name": "Dented Plate Mail",
    "damageReduction": "-d6",
    "slots": 1,
    "costSilver": 200,
    "defensePenalty": 2,
    "agilityPenalty": 4,
    "preventsPowers": true,
    "description": "Heavy hammered plate. Absorbs d6 damage. +4 DR on Agility tests, defense is DR+2. Cannot wield Powers or read scrolls."
   }
  ],
  "shield": {
   "name": "Shield",
   "damageReduction": "-1",
   "slots": 1,
   "costSilver": 20,
   "description": "Wood and iron round shield. Absorbs 1 damage or can be sacrificed/broken to entirely negate 1 attack."
  }
 },
 "equipment": [
  {
   "id": "backpack",
   "name": "Backpack",
   "slots": 0,
   "quantity": 1,
   "costSilver": 6,
   "description": "Holds 7 normal-sized items"
  },
  {
   "id": "sack",
   "name": "Sack",
   "slots": 0,
   "quantity": 1,
   "costSilver": 3,
   "description": "Holds 10 normal sized items"
  },
  {
   "id": "small-wagon",
   "name": "Small Wagon",
   "slots": 0,
   "quantity": 1,
   "costSilver": 25,
   "description": "Wooden cart for hauling goods and corpses"
  },
  {
   "id": "bear-trap",
   "name": "Bear Trap",
   "slots": 1,
   "quantity": 1,
   "costSilver": 20,
   "description": "Presence DR14 to spot, d8 damage"
  },
  {
   "id": "blanket",
   "name": "Blanket",
   "slots": 1,
   "quantity": 1,
   "costSilver": 4,
   "description": "Coarse wool blanket"
  },
  {
   "id": "caltrops",
   "name": "Caltrops",
   "slots": 1,
   "quantity": 2,
   "stackSize": 2,
   "costSilver": 7,
   "description": "d4 damage + infection on 1 in 6"
  },
  {
   "id": "chalk",
   "name": "Chalk",
   "slots": 1,
   "quantity": 10,
   "stackSize": 10,
   "costSilver": 1,
   "description": "10 sticks of white chalk"
  },
  {
   "id": "chewing-tobacco",
   "name": "Chewing Tobacco",
   "slots": 1,
   "quantity": 4,
   "stackSize": 4,
   "costSilver": 1,
   "description": "Bitter dried tobacco leaves"
  },
  {
   "id": "crowbar",
   "name": "Crowbar",
   "slots": 1,
   "quantity": 1,
   "costSilver": 8,
   "description": "Forged iron pry bar"
  },
  {
   "id": "crucifix-silver",
   "name": "Silver Crucifix",
   "slots": 1,
   "quantity": 1,
   "costSilver": 60,
   "description": "Blessed silver symbol of the Basilisk"
  },
  {
   "id": "crucifix-wood",
   "name": "Wooden Crucifix",
   "slots": 1,
   "quantity": 1,
   "costSilver": 8,
   "description": "Carved wooden symbol"
  },
  {
   "id": "dried-food",
   "name": "Dried Food",
   "slots": 1,
   "quantity": 4,
   "stackSize": 4,
   "costSilver": 1,
   "description": "Hardtack and salted meat (1 day per ration)"
  },
  {
   "id": "exquisite-perfume",
   "name": "Exquisite Perfume",
   "slots": 1,
   "quantity": 1,
   "costSilver": 25,
   "description": "Masks the stench of rot and death"
  },
  {
   "id": "firesteel",
   "name": "Firesteel",
   "slots": 1,
   "quantity": 1,
   "costSilver": 4,
   "description": "Flint and steel for striking sparks"
  },
  {
   "id": "grappling-hook",
   "name": "Grappling Hook",
   "slots": 1,
   "quantity": 1,
   "costSilver": 12,
   "description": "Four-pronged iron climbing hook"
  },
  {
   "id": "hammer",
   "name": "Hammer",
   "slots": 1,
   "quantity": 1,
   "costSilver": 8,
   "description": "Heavy builder's hammer"
  },
  {
   "id": "heavy-chain",
   "name": "Heavy Chain",
   "slots": 1,
   "quantity": 1,
   "costSilver": 10,
   "description": "15 feet of welded iron chain"
  },
  {
   "id": "iron-nails",
   "name": "Iron Nails",
   "slots": 1,
   "quantity": 10,
   "stackSize": 10,
   "costSilver": 10,
   "description": "10 heavy forged iron nails"
  },
  {
   "id": "ladder",
   "name": "Ladder",
   "slots": 2,
   "quantity": 1,
   "costSilver": 7,
   "description": "Bulky wooden ladder"
  },
  {
   "id": "lantern-oil",
   "name": "Lantern Oil",
   "slots": 1,
   "quantity": 1,
   "costSilver": 5,
   "description": "Fuel lasting Presence + 6 hours"
  },
  {
   "id": "lard",
   "name": "Lard",
   "slots": 1,
   "quantity": 1,
   "costSilver": 5,
   "description": "May function as 5 meals"
  },
  {
   "id": "large-iron-hook",
   "name": "Large Iron Hook",
   "slots": 1,
   "quantity": 1,
   "costSilver": 9,
   "description": "Butcher's iron hook"
  },
  {
   "id": "lockpicks",
   "name": "Lockpicks",
   "slots": 1,
   "quantity": 1,
   "costSilver": 5,
   "description": "Set of twisted wire picks"
  },
  {
   "id": "magnesium-strip",
   "name": "Magnesium Strip",
   "slots": 1,
   "quantity": 4,
   "stackSize": 4,
   "costSilver": 4,
   "description": "Blinds eyes or ignites underwater"
  },
  {
   "id": "manacles",
   "name": "Manacles",
   "slots": 1,
   "quantity": 1,
   "costSilver": 10,
   "description": "Heavy iron wrist shackles with key"
  },
  {
   "id": "mattress",
   "name": "Mattress",
   "slots": 2,
   "quantity": 1,
   "costSilver": 3,
   "description": "Bulky straw-filled bedroll"
  },
  {
   "id": "meat-cleaver",
   "name": "Meat Cleaver",
   "slots": 1,
   "quantity": 1,
   "costSilver": 15,
   "description": "Heavy butcher blade"
  },
  {
   "id": "medicine-box",
   "name": "Medicine Box",
   "slots": 1,
   "quantity": 1,
   "costSilver": 15,
   "description": "Stops bleeding/infection and +d6 HP. Presence + 4 uses"
  },
  {
   "id": "metal-file",
   "name": "Metal File",
   "slots": 1,
   "quantity": 1,
   "costSilver": 10,
   "description": "Hardened steel rasp"
  },
  {
   "id": "mirror",
   "name": "Mirror",
   "slots": 1,
   "quantity": 1,
   "costSilver": 15,
   "description": "Small polished silvered glass"
  },
  {
   "id": "muzzle",
   "name": "Muzzle",
   "slots": 1,
   "quantity": 1,
   "costSilver": 6,
   "description": "Leather cage for beast jaws"
  },
  {
   "id": "noose",
   "name": "Noose",
   "slots": 1,
   "quantity": 1,
   "costSilver": 5,
   "description": "Knotted hangman rope"
  },
  {
   "id": "oil-lamp",
   "name": "Oil Lamp",
   "slots": 1,
   "quantity": 1,
   "costSilver": 10,
   "description": "Tin oil lantern"
  },
  {
   "id": "poison-black",
   "name": "Poison (Black)",
   "slots": 1,
   "quantity": 3,
   "stackSize": 3,
   "costSilver": 20,
   "description": "Toughness DR14 or d6 damage + blind for one hour. 3 doses"
  },
  {
   "id": "poison-red",
   "name": "Poison (Red)",
   "slots": 1,
   "quantity": 3,
   "stackSize": 3,
   "costSilver": 20,
   "description": "Toughness DR12 or d10 damage. 3 doses"
  },
  {
   "id": "preserved-corpse",
   "name": "Preserved Corpse",
   "slots": 2,
   "quantity": 1,
   "costSilver": 70,
   "description": "Pickled human remains"
  },
  {
   "id": "rope",
   "name": "Rope",
   "slots": 1,
   "quantity": 1,
   "costSilver": 4,
   "description": "30 feet of hemp rope"
  },
  {
   "id": "salt",
   "name": "Salt",
   "slots": 1,
   "quantity": 1,
   "costSilver": 4,
   "description": "Bag of coarse rock salt"
  },
  {
   "id": "scissors",
   "name": "Scissors",
   "slots": 1,
   "quantity": 1,
   "costSilver": 9,
   "description": "Iron shears"
  },
  {
   "id": "sharp-needle",
   "name": "Sharp Needle",
   "slots": 1,
   "quantity": 10,
   "stackSize": 10,
   "costSilver": 3,
   "description": "10 sewing needles"
  },
  {
   "id": "tent",
   "name": "Tent",
   "slots": 2,
   "quantity": 1,
   "costSilver": 12,
   "description": "Canvas shelter for two"
  },
  {
   "id": "toolbox",
   "name": "Toolbox",
   "slots": 2,
   "quantity": 1,
   "costSilver": 20,
   "description": "10 nails, hammer, small saw, tongs"
  },
  {
   "id": "torch",
   "name": "Torch",
   "slots": 1,
   "quantity": 4,
   "stackSize": 4,
   "costSilver": 2,
   "description": "Pitch-soaked torch, burns for 1 hour"
  },
  {
   "id": "waterskin",
   "name": "Waterskin",
   "slots": 1,
   "quantity": 1,
   "costSilver": 4,
   "description": "4 days of water"
  },
  {
   "id": "arrows",
   "name": "Arrows",
   "slots": 1,
   "quantity": 20,
   "stackSize": 20,
   "isAmmunition": true,
   "costSilver": 10,
   "description": "20 fledged arrows (first stack consumes 0 slots)"
  },
  {
   "id": "crossbow-bolts",
   "name": "Crossbow Bolts",
   "slots": 1,
   "quantity": 10,
   "stackSize": 10,
   "isAmmunition": true,
   "costSilver": 10,
   "description": "10 iron quarrels (first stack consumes 0 slots)"
  },
  {
   "id": "sling-bullets",
   "name": "Sling Bullets",
   "slots": 1,
   "quantity": 20,
   "stackSize": 20,
   "isAmmunition": true,
   "costSilver": 5,
   "description": "20 cast lead bullets (first stack consumes 0 slots)"
  }
 ],
 "scrolls": [
  {
   "id": "unclean-1",
   "name": "Palms Open the Southern Gate",
   "type": "unclean",
   "description": "A ball of fire hits d2 creatures dealing d8 damage per creature."
  },
  {
   "id": "unclean-2",
   "name": "Tongue of Eris",
   "type": "unclean",
   "description": "A creature of your choice is confused for 10 minutes."
  },
  {
   "id": "unclean-3",
   "name": "Te-le-kin-esis",
   "type": "unclean",
   "description": "Move an object up to d10×10 feet for d6 minutes."
  },
  {
   "id": "unclean-4",
   "name": "Lucy-fires Levitation",
   "type": "unclean",
   "description": "Hover for Presence + d10 rounds."
  },
  {
   "id": "unclean-5",
   "name": "Daemon of Capillaries",
   "type": "unclean",
   "description": "One creature suffocates for d6 rounds, losing d4 HP per round."
  },
  {
   "id": "unclean-6",
   "name": "Nine Violet Signs Unknot the Storm",
   "type": "unclean",
   "description": "Produce d2 lightning bolts dealing d6 damage each."
  },
  {
   "id": "unclean-7",
   "name": "Metzhuotl Blind Your Eye",
   "type": "unclean",
   "description": "A creature becomes invisible for d6 rounds or until it is damaged, attacking/defending with DR6."
  },
  {
   "id": "unclean-8",
   "name": "Foul Psychopomp",
   "type": "unclean",
   "description": "Summon (d6): 1–3: d4 skeletons, 4–6: d4 zombies."
  },
  {
   "id": "unclean-9",
   "name": "Eyelid Blinds the Mind",
   "type": "unclean",
   "description": "d4 creatures fall asleep for one hour unless they succeed a DR14 test."
  },
  {
   "id": "unclean-10",
   "name": "Death",
   "type": "unclean",
   "description": "All creatures within 30 feet lose a total of 4d10 HP."
  },
  {
   "id": "sacred-1",
   "name": "Grace of a Dead Saint",
   "type": "sacred",
   "description": "d2 creatures regain d10 HP each."
  },
  {
   "id": "sacred-2",
   "name": "Grace for a Sinner",
   "type": "sacred",
   "description": "A creature of your choice gets +d6 on one roll (damage, tests etc.)."
  },
  {
   "id": "sacred-3",
   "name": "Whispers Pass the Gate",
   "type": "sacred",
   "description": "Ask three questions to a deceased creature."
  },
  {
   "id": "sacred-4",
   "name": "Aegis of Sorrow",
   "type": "sacred",
   "description": "A creature of your choice gains 2d6 extra HP for 10 rounds."
  },
  {
   "id": "sacred-5",
   "name": "Unmet Fate",
   "type": "sacred",
   "description": "One creature, dead for no more than a week, is awakened with terrible memories."
  },
  {
   "id": "sacred-6",
   "name": "Bestial Speech",
   "type": "sacred",
   "description": "You may speak with animals for d20 minutes."
  },
  {
   "id": "sacred-7",
   "name": "False Dawn / Night's Chariot",
   "type": "sacred",
   "description": "Light or pitch black for 3d10 minutes."
  },
  {
   "id": "sacred-8",
   "name": "Hermetic Step",
   "type": "sacred",
   "description": "You find all traps in your path for 2d10 minutes."
  },
  {
   "id": "sacred-9",
   "name": "Roskoe's Consuming Glare",
   "type": "sacred",
   "description": "d4 creatures lose d8 HP each."
  },
  {
   "id": "sacred-10",
   "name": "Enochian Syntax",
   "type": "sacred",
   "description": "One creature blindly obeys a single command."
  }
 ]
};
