# MÖRK BORG Simple Sheet

A plain character sheet for MÖRK BORG, as an Owlbear Rodeo extension.

**Install URL**

```
https://damien-rgb.github.io/morkborg-sheet/manifest.json
```

It also works as an ordinary web page: open `index.html`, or
<https://damien-rgb.github.io/morkborg-sheet/>.

## What it is for

Most digital sheets try to play the game for you. This one does not.

- **Nothing is hidden.** One screen, no collapsible sections. Every number is on the page
  all the time, so you can say "the number next to Strength" and it is there to point at.
- **It does not roll anything.** There is no dice code in it. Every roll happens in
  Owlbear's own dice tray, in front of the whole table, because rolling the die is the good
  part and a table should not give it away to a machine. Levelling up, rolling a d6 against
  each ability one at a time, is the clearest case of this.
- **It tells you what to roll.** Next to each ability is the instruction in words, for
  example "Roll d20, add 2". Attacking, dodging and armour each carry the same kind of line.
  They are there to be read out loud.
- **The player edits it.** Hit points, silver, omens, gear, all typed or nudged directly.
- **A new scvm in one press.** Characters die constantly in this game, so rolling up a
  replacement takes one button and a couple of seconds. It rolls the real thing: the class's
  own ability adjustments, silver, omen and hit dice, the right die on the weapon and armour
  tables, the three starting kit tables, and whatever the class grants you. Wretched Royalty
  gets its two companions or heirlooms, the Deserter cannot read a scroll it finds, and a
  character holding a scroll is kept out of medium and heavy armour.
- **Buttons say words**, not icons. Targets are large. Focus outlines are loud.

Drag the extension panel to the side of the Owlbear window and use the dice tray as normal.
For hit points on the map, the Stat Bubbles extension does that job better than a sheet can.

## Saving

The sheet saves itself into the browser as you type, so closing the tab does not lose it.

**Save to file** writes the character out as JSON. **Load from file** reads one back in.
That is how a character moves between machines, or gets kept before rolling a new one.

**Print** gives a clean black and white paper sheet, with the buttons and the help text
stripped out.

## Running it anywhere

No build step, no framework, no network calls. Four files and a folder of tables. Open
`index.html` from disk and it works, including on a machine with no internet.

To change anything, edit `sheet.js`, `sheet.css` or `index.html` directly. There is nothing
to compile.

## Credit

The generator and the game tables in `data.js` come from
[codyrioux/owlbear-morkborg](https://github.com/codyrioux/owlbear-morkborg), which is a much
richer sheet and worth looking at if you want one that does automate play.

MÖRK BORG is copyright Ockult Örtmästare Games and Stockholm Kartell.

This is an independent production by Damien Fegan and is not affiliated with Ockult
Örtmästare Games or Stockholm Kartell. It is published under the
[MÖRK BORG Third Party License](https://morkborg.com/license/).

Not affiliated with Owlbear Rodeo.

## Licence

Source code is MIT, see `LICENSE`. The MÖRK BORG game content reproduced in `data.js` is not
covered by that grant and is used under the Third Party License above.
