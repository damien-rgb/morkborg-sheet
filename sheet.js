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

  /* ---------- making a scvm ---------- */

  function newCharacter() {
    var cls = pick(MB_DATA.classes);

    var abilities = {};
    ABILITIES.forEach(function (a) { abilities[a.key] = rollModifier(); });

    var hpMax = Math.max(1, roll(cls.hpDie) + abilities.toughness);
    var omenSides = cls.omenDie === 'd4' ? 4 : 2;
    var weapon = pick(MB_DATA.weapons);

    // Armour is a d4: 1 is rags, 4 is the heaviest tier.
    var tier = MB_DATA.armor.tiers[Math.max(0, roll(4) - 1)] || MB_DATA.armor.tiers[0];

    var gear = [
      { name: 'Waterskin', detail: '' },
      { name: 'Torches', detail: '4' },
      { name: 'Dry rations', detail: '4' },
      { name: 'Rope, 30ft', detail: '' }
    ];
    if (/crossbow/i.test(weapon.name)) {
      gear.push({ name: 'Crossbow bolts', detail: '10' });
    }

    var scrolls = [];
    var hasScroll = cls.name === 'Esoteric Hermit' ||
                    cls.name === 'Heretical Priest' ||
                    Math.random() < 0.25;
    if (hasScroll) {
      var s = pick(MB_DATA.scrolls);
      scrolls.push({ name: s.name, detail: s.description });
    }

    return {
      name: pick(MB_NAMES),
      className: cls.name,
      classDesc: cls.desc + ' ' + cls.traits,
      abilities: abilities,
      hp: hpMax,
      hpMax: hpMax,
      omens: roll(omenSides),
      powers: Math.max(0, roll(4) + abilities.presence),
      silver: roll(6) * 10,
      armour: tier.name,
      armourDr: tier.damageReduction === '0' ? '' : tier.damageReduction,
      shield: tier.tier > 0 && Math.random() > 0.5,
      weapons: [{ name: weapon.name, detail: weapon.damageDie }],
      gear: gear,
      scrolls: scrolls,
      notes: ''
    };
  }

  var MB_NAMES = [
    'Borg', 'Krugg', 'Varg', 'Kagur', 'Morn', 'Gorg', 'Agnar', 'Bael',
    'Gudrun', 'Helvi', 'Astrid', 'Vesper', 'Dag', 'Gunnar', 'Yrsa', 'Snorri',
    'Old Gid', 'Carcass', 'Grub', 'Maggot', 'Crow-Bait', 'Hemlock'
  ];

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
    weapons: { hostId: 'weapons', detail: 'Damage', placeholder: 'Sword', empty: 'No weapons yet.' },
    gear:    { hostId: 'gear',    detail: 'Qty', detailLabel: 'How many', placeholder: 'Torches', empty: 'No equipment yet.' },
    scrolls: { hostId: 'scrolls', detail: 'What it does', placeholder: 'Scroll name', empty: 'No scrolls.' }
  };

  function drawList(key) {
    var cfg = LISTS[key];
    var host = document.getElementById(cfg.hostId);
    var rows = character[key];
    host.innerHTML = '';

    if (!rows.length) {
      host.appendChild(el('p', 'empty', cfg.empty));
      return;
    }

    rows.forEach(function (row, i) {
      var line = el('div', 'item');

      var name = el('input');
      name.type = 'text';
      name.value = row.name || '';
      name.placeholder = cfg.placeholder;
      name.setAttribute('aria-label', cfg.placeholder);
      name.addEventListener('input', function () {
        row.name = name.value;
        queueSave();
      });

      var detail = el('input');
      detail.type = 'text';
      detail.className = key === 'scrolls' ? '' : 'small';
      detail.value = row.detail || '';
      detail.placeholder = cfg.detail;
      detail.setAttribute('aria-label', cfg.detailLabel || cfg.detail);
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

      line.appendChild(name);
      line.appendChild(detail);
      line.appendChild(kill);
      host.appendChild(line);
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

    drawAbilities();
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
