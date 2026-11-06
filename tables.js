/* The optional character tables, MÖRK BORG rulebook pages 38 to 42.
 *
 * Nothing here is rolled when a character is made. Each line is a plain text
 * field the player can write themselves; the die beside it is there for anyone
 * who would rather be handed something nastier than they would have invented.
 *
 * Game content used under the MÖRK BORG Third Party License.
 */

const MB_TABLES = {
  traits: {
    label: 'Traits',
    hint: 'Terrible Traits, d20, rolled twice',
    rolls: 2,
    join: ' and ',
    entries: [
      'Endlessly aggravated', 'Inferiority complex', 'Problems with authority',
      'Loud mouth', 'Cruel', 'Egocentric', 'Nihilistic',
      'Prone to substance abuse', 'Conflicted', 'Shrewd', 'Vindictive',
      'Cowardly', 'Lazy', 'Suspicious', 'Ruthless', 'Worried', 'Bitter',
      'Deceitful', 'Wasteful', 'Arrogant'
    ]
  },

  body: {
    label: 'Body',
    hint: 'Broken Bodies, d20',
    entries: [
      'Staring manic gaze.',
      'Covered in (for some) blasphemous tattoos.',
      'Rotting face. Wears a mask.',
      'Lost three toes, limps.',
      'Starved: gaunt and pale.',
      'One hand replaced with a rusting hook (d6 damage).',
      'Decaying teeth.',
      'Hauntingly beautiful, unnervingly clean.',
      'Hands caked with sores.',
      'Cataracts slowly but surely spreading in both eyes.',
      'Long tangled hair, at least one cockroach in residence.',
      'Broken, crushed ears.',
      'Juddering and stuttering from nerve damage or stress.',
      'Corpulent, ravenous, drooling.',
      'One hand lacks thumb and index finger, grips like a lobster.',
      "Red, swollen alcoholic's nose.",
      'Resting maniac face, making friends is hard.',
      "Chronic athlete's foot. Stinks.",
      'Recently slashed and stinking eye covered with a patch.',
      'Nails cracked and black, maybe about to drop off.'
    ]
  },

  habit: {
    label: 'Habit',
    hint: 'Bad Habits, d20',
    entries: [
      'Obsessively collect small sharp stones.',
      "Won't use a blade without testing it on your own flesh. Arms knitted with scars.",
      "Can't stop drinking once you start.",
      'Gambling addict. Must bet every day. If you lose, raise and bet again.',
      'Cannot tolerate criticism of any kind. Results in rage and weeping.',
      'Unable to get to the point. Have never actually finished a story.',
      'Best friend is a skull. Carry it with you, tell it everything, you trust no one more.',
      'You pick your nose so deep it bleeds.',
      'Laugh hysterically at your own jokes which you then explain in detail.',
      'A nihilist. You insist on telling everyone you are a nihilist and explaining why.',
      'Inveterate bug eater.',
      'Stress response is aesthetic display. The worse things get the fancier you need to be.',
      'Permanent phlegm deposit in throat. Continuously cough, snort, spit and swallow.',
      'Pyromaniac.',
      'Consistently lose important items and forget vital facts.',
      'Insecure shit-stirrer. Will talk about whoever just left the room.',
      'You stutter when lying.',
      'You giggle insanely at the worst possible times.',
      'You whistle while trying to hide. You will deny this. Whistle on a 5, 7, 9, 11 or 13 on a d20.',
      'You make jewellery from the teeth of the dead. If this can be considered a bad habit.'
    ]
  },

  tale: {
    label: 'Tale',
    hint: 'Troubling Tales, d20',
    entries: [
      'Pursued for manslaughter. There is a bounty.',
      'In massive debt. The debt is being traded to successively more ruthless groups.',
      'Have a rare, sought after item.',
      'Have a cursed never healing wound.',
      'Had an illegal, immoral and secret affair with a member of the royal family. Has proof.',
      'Escaped cult member. Terrified and paranoid. Other cultists are everywhere.',
      'An identity thief who recently killed and replaced this person.',
      'Banished and disowned for unspecified deeds. Can never go home.',
      'Deserted military after witnessing a massacre, bounty on head. Hunted by former friends.',
      'Very recently murdered a close relative. Very recently.',
      'A puzzle cube has been calibrated incorrectly (or has it?), awakening a slumbering abomination.',
      'Evil creatures love the scent of your spoor and are drawn to it, bringing disaster in your wake.',
      'A battle wound left a shard of metal slowly inching closer to your heart. Every day there is a 2% chance it reaches it.',
      'Violence forced you into the wilderness. You think waving trees are whispering. You talk to, scream at, attack trees.',
      'Cursed to share the nightmares of others, you sleep far, far away.',
      'At permanent war with all corvids. No contact without some violence. You carry a sling.',
      'After dreaming of an underground temple to a forgotten god you understand the songs of insects and worms.',
      'Being tracked and observed by a golem after an agreement which you know has been wiped from your mind.',
      '"Burn or be burned" is the fate you accept.',
      'Your flesh heals twice as fast, but your companions twice as slow. You see a many-eyed "guardian angel."'
    ]
  }
};

const MB_TABLE_ORDER = ['traits', 'body', 'habit', 'tale'];
