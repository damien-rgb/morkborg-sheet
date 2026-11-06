/* MORK BORG sheet.
 *
 * Deliberately has no dice. Every roll happens in Owlbear's dice tray, in front
 * of everyone, because rolling is the part of the game that should not be
 * automated. This file only remembers numbers and prints instructions next to
 * them so they can be read aloud.
 *
 * No build step, no framework, no network. Data arrives from data.js as MB_DATA.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'morkborg-simple-sheet';
  var ABILITIES = [
    { key: 'strength',  label: 'Strength' },
    { key: 'agility',   label: 'Agility' },
    { key: 'presence',  label: 'Presence' },
    { key: 'toughness', label: 'Toughness' }
  ];

  var character = null;
  var saveTimer = null;

  /* ---------- dice, used only to make a character ---------- */

  function roll(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // MORK BORG converts a 3d6 score into the modifier that is actually used.
  function scoreToModifier(score) {
    if (score <= 4) return -3;
    if (score <= 6) return -2;
    if (score <= 8) return -1;
    if (score <= 12) return 0;
    if (score <= 14) return 1;
    if (score <= 16) return 2;
    return 3;
  }

  function rollModifier() {
    return scoreToModifier(roll(6) + roll(6) + roll(6));
  }

  var MB_NAMES = [
    'Borg', 'Krugg', 'Varg', 'Kagur', 'Morn', 'Gorg', 'Agnar', 'Bael',
    'Gudrun', 'Helvi', 'Astrid', 'Vesper', 'Dag', 'Gunnar', 'Yrsa', 'Snorri',
    'Old Gid', 'Carcass', 'Grub', 'Maggot', 'Crow-Bait', 'Hemlock'
  ];

  /* ---------- making a scvm ---------- */

  // Rolls 3d6, applies the class adjustment, and turns the total into the
  // modifier the game actually uses.
  function rollAbility(adjust) {
    var score = roll(6) + roll(6) + roll(6) + (adjust || 0);
    return scoreToModifier(score);
  }

  function rollSilver(spec) {
    var total = 0;
    for (var i = 0; i < spec.dice; i++) total += roll(spec.sides);
    return total * (spec.times || 1);
  }

  // Takes `count` different entries from a table, so a class never hands you
  // the same item twice.
  function takeDistinct(table, count) {
    var pool = table.slice();
    var out = [];
    while (out.length < count && pool.length) {
      out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
    return out.map(function (e) { return { name: e.name, detail: e.detail }; });
  }

  function randomScroll(type) {
    var pool = MB_DATA.scrolls.filter(function (s) { return !type || s.type === type; });
    var s = pick(pool.length ? pool : MB_DATA.scrolls);
    return { name: s.name, detail: s.description };
  }

  function newCharacter(cls) {
    cls = cls || pick(MB_CLASSES);

    var abilities = {};
    ABILITIES.forEach(function (a) {
      abilities[a.key] = rollAbility(cls.abilities[a.key]);
    });

    var hpMax = Math.max(1, roll(cls.hpDie) + abilities.toughness);

    // Everyone starts with a waterskin and d4 days of food, then one roll on
    // each of the three starting kit tables.
    var gear = [
      { name: 'Waterskin', detail: '' },
      { name: 'Days of food', detail: String(roll(4)) }
    ];
    var scrolls = [];
    var shield = false;

    function addKit(entry) {
      if (!entry) return;
      if (entry.isScroll) {
        // The Deserter cannot read, so a scroll is no use to them.
        if (cls.illiterate) { gear.push({ name: 'A scroll you cannot read', detail: 'Eat it or use it as toilet paper.' }); return; }
        scrolls.push(randomScroll(entry.isScroll));
        return;
      }
      if (entry.isShield) { shield = true; }
      gear.push({ name: entry.name, detail: entry.detail });
    }

    addKit(MB_KIT_D6[roll(6) - 1]);
    addKit(MB_KIT_D12_A[roll(12) - 1]);
    addKit(MB_KIT_D12_B[roll(12) - 1]);

    if (cls.startsWithScroll && !cls.illiterate) {
      scrolls.push(randomScroll(null));
    }

    // Starting with a scroll narrows both tables, because scrolls will not work
    // in medium or heavy armour, nor with a two-hander.
    var hasScroll = scrolls.length > 0;
    var weaponDie = hasScroll ? Math.min(6, cls.weaponDie) : cls.weaponDie;
    var armourDie = hasScroll ? Math.min(2, cls.armourDie) : cls.armourDie;

    var weapon = MB_WEAPON_TABLE[roll(weaponDie) - 1];

    var armour = MB_ARMOUR_TABLE[roll(armourDie) - 1];
    if (cls.rerollHeavyArmour && armour.tier === 3) {
      armour = MB_ARMOUR_TABLE[roll(3) - 1];
    }

    var features = (cls.always || []).slice();
    if (cls.featurePicks) {
      features = features.concat(takeDistinct(cls.features, cls.featurePicks));
    }
    if (cls.decoctionPicks) {
      features = features.concat(takeDistinct(cls.decoctions, cls.decoctionPicks).map(function (d) {
        return { name: "Today's decoction: " + d.name, detail: d.detail };
      }));
    }

    return {
      name: pick(MB_NAMES),
      className: cls.name,
      classDesc: cls.blurb,
      classNote: cls.abilityNote,
      abilities: abilities,
      hp: hpMax,
      hpMax: hpMax,
      omens: roll(cls.omenDie),
      powers: Math.max(0, roll(4) + abilities.presence),
      silver: rollSilver(cls.silver),
      armour: armour.name,
      armourDr: armour.dr,
      shield: shield,
      weapons: [{ name: weapon.name, detail: weapon.detail }],
      features: features,
      gear: gear,
      scrolls: scrolls,
      notes: ''
    };
  }

  /* ---------- saving ---------- */

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
      stamp();
    } catch (err) {
      // Private windows and sandboxed frames can refuse storage. The sheet still
      // works for the session; only the remembering is lost.
      console.warn('Could not save the sheet:', err);
      var at = document.getElementById('saved-at');
      if (at) at.textContent = 'Not saving in this browser. Use Save to file.';
    }
  }

  function queueSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 400);
  }

  function stamp() {
    var at = document.getElementById('saved-at');
    if (!at) return;
    var d = new Date();
    var hh = String(d.getHours()).padStart(2, '0');
    var mm = String(d.getMinutes()).padStart(2, '0');
    at.textContent = 'Last saved ' + hh + ':' + mm + '.';
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.abilities) return parsed;
    } catch (err) {
      console.warn('Could not read the saved sheet:', err);
    }
    return null;
  }

  /* ---------- drawing ---------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function signed(n) {
    return n >= 0 ? '+' + n : String(n);
  }

  function drawAbilities() {
    var host = document.getElementById('abilities');
    host.innerHTML = '';

    ABILITIES.forEach(function (a) {
      var box = el('div', 'ability');

      var id = 'ab-' + a.key;
      var label = el('label', 'ability-name', a.label);
      label.setAttribute('for', id);

      var input = el('input');
      input.type = 'number';
      input.id = id;
      input.inputMode = 'numeric';
      input.value = character.abilities[a.key];

      var say = el('div', 'ability-say');

      function refresh() {
        say.textContent = 'Roll d20, ' +
          (character.abilities[a.key] < 0 ? 'take off ' : 'add ') +
          Math.abs(character.abilities[a.key]);
      }

      input.addEventListener('input', function () {
        var v = parseInt(input.value, 10);
        character.abilities[a.key] = isNaN(v) ? 0 : v;
        refresh();
        queueSave();
      });

      refresh();
      box.appendChild(label);
      box.appendChild(input);
      box.appendChild(say);
      host.appendChild(box);
    });
  }

  // One list drawer for weapons, gear and scrolls. Each row is a name, a short
  // detail, and a remove button. Nothing is hidden behind a click.
  var LISTS = {
    features: { hostId: 'features', detail: 'What it does', placeholder: 'Class feature', empty: 'Nothing from your class.' },
    weapons: { hostId: 'weapons', detail: 'Damage', placeholder: 'Sword', empty: 'No weapons yet.' },
    gear:    { hostId: 'gear',    detail: 'Qty', detailLabel: 'How many', placeholder: 'Torches', empty: 'No equipment yet.' },
    scrolls: { hostId: 'scrolls', detail: 'What it does', placeholder: 'Scroll name', empty: 'No scrolls.' }
  };

  function drawList(key) {
    var cfg = LISTS[key];
    var host = document.getElementById(cfg.hostId);
    // A sheet saved before this list existed has no array for it.
    if (!Array.isArray(character[key])) character[key] = [];
    var rows = character[key];
    host.innerHTML = '';

    if (!rows.length) {
      host.appendChild(el('p', 'empty', cfg.empty));
      return;
    }

    rows.forEach(function (row, i) {
      var card = el('div', 'item');

      var name = el('input', 'row-name');
      name.type = 'text';
      name.value = row.name || '';
      name.placeholder = cfg.placeholder;
      name.setAttribute('aria-label', cfg.placeholder);
      name.addEventListener('input', function () {
        row.name = name.value;
        queueSave();
      });

      // Rules text runs to a paragraph and a quantity runs to one character,
      // so the box grows to whatever it holds rather than guessing a width.
      var detail = el('textarea', 'row-detail');
      detail.value = row.detail || '';
      detail.placeholder = cfg.detail;
      detail.setAttribute('aria-label', cfg.detailLabel || cfg.detail);
      detail.rows = 1;

      var grow = function () {
        detail.style.height = 'auto';
        // Border-box, so the border has to be added back on or the last line
        // stays hidden.
        var border = detail.offsetHeight - detail.clientHeight;
        detail.style.height = (detail.scrollHeight + border) + 'px';
      };
      detail.addEventListener('input', grow);

      detail.addEventListener('input', function () {
        row.detail = detail.value;
        queueSave();
      });

      var kill = el('button', 'remove', 'Remove');
      kill.type = 'button';
      kill.addEventListener('click', function () {
        rows.splice(i, 1);
        drawList(key);
        save();
      });

      card.appendChild(name);
      card.appendChild(detail);
      card.appendChild(kill);
      host.appendChild(card);

      // A quantity or a damage die rides on the name's line. A paragraph of
      // rules text takes the full width below it. Decided by length, and
      // rechecked whenever the text is edited, so it is never wrong for long.
      var setShape = function () {
        // Only a true short code rides beside the name: a damage die, a count.
        // Anything longer takes the full width, which also frees the name box.
        var brief = (detail.value || '').length <= 6;
        card.classList.toggle('brief', brief);
        if (!brief) grow();
        else detail.style.height = '';
      };
      detail.addEventListener('input', setShape);
      setTimeout(setShape, 0);
    });
  }

  function val(id, v) {
    var n = document.getElementById(id);
    if (n) n.value = v;
  }

  function draw() {
    val('f-name', character.name);
    val('f-class', character.className);
    document.getElementById('class-desc').textContent = character.classDesc || '';
    val('f-hp', character.hp);
    val('f-hpmax', character.hpMax);
    val('f-omens', character.omens);
    val('f-powers', character.powers);
    val('f-silver', character.silver);
    val('f-armour', character.armour);
    val('f-armour-dr', character.armourDr);
    document.getElementById('f-shield').checked = !!character.shield;
    val('f-notes', character.notes);

    document.getElementById('class-note').textContent = character.classNote || '';

    drawAbilities();
    drawList('features');
    drawList('weapons');
    drawList('gear');
    drawList('scrolls');
  }

  /* ---------- wiring ---------- */

  function bindText(id, field) {
    var n = document.getElementById(id);
    n.addEventListener('input', function () {
      character[field] = n.value;
      queueSave();
    });
  }

  function bindNumber(id, field) {
    var n = document.getElementById(id);
    n.addEventListener('input', function () {
      var v = parseInt(n.value, 10);
      character[field] = isNaN(v) ? 0 : v;
      queueSave();
    });
  }

  var STEP_FIELDS = { hp: 'hp', omens: 'omens', powers: 'powers', silver: 'silver' };

  function bindSteps() {
    document.querySelectorAll('.step').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var parts = btn.getAttribute('data-step').split(':');
        var field = STEP_FIELDS[parts[0]];
        var by = parseInt(parts[1], 10);
        if (!field) return;
        character[field] = (parseInt(character[field], 10) || 0) + by;
        val('f-' + (field === 'hp' ? 'hp' : field), character[field]);
        save();
      });
    });
  }

  function bindAdds() {
    document.querySelectorAll('.add').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-add');
        character[key].push({ name: '', detail: '' });
        drawList(key);
        save();
        var host = document.getElementById(LISTS[key].hostId);
        var inputs = host.querySelectorAll('input');
        if (inputs.length) inputs[inputs.length - 2].focus();
      });
    });
  }

  function exportFile() {
    var name = (character.name || 'scvm').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    var blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function importFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(String(reader.result));
        if (!parsed || !parsed.abilities) throw new Error('That file is not a character sheet.');
        character = Object.assign(newCharacter(), parsed);
        draw();
        save();
      } catch (err) {
        alert('Could not read that file. ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function start() {
    character = load() || newCharacter();
    draw();

    bindText('f-name', 'name');
    bindText('f-class', 'className');
    bindText('f-armour', 'armour');
    bindText('f-armour-dr', 'armourDr');
    bindText('f-notes', 'notes');
    bindNumber('f-hp', 'hp');
    bindNumber('f-hpmax', 'hpMax');
    bindNumber('f-omens', 'omens');
    bindNumber('f-powers', 'powers');
    bindNumber('f-silver', 'silver');

    document.getElementById('f-shield').addEventListener('change', function () {
      character.shield = this.checked;
      save();
    });

    bindSteps();
    bindAdds();

    var dialog = document.getElementById('confirm-new');
    document.getElementById('btn-new').addEventListener('click', function () {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else if (confirm('Roll a new scvm? This replaces the one on screen.')) {
        character = newCharacter();
        draw();
        save();
      }
    });
    dialog.addEventListener('close', function () {
      if (dialog.returnValue !== 'ok') return;
      character = newCharacter();
      draw();
      save();
    });

    document.getElementById('btn-export').addEventListener('click', exportFile);
    document.getElementById('btn-print').addEventListener('click', function () { window.print(); });

    var fileInput = document.getElementById('file-input');
    document.getElementById('btn-import').addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files[0]) importFile(fileInput.files[0]);
      fileInput.value = '';
    });

    save();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
