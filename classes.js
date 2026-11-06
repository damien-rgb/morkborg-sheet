/* The six optional classes, plus no class at all.
 *
 * Taken from the MÖRK BORG rulebook, pages 46 to 57, because the tables this
 * sheet inherited had only a name, a hit die and some flavour text. That meant
 * a rolled Wretched Royalty turned up with none of the two things the class is
 * supposed to start with, which is what sent me back to the book.
 *
 * Each class says: how abilities are rolled, starting silver, the omen die, the
 * hit point die, which die to roll on the weapon and armour tables, and the
 * class's own table of starting features.
 *
 * Game content used under the MÖRK BORG Third Party License.
 */

/* Ability rolls are written as [dice, sides, bonus]. 3d6 is the normal roll. */

const MB_CLASSES = [
  {
    name: 'Fanged Deserter',
    blurb: 'You ran from an army that would have killed you, and you have been running ever since.',
    abilities: { strength: 2, agility: -1, presence: -1, toughness: 0 },
    abilityNote: 'Built like a bull. Not a bright spark: normal Agility tests are DR14, except defending.',
    silver: { dice: 2, sides: 6, times: 10 },
    omenDie: 2,
    hpDie: 10,
    weaponDie: 10,
    armourDie: 4,
    illiterate: true,
    always: [
      { name: 'Bite attack', detail: 'DR10 to attack, d6 damage. You must be close. On a 1 or 2 on a d6 the enemy gets a free attack.' }
    ],
    featurePicks: 1,
    features: [
      { name: 'Crumpled Monster Mask', detail: 'Lesser creatures check Morale every round while you wear it.' },
      { name: 'The Brown Scimitar of Galgenbeck', detail: 'd6 damage, DR10 attack and defence while you wield it. 1 in 6 a wounded enemy dies of sepsis in 10 minutes.' },
      { name: 'Wizard Teeth', detail: 'Before battle roll a d6 for each of the four teeth. Every 6 makes one of your attacks deal maximum damage.' },
      { name: "Old Sigürd's Sling", detail: '2d4 damage. Needs fist-sized rocks.' },
      { name: 'Ancient Gore-Hound', detail: 'Attacks DR10, bite d6. Defends DR12, 10 HP. Frenzied around goblins and berserkers.' },
      { name: "The Shoe of Death's Horse", detail: 'DR10 to hit, d4 damage. 1 in 6 it kills a small or medium creature outright. Returns to your hand.' }
    ]
  },

  {
    name: 'Gutterborn Scum',
    blurb: 'An ill star smiled upon your birth. An honest day\'s work was never an option.',
    abilities: { strength: -2, agility: 0, presence: 0, toughness: 0 },
    abilityNote: 'Small and stealthy. All Presence and Agility tests are DR10 instead of DR12.',
    silver: { dice: 1, sides: 6, times: 10 },
    omenDie: 2,
    hpDie: 6,
    weaponDie: 6,
    armourDie: 2,
    featurePicks: 1,
    features: [
      { name: "Coward's Jab", detail: 'Attacking by surprise, test Agility DR10. On a success you automatically hit with a light one-handed weapon for normal damage +3.' },
      { name: 'Filthy Fingersmith', detail: 'Pick pockets and locks with a DR8 Agility test. You also begin with lockpicks.' },
      { name: 'Abominable Gob Lobber', detail: 'Spit d2 times per fight, Presence DR8. Target is blinded and retching for d4 rounds. Anyone watching tests Toughness not to vomit: players DR10, enemies DR12.' },
      { name: 'Escaping Fate', detail: 'Every time you use an omen there is a 50% chance it is not spent.' },
      { name: 'Excretal Stealth', detail: 'Hidden in muck, debris or filth, it takes a DR16 Presence test to notice you.' },
      { name: 'Dodging Death', detail: 'The first time you get better, roll on the Dodging Death table rather than dying.' }
    ]
  },

  {
    name: 'Esoteric Hermit',
    blurb: 'The stone of your cave is one with the stars. Now the chaos of a fallen world disturbs your rituals.',
    abilities: { strength: -2, agility: 0, presence: 2, toughness: 0 },
    abilityNote: 'Wise but weak.',
    silver: { dice: 1, sides: 6, times: 10 },
    omenDie: 4,
    hpDie: 4,
    weaponDie: 4,
    armourDie: 2,
    startsWithScroll: true,
    featurePicks: 1,
    features: [
      { name: 'Master of Fate', detail: 'You know the right way with a DR8 Presence test.' },
      { name: 'A Book of Boiling Blood', detail: 'Read it once a day. Your enemy tests DR12 to prevent it, or d2 Berserker-slayers appear. Roll a d6: on 1 to 4 they fight for you, on 5 to 6 they turn on you.' },
      { name: 'Speaker of Truths', detail: 'Twice a day, lower the DR of one creature\'s next test by 4.' },
      { name: 'Initiate of the Invisible College', detail: 'Once a day summon d2 single-use scrolls. Roll d4: 1 to 2 sacred, 3 to 4 unclean. They turn to ash at sunrise.' },
      { name: 'Bard of the Undying', detail: 'Your harp gives +d4 on reaction rolls.' },
      { name: 'Hawk', detail: 'An ill-tempered hawk that eats your rations. Attacks and defends DR10, claws d4, 8 HP.' }
    ]
  },

  {
    name: 'Wretched Royalty',
    blurb: 'Bowed down only by the memories of your own lost glory, you could never submit to anyone else.',
    abilities: { strength: 0, agility: 0, presence: 0, toughness: 0 },
    abilityNote: 'Painfully average. You adjust no abilities.',
    // Confirmed against the Bare Bones Edition: the glyph the art edition
    // renders as "+" is the times sign, dropped entirely by the text layer.
    // Every class uses it. 4d6 x 10 is right.
    silver: { dice: 4, sides: 6, times: 10 },
    omenDie: 2,
    hpDie: 6,
    weaponDie: 8,
    armourDie: 4,
    rerollHeavyArmour: true,
    featurePicks: 2,
    features: [
      { name: 'The Blade of your Ancestors', detail: 'A talking magical sword that despises you. d6+1 damage, attack and defence DR10. If continually disappointed it develops a 1 in 6 chance to attack you or your companions.' },
      { name: "Poltroon the Court Jester", detail: 'For the first two rounds of a fight, you and your allies get +2 on attack and defence.' },
      { name: 'Barbarister the Incredible Horse', detail: 'Magical, intelligent, arrogant, vain and talking. If you can persuade him to care he adds +2 to Presence tests involving logic and intellect.' },
      { name: 'Hamfund the Squire', detail: 'Guards the scabbard of the cursed sword Eurekia. Once per combat, if Ham can be found, Eurekia may be drawn: 2d6 damage, and on a d6 roll of 1 the squire is slain and the sword vanishes forever.' },
      { name: 'The Snake-Skin Gift', detail: 'An ordinary-looking dagger in a snakeskin box. d4 damage, but on a 1 the target dies immediately of poison.' },
      { name: 'Horns of the Schleswig Lords', detail: 'Once a day blow the trumpet and test Presence DR12. One creature\'s next non-combat test is an automatic success.' }
    ]
  },

  {
    name: 'Heretical Priest',
    blurb: 'Hunted by the Two-Headed Basilisks of the One True Faith, desecrating cathedrals by night.',
    abilities: { strength: -2, agility: 0, presence: 2, toughness: 0 },
    abilityNote: 'Insightful but frail. You may use Powers while wearing medium armour.',
    silver: { dice: 3, sides: 6, times: 10 },
    omenDie: 4,
    hpDie: 8,
    weaponDie: 8,
    armourDie: 4,
    featurePicks: 1,
    features: [
      { name: "Sacred Shepherd's Crook", detail: 'Hooks through other worlds. 2d4 damage, except against faithless humans.' },
      { name: 'Stolen Mitre', detail: 'Defence DR10 while worn. Pulled over the ears outside battle, you test stealth against DR8.' },
      { name: 'List of Sins', detail: 'Presence DR10 makes a strange light surround evil creatures. You defend at +2 against anything found this way.' },
      { name: 'The Blasphemous Nechrubel Bible', detail: 'Read once a day and roll a die. Even: everyone heals d4 HP after five minutes of rest, for the rest of the day. Odd: you hallucinate d3 things only you can see, until sunrise.' },
      { name: "Stones from Thel-Emas' Lost Temple", detail: 'Cast them to reveal whether danger lurks in the next room. They can lie. Presence DR10 to tell, and on a failure you cannot test again until sunset.' },
      { name: '666 Crucifix', detail: 'Against undead, lesser trolls and goblins, check morale with your Presence modifier to see if they bow and remove themselves.' }
    ]
  },

  {
    name: 'Occult Herbmaster',
    blurb: 'Born of the mushroom, raised in the glade, watched by the eye of the moon in a silverblack pool.',
    abilities: { strength: -2, agility: 0, presence: 0, toughness: 2 },
    abilityNote: 'Tough as wood, low in protein.',
    silver: { dice: 2, sides: 6, times: 10 },
    omenDie: 2,
    hpDie: 6,
    weaponDie: 6,
    armourDie: 2,
    always: [
      { name: 'Portable laboratory', detail: 'Each day you have the materials for two randomly determined decoctions, and can brew d4 doses in total. Unused doses lose vitality after 24 hours.' }
    ],
    // Rolled fresh each day rather than at creation, so two are put on the
    // sheet as a starting pair and the player rerolls them as play goes on.
    decoctionPicks: 2,
    decoctions: [
      { name: 'Red Poison', detail: 'Toughness DR12 or lose d10 HP.' },
      { name: "Ezumiel's Vapor", detail: 'Pass a DR14 test or hallucinate severely for d4 hours.' },
      { name: 'Southern Frog Stew', detail: 'Vomit for d4 hours. Pass a DR14 test or you can do nothing else.' },
      { name: 'Elixir Vitalis', detail: 'Heals d6 HP and stops infection. Can be habit-forming.' },
      { name: 'Spider-Owl Soup', detail: 'See in darkness and climb walls for 30 minutes.' },
      { name: "Fernor's Philtre", detail: 'Dabbed into the eye. Heals infection and gives +2 on Presence tests for d4 hours.' },
      { name: "Hyphos' Enervating Snuff", detail: 'Berserk. Two attacks per round but defend at DR14. Lasts one fight.' },
      { name: 'Black Poison', detail: 'Toughness DR14 or lose d6 HP and be blinded for an hour.' }
    ],
    featurePicks: 0,
    features: []
  }
];

/* No class at all, which is how the book works before the optional rules. */
const MB_NO_CLASS = {
  name: 'No class',
  blurb: 'One hand holds silver, the other a waterskin. Your soul and your silver are equally easy to lose.',
  abilities: { strength: 0, agility: 0, presence: 0, toughness: 0 },
  abilityNote: 'Roll 4d6 and drop the lowest for two abilities of your choice.',
  silver: { dice: 2, sides: 6, times: 10 },
  omenDie: 2,
  hpDie: 8,
  weaponDie: 10,
  armourDie: 4,
  featurePicks: 0,
  features: []
};

/* The weapon table, page 20. Rolled with the class's die, or d6 if you start
   with a scroll. */
const MB_WEAPON_TABLE = [
  { name: 'Femur', detail: 'd4' },
  { name: 'Staff', detail: 'd4' },
  { name: 'Shortsword', detail: 'd4' },
  { name: 'Knife', detail: 'd4' },
  { name: 'Warhammer', detail: 'd6' },
  { name: 'Sword', detail: 'd6' },
  { name: 'Bow', detail: 'd6', note: 'Comes with Presence+10 arrows' },
  { name: 'Flail', detail: 'd8' },
  { name: 'Crossbow', detail: 'd8', note: 'Comes with Presence+10 bolts' },
  { name: 'Zweihänder', detail: 'd10', note: 'Two handed. Scrolls never work while wielding it' }
];

/* The armour table, page 21. Rolled with a d4, or d2 if you start with a
   scroll. Scrolls never work in medium or heavy armour. */
const MB_ARMOUR_TABLE = [
  { name: 'No armour', dr: '', tier: 0 },
  { name: 'Light armour', dr: '-d2', tier: 1 },
  { name: 'Medium armour', dr: '-d4', tier: 2 },
  { name: 'Heavy armour', dr: '-d6', tier: 3 }
];

/* Starting kit, page 18. Everyone gets the waterskin and the food. Then one
   roll on each of the three tables. */
const MB_KIT_D6 = [
  null,
  null,
  { name: 'Backpack', detail: '', note: 'Holds 7 normal-sized items' },
  { name: 'Sack', detail: '', note: 'Holds 10 normal-sized items' },
  { name: 'Small wagon', detail: '' },
  { name: 'Donkey', detail: '', note: 'Not bad' }
];

const MB_KIT_D12_A = [
  { name: 'Rope, 30ft', detail: '' },
  { name: 'Torches', detail: 'Presence+4' },
  { name: 'Lantern with oil', detail: '', note: 'Burns for Presence+6 hours' },
  { name: 'Magnesium strip', detail: '' },
  { name: 'Random unclean scroll', detail: '', isScroll: 'unclean' },
  { name: 'Sharp needle', detail: '' },
  { name: 'Medicine chest', detail: '', note: 'Presence+4 uses. Stops bleeding and infection, heals d6 HP' },
  { name: 'Metal file and lockpicks', detail: '' },
  { name: 'Bear trap', detail: '', note: 'Presence DR14 to spot, d8 damage' },
  { name: 'Bomb', detail: '', note: 'Sealed bottle, d10 damage' },
  { name: 'Red poison', detail: 'd4 doses', note: 'Toughness DR12 or d10 damage' },
  { name: 'Silver crucifix', detail: '' }
];

const MB_KIT_D12_B = [
  { name: 'Life elixir', detail: 'd4 doses', note: 'Heals d6 HP and removes infection' },
  { name: 'Random sacred scroll', detail: '', isScroll: 'sacred' },
  { name: 'Small but vicious dog', detail: '', note: 'd6+2 HP, bite d4, obeys only you' },
  { name: 'Monkeys', detail: 'd4', note: 'd4+2 HP each, punch or bite d4. They ignore you but love you' },
  { name: 'Exquisite perfume', detail: '25s' },
  { name: 'Toolbox', detail: '', note: 'Nails, tongs, hammer, small saw, drill' },
  { name: 'Heavy chain', detail: '15 feet' },
  { name: 'Grappling hook', detail: '' },
  { name: 'Shield', detail: '', note: 'Stops 1 more damage, or break it to ignore one attack', isShield: true },
  { name: 'Crowbar', detail: 'd4 damage' },
  { name: 'Lard', detail: '', note: 'May function as five meals in a pinch' },
  { name: 'Tent', detail: '' }
];
