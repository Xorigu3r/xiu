// Fitxes de XIU: una sola definició (contingut/recursos/*.json → full.exercicis) i dues maneres de fer-la:
//   · digital: al mòbil o a la tauleta, amb el dit (resseguir, dibuixar, encerclar, comptar, sèries)
//   · imprimible: un A4 en SVG, que es converteix en PDF (raster a 300 ppp + jsPDF) igual a totes les plataformes.
// La composició és la de les fitxes de Canva: títol en majúscules, subtítol manuscrit, línia amb àrea i edat,
// exercicis numerats i el logo al peu.
(function () {
  const C = { tinta: '#38332E', marro: '#786654', talp: '#A79480', sorra: '#DDD0C1', paper: '#F4F0E8', guia: '#8C7B6B', traç: '#C9785B' };
  const FT = () => window.XIU_FONTS || { titols: 'Georgia, serif', manuscrita: 'cursive', enunciat: 'sans-serif', text: 'sans-serif', xifres: 'sans-serif', fitxers: [] };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const ff = (k) => esc(FT()[k]); // font-family per a atributs SVG
  const rnd = (seed) => { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };
  const llavor = (txt) => [...String(txt)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100000, 7);

  /* ---------- Lletres i nombres d'un sol traç (caixa 100×140, base a y=140), en l'ordre en què s'escriuen ---------- */
  const G = {
    A: 'M10 140 L50 0 L90 140 M26 88 H74',
    E: 'M18 0 V140 M18 0 H84 M18 70 H72 M18 140 H86',
    I: 'M50 0 V140',
    O: 'M50 0 C22 0 8 35 8 70 C8 105 22 140 50 140 C78 140 92 105 92 70 C92 35 78 0 50 0',
    U: 'M16 0 V92 C16 124 31 140 50 140 C69 140 84 124 84 92 V0',
    0: 'M50 0 C26 0 16 35 16 70 C16 105 26 140 50 140 C74 140 84 105 84 70 C84 35 74 0 50 0',
    1: 'M24 32 L56 0 V140',
    2: 'M18 36 C18 13 34 0 52 0 C72 0 85 14 85 35 C85 60 60 86 16 140 H88',
    3: 'M18 18 C28 6 40 0 52 0 C72 0 84 14 84 33 C84 54 66 67 44 67 C70 67 88 82 88 104 C88 126 70 140 50 140 C34 140 22 133 14 121',
    4: 'M66 140 V0 L10 96 H92',
    5: 'M82 0 H30 L23 62 C33 55 43 52 53 52 C75 52 88 70 88 95 C88 122 72 140 50 140 C35 140 23 133 15 122',
    6: 'M78 12 C70 4 61 0 51 0 C26 0 14 35 14 80 C14 118 30 140 52 140 C73 140 87 124 87 100 C87 76 72 60 52 60 C32 60 16 75 14 96',
    7: 'M12 0 H88 L40 140',
    8: 'M50 67 C30 67 19 54 19 34 C19 14 32 0 50 0 C68 0 81 14 81 34 C81 54 70 67 50 67 C27 67 13 83 13 104 C13 126 28 140 50 140 C72 140 87 126 87 104 C87 83 73 67 50 67',
    9: 'M85 44 C84 20 70 0 50 0 C28 0 15 18 15 42 C15 66 30 82 50 82 C70 82 85 66 85 44 V140',
  };
  const inici = (d) => d.match(/M\s*([\d.]+)[ ,]([\d.]+)/).slice(1).map(Number);
  /** Guia de punts d'un caràcter a (x, y) amb escala s. Si no hi ha traç definit, el contorn de la lletra amb punts. */
  function guia(ch, x, y, s = 1) {
    const d = G[ch] || G[ch.toUpperCase && ch.toUpperCase()];
    if (!d || (G[ch] == null && ch !== ch.toUpperCase())) {
      return `<text x="${x + 50 * s}" y="${y + 140 * s}" font-size="${190 * s}" text-anchor="middle" font-family="${ff('titols')}"
        fill="none" stroke="${C.guia}" stroke-width="${2.2 * s}" stroke-dasharray="${0.1} ${7 * s}" stroke-linecap="round">${esc(ch)}</text>`;
    }
    const [sx, sy] = inici(d);
    return `<g transform="translate(${x} ${y}) scale(${s})"><path class="guia" d="${d}" fill="none" stroke="${C.guia}" stroke-width="5.5"
      stroke-dasharray="0 11" stroke-linecap="round" stroke-linejoin="round" data-x="${x}" data-y="${y}" data-s="${s}"/>
      <circle cx="${sx}" cy="${sy}" r="6.5" fill="${C.traç}" opacity=".75"/></g>`;
  }

  /* ---------- Elements dibuixats (per comptar i per a les sèries) ---------- */
  const ICONES = {
    estrella: (r) => { let p = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; p += (i ? 'L' : 'M') + (Math.cos(a) * rr).toFixed(1) + ' ' + (Math.sin(a) * rr).toFixed(1); }
      return `<path d="${p}Z" fill="#A47B62" stroke="#8E6650" stroke-width="${r * 0.06}" stroke-linejoin="round"/>`; },
    flor: (r) => [0, 1, 2, 3, 4].map((i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; return `<circle cx="${(Math.cos(a) * r * 0.52).toFixed(1)}" cy="${(Math.sin(a) * r * 0.52).toFixed(1)}" r="${r * 0.45}" fill="#EFE6DA" stroke="#D2C1AC" stroke-width="${r * 0.05}"/>`; }).join('') + `<circle r="${r * 0.28}" fill="#C9A47E"/>`,
    bola: (r) => `<circle r="${r}" fill="#B98E62"/><ellipse cx="${-r * 0.3}" cy="${-r * 0.32}" rx="${r * 0.42}" ry="${r * 0.3}" fill="#D7B48B" opacity=".75"/><path d="M${-r * 0.8} ${r * 0.1} Q0 ${r * 0.5} ${r * 0.8} ${r * 0.1}" stroke="#A47B55" stroke-width="${r * 0.05}" fill="none" opacity=".6"/>`,
    castanya: (r) => `<path d="M${-r} ${r * 0.2} C${-r} ${-r * 0.6} ${-r * 0.3} ${-r} 0 ${-r} C${r * 0.3} ${-r} ${r} ${-r * 0.6} ${r} ${r * 0.2} C${r} ${r * 0.8} ${r * 0.5} ${r} 0 ${r} C${-r * 0.5} ${r} ${-r} ${r * 0.8} ${-r} ${r * 0.2}Z" fill="#8A5A3C"/><path d="M${-r * 0.85} ${r * 0.45} Q0 ${r * 1.05} ${r * 0.85} ${r * 0.45} Q0 ${r * 0.75} ${-r * 0.85} ${r * 0.45}Z" fill="#D2B48C"/>`,
    fulla: (r) => `<path d="M${-r} ${r * 0.5} C${-r * 0.6} ${-r * 0.8} ${r * 0.6} ${-r} ${r} ${-r * 0.7} C${r * 0.8} ${r * 0.5} ${-r * 0.2} ${r} ${-r} ${r * 0.5}Z" fill="#9D9B60"/><path d="M${-r * 0.85} ${r * 0.4} L${r * 0.75} ${-r * 0.55}" stroke="#7E7C48" stroke-width="${r * 0.07}"/>`,
    pedra: (r) => `<ellipse rx="${r}" ry="${r * 0.7}" fill="#B8B0A4"/><ellipse cx="${-r * 0.25}" cy="${-r * 0.2}" rx="${r * 0.45}" ry="${r * 0.25}" fill="#CEC7BC"/>`,
    poma: (r) => `<circle cy="${r * 0.1}" r="${r * 0.9}" fill="#C9785B"/><path d="M0 ${-r * 0.7} q${r * 0.1} ${-r * 0.4} ${r * 0.4} ${-r * 0.5}" stroke="#786654" stroke-width="${r * 0.1}" fill="none"/><ellipse cx="${r * 0.35}" cy="${-r * 0.95}" rx="${r * 0.28}" ry="${r * 0.14}" fill="#9D9B60"/>`,
  };
  const SERIE = { f: 'fulla', p: 'pedra', e: 'estrella', b: 'bola', c: 'castanya', l: 'flor', m: 'poma' };
  const icona = (nom, x, y, r) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">${(ICONES[nom] || ICONES.bola)(r)}</g>`;

  /* ---------- Cos de cada tipus d'exercici: {w, h, svg}. mode: 'digital' | 'paper' ---------- */
  const EX = {
    ressegueix(ex, mode) {
      const car = [...ex.caracters];
      if (mode === 'digital') return car.reduce((files, c, i) => { (files[Math.floor(i / 3)] ||= []).push(c); return files; }, [])
        .map((f) => ({ w: f.length * 120 + 20, h: 170, svg: f.map((c, i) => guia(c, 20 + i * 120, 15)).join(''), pissarra: 'traç' }));
      return [{ w: car.length * 120 + 20, h: 170, svg: car.map((c, i) => guia(c, 20 + i * 120, 15)).join('') }];
    },
    dibuixa(ex, mode) {
      // en paper ocupa tota l'amplada (com el «Practiquem nosaltres» de les fitxes); en digital és més alt, per dibuixar-hi
      const [w, h] = mode === 'digital' ? [300, 170] : [546, 90];
      return [{ w, h, svg: `<rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" rx="10" fill="none" stroke="${C.talp}" stroke-width="1.5"/>`, pissarra: 'dibuix' }];
    },
    encercla(ex) {
      const els = ex.elements, n = els.length, files = n > 7 ? 2 : 1, cols = Math.ceil(n / files), r = rnd(llavor(els.join('')));
      const mides = [34, 22, 42, 17, 30, 26, 46, 20, 36, 18, 28, 40, 24];
      const W = 300, H = files * 62 + 8, cw = W / cols;
      let s = '';
      els.forEach((e, i) => {
        // cada fila es reparteix tota l'amplada; una mica de desordre perquè sembli escampat a mà
        const fila = Math.floor(i / cols), col = i % cols, m = mides[i % mides.length];
        const aFila = fila ? n - cols : Math.min(cols, n), cwf = W / aFila;
        const x = (col + 0.5) * cwf + (r() - 0.5) * cwf * 0.25;
        const y = 36 + fila * 62 + (r() - 0.5) * 14;
        const nombre = /^\d+$/.test(e);
        s += `<g class="el" data-ok="${e === ex.objectiu ? 1 : 0}" data-m="${m}" data-x="${x.toFixed(1)}" data-y="${y.toFixed(1)}">
          <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${Math.max(16, m * 0.7)}" fill="transparent"/>
          <text x="${x.toFixed(1)}" y="${(y + m * 0.36).toFixed(1)}" font-size="${m * 1.15}" text-anchor="middle" fill="${nombre ? '#55504A' : C.tinta}"
            font-family="${nombre ? ff('xifres') : ff('titols')}" font-weight="${nombre ? 700 : 500}">${esc(e)}</text></g>`;
      });
      return [{ w: W, h: H, svg: s }];
    },
    compta(ex, mode) {
      const W = ex.grups.length * 110, H = 125;
      const peces = ex.grups.map((g, i) => {
        const x0 = mode === 'digital' ? 0 : i * 110, per = g.n === 4 ? 2 : Math.min(3, g.n), files = Math.ceil(g.n / per), rad = g.n > 4 ? 11 : 15, pas = rad * 2.3;
        let it = '';
        for (let k = 0; k < g.n; k++) {
          const fila = Math.floor(k / per), aFila = Math.min(per, g.n - fila * per);
          it += icona(g.element, x0 + 55 - ((aFila - 1) * pas) / 2 + (k % per) * pas, 48 - ((files - 1) * pas) / 2 + fila * pas, rad);
        }
        const ops = g.opcions.map((v, j) => `<g class="op" data-g="${i}" data-ok="${v === g.n ? 1 : 0}" data-x="${x0 + 55 + (j - 1) * 26}" data-y="104">
          <circle cx="${x0 + 55 + (j - 1) * 26}" cy="104" r="12" fill="transparent"/>
          <text x="${x0 + 55 + (j - 1) * 26}" y="110" font-size="17" text-anchor="middle" font-family="${ff('xifres')}" font-weight="600" fill="${C.marro}">${v}</text></g>`).join(`<text>`);
        const punts = [0, 1].map((j) => `<circle cx="${x0 + 55 - 13 + j * 26}" cy="104" r="1.6" fill="${C.talp}"/>`).join('');
        return it + ops.replace(/<text>/g, '') + punts;
      });
      if (mode === 'digital') return peces.map((svg) => ({ w: 110, h: 125, svg }));
      return [{ w: W, h: H, svg: peces.join('') }];
    },
    serie(ex, mode) {
      const W = 330, H = ex.files.length * 52 + 4;
      const s = ex.files.map((fila, j) => {
        const opcions = [...new Set(fila.replace(/\?/g, ''))];
        const y = 28 + j * 52;
        let t = `<rect x="2" y="${y - 23}" width="${mode === 'digital' ? 236 : 326}" height="46" rx="10" fill="none" stroke="${C.sorra}" stroke-width="1.2"/>`;
        const correcte = endevina(fila);
        [...fila].forEach((k, i) => {
          const x = 24 + i * 38;
          t += k === '?' ? `<g class="buit" data-fila="${j}"><rect x="${x - 15}" y="${y - 15}" width="30" height="30" rx="7" fill="none" stroke="${C.talp}" stroke-width="1.3" stroke-dasharray="4 3"/></g>`
            : icona(SERIE[k], x, y, 12);
        });
        if (mode === 'digital') t += opcions.map((o, i) => `<g class="op" data-fila="${j}" data-ok="${o === correcte ? 1 : 0}" data-v="${o}" data-x="${262 + i * 40}" data-y="${y}">
          <rect x="${247 + i * 40}" y="${y - 17}" width="34" height="34" rx="9" fill="#FBF9F5" stroke="${C.sorra}"/>${icona(SERIE[o], 262 + i * 40 + 2, y, 11)}</g>`).join('');
        return t;
      }).join('');
      return [{ w: W, h: H, svg: s }];
    },
  };
  /** Què va al lloc del «?»: el patró que es repeteix. */
  function endevina(fila) {
    const p = fila.indexOf('?'), b = fila.slice(0, p);
    for (let n = 1; n <= b.length; n++) { const pat = b.slice(0, n); let ok = true; for (let i = 0; i < b.length; i++) if (b[i] !== pat[i % n]) { ok = false; break; } if (ok) return pat[p % n]; }
    return b[b.length - 1];
  }

  /* ---------- Versió imprimible (A4) ---------- */
  const ALT = { ressegueix: 34, dibuixa: 30, encercla: 0, compta: 0, serie: 0 };
  function svgPaper(r, area, lang, textos) {
    const exs = r.full.exercicis, cossos = exs.map((ex) => EX[ex.tipus](ex, 'paper')[0]);
    const amp = 182, alts = cossos.map((c, i) => ALT[exs[i].tipus] || (amp * c.h) / c.w);
    const disp = 250 - 70 - exs.length * 13, esc2 = Math.min(1, disp / alts.reduce((a, b) => a + b, 0));
    let y = 72, cos = '';
    exs.forEach((ex, i) => {
      const h = alts[i] * esc2, c = cossos[i];
      cos += `<text x="16" y="${y}" font-family="${ff('enunciat')}" font-size="4.2" fill="${C.tinta}">${i + 1}. ${esc(ex.text[lang])}</text>`;
      cos += `<svg x="${14 + (amp - Math.min(amp, (h * c.w) / c.h)) / 2}" y="${y + 4}" width="${Math.min(amp, (h * c.w) / c.h)}" height="${h}" viewBox="0 0 ${c.w} ${c.h}" preserveAspectRatio="xMidYMid meet">${c.svg}</svg>`;
      y += h + 13;
    });
    const logo = (window.XIU_LOGO || '').replace('<svg ', '<svg x="93" y="272" width="24" height="17" opacity=".3" ');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
      <rect width="210" height="297" fill="${C.paper}"/>
      <text x="12" y="27" style="font-feature-settings:'lnum' 1" font-family="${ff('titols')}" font-weight="500" font-size="${Math.min(13, 184 / (r.titol[lang].length * 0.58)).toFixed(2)}" letter-spacing=".6" fill="${C.tinta}">${esc(r.titol[lang].toUpperCase())}</text>
      <text x="12" y="39" font-family="${ff('manuscrita')}" font-size="10" fill="${C.tinta}">${esc(r.subtitol[lang])}</text>
      <line x1="0" y1="45" x2="210" y2="45" stroke="${C.talp}" stroke-width="0.3"/>
      <circle cx="14" cy="51" r="1.6" fill="${area.color}"/>
      <text x="18" y="52.3" font-family="${ff('text')}" font-size="3.8" fill="${C.marro}">${esc(area[lang])}    ·    ${esc(r.edat)} ${lang === 'es' ? 'años' : 'anys'}</text>
      ${cos}
      <text x="14" y="262" font-family="${ff('text')}" font-size="3.6" fill="${C.marro}">${esc(textos.nom)} ${textos.infant ? `</text><text x="27" y="261.6" font-family="${ff('manuscrita')}" font-size="7" fill="${C.tinta}">${esc(textos.infant)}` : '______________________________'}</text>
      <text x="140" y="262" font-family="${ff('text')}" font-size="3.6" fill="${C.marro}">${esc(textos.data)} ______________</text>
      ${logo}</svg>`;
  }

  /* ---------- Activitat explicada, en paper (com «La panera dels tresors») ---------- */
  // Partir el text en línies segons l'amplada (aproximada: Quicksand fa ~0,44 em de mitjana per caràcter)
  function linies(txt, ampMm, mida) {
    const max = Math.floor(ampMm / (mida * 0.46)), out = [];
    let l = '';
    for (const p of String(txt).split(/\s+/)) {
      if (l && (l + ' ' + p).length > max) { out.push(l); l = p; } else l = l ? l + ' ' + p : p;
    }
    if (l) out.push(l);
    return out;
  }
  const TXT_ACT = {
    ca: { int: 'Intenció pedagògica', tre: 'Què treballem?', mat: 'Materials', prep: 'Preparació', des: 'Desenvolupament', var: 'Variants i adaptacions', seg: 'Seguretat', anys: 'anys' },
    es: { int: 'Intención pedagógica', tre: '¿Qué trabajamos?', mat: 'Materiales', prep: 'Preparación', des: 'Desarrollo', var: 'Variantes y adaptaciones', seg: 'Seguridad', anys: 'años' },
  };
  function svgActivitat(r, area, lang) {
    const L = (o) => (typeof o === 'string' ? o : o[lang]), tx = TXT_ACT[lang];
    // prova mides de lletra fins que tot hi cap
    for (const m of [4.8, 4.5, 4.2, 3.9, 3.6, 3.35, 3.1, 2.9]) {
      const s = muntaActivitat(r, area, lang, L, tx, m);
      if (s.y <= 266) return s.svg;
      if (m === 2.9) return s.svg;
    }
  }
  function muntaActivitat(r, area, lang, L, tx, m) {
    const lh = m * 1.45, ESQ = 14, AMP = 182;
    let cos = '', y;
    const text = (x, yy, t, o = {}) => `<text x="${x}" y="${yy.toFixed(1)}" font-family="${ff(o.f || 'text')}" font-size="${o.m || m}" fill="${o.c || C.tinta}"${o.w ? ` font-weight="${o.w}"` : ''}>${esc(t)}</text>`;
    const titolSec = (x, yy, t) => text(x, yy, t, { f: 'titols', m: m * 1.6, w: 600 });
    const paragraf = (x, yy, t, amp) => { const ls = linies(t, amp, m); ls.forEach((l, i) => (cos += text(x, yy + i * lh, l))); return yy + ls.length * lh; };
    const llista = (x, yy, items, amp, marca = '✓') => {
      items.forEach((it, i) => {
        const ls = linies(it, amp - 5, m);
        cos += text(x, yy, marca === 'n' ? `${i + 1}.` : marca, { c: area.color, w: 700 });
        ls.forEach((l, k) => (cos += text(x + 5, yy + k * lh, l)));
        yy += ls.length * lh + m * 0.45;
      });
      return yy;
    };
    // títol (pot ocupar dues línies), subtítol i línia d'àrea
    const tl = linies(L(r.titol).toUpperCase(), 184, 13 * 1.32); // majúscules espaiades: ~0,58 em per lletra
    tl.forEach((l, i) => (cos += `<text x="12" y="${27 + i * 13}" style="font-feature-settings:'lnum' 1" font-family="${ff('titols')}" font-weight="500" font-size="13" letter-spacing=".6" fill="${C.tinta}">${esc(l)}</text>`));
    y = 27 + (tl.length - 1) * 13 + 12;
    cos += `<text x="12" y="${y}" font-family="${ff('manuscrita')}" font-size="10" fill="${C.tinta}">${esc(L(r.subtitol))}</text>`;
    y += 6;
    cos += `<line x1="0" y1="${y}" x2="210" y2="${y}" stroke="${C.talp}" stroke-width="0.3"/>`;
    y += 6;
    cos += `<circle cx="14" cy="${y - 1.2}" r="1.6" fill="${area.color}"/>` + text(18, y, `${area[lang]}    ·    ${r.edat} ${tx.anys}    ·    ${L(r.durada)}`, { m: 3.8, c: C.marro });
    y += 9;
    // intenció, en una caixa
    const li = linies(L(r.intencio), AMP - 12, m);
    const hInt = 8 + m * 1.6 + li.length * lh;
    cos += `<rect x="${ESQ}" y="${y - 5}" width="${AMP}" height="${hInt}" rx="5" fill="#E9E3DA"/>`;
    cos += titolSec(ESQ + 6, y + 2, tx.int);
    li.forEach((l, i) => (cos += text(ESQ + 6, y + 3 + m * 1.6 + i * lh, l)));
    y += hInt + 6;
    // dues columnes: què treballem | materials
    const col = (AMP - 8) / 2, X2 = ESQ + col + 8;
    cos += titolSec(ESQ, y, tx.tre) + titolSec(X2, y, tx.mat);
    const y1 = llista(ESQ, y + 7, L(r.treballa), col), y2 = llista(X2, y + 7, L(r.materials), col, '•');
    y = Math.max(y1, y2) + 4;
    cos += `<line x1="${ESQ}" y1="${y - 3}" x2="${ESQ + AMP}" y2="${y - 3}" stroke="${C.sorra}" stroke-width="0.3"/>`;
    // preparació i desenvolupament
    cos += titolSec(ESQ, y + 4, tx.prep);
    y = paragraf(ESQ, y + 11, L(r.preparacio), AMP) + 4;
    cos += titolSec(ESQ, y + 2, tx.des);
    y = llista(ESQ, y + 9, L(r.desenvolupament), AMP, 'n') + 3;
    cos += `<line x1="${ESQ}" y1="${y - 3}" x2="${ESQ + AMP}" y2="${y - 3}" stroke="${C.sorra}" stroke-width="0.3"/>`;
    // variants | seguretat
    cos += titolSec(ESQ, y + 4, tx.var) + titolSec(X2, y + 4, tx.seg);
    const y3 = llista(ESQ, y + 11, L(r.variants), col, '•'), y4 = llista(X2, y + 11, L(r.seguretat), col, '!');
    y = Math.max(y3, y4);
    const logo = (window.XIU_LOGO || '').replace('<svg ', '<svg x="93" y="276" width="24" height="17" opacity=".3" ');
    return { y, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm">
      <rect width="210" height="297" fill="${C.paper}"/>${cos}${logo}</svg>` };
  }

  let fontsCss = null;
  async function carregaFonts() {
    if (fontsCss != null) return fontsCss;
    const parts = [];
    for (const f of FT().fitxers || []) {
      try {
        const b = new Uint8Array(await (await fetch(f.url)).arrayBuffer());
        let s = ''; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000));
        const mime = /\.woff2$/.test(f.url) ? 'font/woff2' : /\.woff$/.test(f.url) ? 'font/woff' : /\.otf$/.test(f.url) ? 'font/otf' : 'font/ttf';
        parts.push(`@font-face{font-family:'${f.familia}';font-weight:${f.pes};src:url(data:${mime};base64,${btoa(s)})}`);
      } catch (e) { /* sense aquesta font: la de reserva */ }
    }
    return (fontsCss = parts.join(''));
  }
  async function pdf(r, area, lang, textos) {
    if (r.full && r.full.model === 'pdf') {
      const src = r.full.pdf[lang] || r.full.pdf.ca;
      const res = await fetch(window.XIU_URL ? XIU_URL(src) : src);
      if (!res.ok) throw new Error('PDF no disponible');
      return new Uint8Array(await res.arrayBuffer());
    }
    const css = await carregaFonts();
    const s = (r.tipus === 'fitxa' ? svgPaper(r, area, lang, textos) : svgActivitat(r, area, lang)).replace('>', `><style>${css}</style>`);
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
    await img.decode();
    await new Promise((ok) => setTimeout(ok, 80));
    const W = 2480, H = 3508;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d'); ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
    ctx.drawImage(img, 0, 0, W, H);
    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', compress: true });
    doc.setProperties({ title: `XIU · ${r.titol[lang]}`, creator: 'XIU · Aprendre jugant' });
    doc.addImage(cv.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, 210, 297);
    return new Uint8Array(doc.output('arraybuffer'));
  }

  /* ---------- Versió digital ---------- */
  const pagines = (r, lang) => (r.full.pagines[lang] || r.full.pagines.ca);
  function html(r, lang, T) {
    if (r.full.model === 'pdf') {
      const ps = pagines(r, lang).map((p, k) => `<div class="pis pagina" data-k="${k}" data-p="dibuix" style="aspect-ratio:${p.w}/${p.h};--ar:${(p.w / p.h).toFixed(3)}">
        <svg viewBox="0 0 ${p.w} ${p.h}"><image href="${esc(window.XIU_URL ? XIU_URL(p.src) : p.src)}" width="${p.w}" height="${p.h}"/></svg></div>`).join('');
      const colors = `<span class="colors">${['#38332E', '#C9785B', '#8FA68A', '#D1A35A', '#8EA2B4'].map((c, j) => `<button class="color${j ? '' : ' on'}" data-c="${c}" style="background:${c}" aria-label="color"></button>`).join('')}</span>`;
      return `<section class="ex" data-tipus="dibuixa" data-i="0"><div class="exT">${esc(T.ambElDit || '')}</div>
        <div class="exC">${ps}</div><div class="exF">${colors}<button class="mini" data-esborra>${T.esborra}</button></div></section>`;
    }
    return r.full.exercicis.map((ex, i) => {
      const parts = EX[ex.tipus](ex, 'digital');
      const cos = parts.map((p, k) => `<div class="pis" data-k="${k}" ${p.pissarra ? `data-p="${p.pissarra}"` : ''} style="aspect-ratio:${p.w}/${p.h};--ar:${(p.w / p.h).toFixed(3)}">
        <svg viewBox="0 0 ${p.w} ${p.h}">${p.svg}</svg></div>`).join('');
      const colors = ex.tipus === 'dibuixa' ? `<span class="colors">${['#38332E', '#C9785B', '#8FA68A', '#D1A35A', '#8EA2B4'].map((c, j) => `<button class="color${j ? '' : ' on'}" data-c="${c}" style="background:${c}" aria-label="color"></button>`).join('')}</span>` : '';
      const esborra = ex.tipus === 'ressegueix' || ex.tipus === 'dibuixa' ? `<button class="mini" data-esborra>${T.esborra}</button>` : `<button class="mini" data-reinicia>${T.reinicia}</button>`;
      return `<section class="ex" data-tipus="${ex.tipus}" data-i="${i}">
        <div class="exT"><b>${i + 1}.</b> ${esc(ex.text[lang])}</div>
        <div class="exC${ex.tipus === 'compta' ? ' grups' : ''}">${cos}</div>
        <div class="exF">${colors}${esborra}<span class="be">${T.moltbe}</span></div></section>`;
    }).join('');
  }

  /** Superfície per dibuixar amb el dit sobre un .pis. onTraç(punts en coordenades del viewBox) */
  function pissarra(pis, { gruix, color, onTraç }) {
    const svg = pis.querySelector('svg'), vb = svg.viewBox.baseVal, cv = document.createElement('canvas');
    pis.appendChild(cv);
    const traços = []; let actual = null, col = color;
    const mida = () => { const b = pis.getBoundingClientRect(), d = devicePixelRatio || 1; cv.width = Math.round(b.width * d); cv.height = Math.round(b.height * d); pinta(); };
    const ctx = cv.getContext('2d');
    function pinta() {
      ctx.setTransform(cv.width / vb.width, 0, 0, cv.height / vb.height, 0, 0);
      ctx.clearRect(0, 0, vb.width, vb.height); ctx.lineCap = ctx.lineJoin = 'round';
      for (const t of traços) { ctx.strokeStyle = t.c; ctx.lineWidth = gruix; ctx.beginPath(); t.p.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (t.p.length === 1) ctx.lineTo(t.p[0][0] + 0.1, t.p[0][1]); ctx.stroke(); }
    }
    const pt = (e) => { const b = cv.getBoundingClientRect(); return [((e.clientX - b.left) / b.width) * vb.width, ((e.clientY - b.top) / b.height) * vb.height]; };
    cv.addEventListener('pointerdown', (e) => { e.preventDefault(); cv.setPointerCapture(e.pointerId); actual = { c: col, p: [pt(e)] }; traços.push(actual); pinta(); });
    cv.addEventListener('pointermove', (e) => { if (!actual) return; actual.p.push(pt(e)); pinta(); });
    const fi = () => { if (!actual) return; actual = null; onTraç && onTraç(traços); };
    cv.addEventListener('pointerup', fi); cv.addEventListener('pointercancel', fi);
    new ResizeObserver(mida).observe(pis);
    return { esborra() { traços.length = 0; pinta(); }, color(c) { col = c; } };
  }

  /** Quina part de la guia s'ha resseguit (0..1). */
  function cobertura(pis, traços) {
    const punts = [];
    for (const t of traços) for (let i = 0; i < t.p.length; i++) {
      const [x, y] = t.p[i]; punts.push([x, y]);
      if (i) { const [px, py] = t.p[i - 1], d = Math.hypot(x - px, y - py); for (let k = 3; k < d; k += 3) punts.push([px + ((x - px) * k) / d, py + ((y - py) * k) / d]); }
    }
    let total = 0, fets = 0;
    pis.querySelectorAll('path.guia').forEach((p) => {
      const L = p.getTotalLength(), x0 = +p.dataset.x, y0 = +p.dataset.y, s = +p.dataset.s;
      for (let d = 0; d <= L; d += 6) {
        const q = p.getPointAtLength(d), gx = x0 + q.x * s, gy = y0 + q.y * s; total++;
        if (punts.some(([x, y]) => (x - gx) ** 2 + (y - gy) ** 2 < 15 ** 2)) fets++;
      }
    });
    return total ? fets / total : 0;
  }

  const cercle = (x, y, rx, ry) => `<ellipse class="cercle" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(-8 ${x} ${y})" fill="none" stroke="${C.traç}" stroke-width="2.4" stroke-linecap="round"/>`;
  function sacseja(el) { el.classList.remove('mal'); void el.getBoundingClientRect(); el.classList.add('mal'); }

  /** Dona vida a la versió digital ja posada dins de `arrel`. */
  function munta(arrel) {
    arrel.querySelectorAll('.ex').forEach((sec) => {
      const tipus = sec.dataset.tipus, fet = (v = true) => {
        const abans = sec.classList.contains('fet'); sec.classList.toggle('fet', v);
        // tots els exercicis fets → l'app ho apunta al progrés de l'infant
        if (v && !abans && [...arrel.querySelectorAll('.ex')].every((x) => x.classList.contains('fet') || x.dataset.tipus === 'dibuixa')) arrel.dispatchEvent(new CustomEvent('xiu-fitxa-feta', { bubbles: true }));
      };
      if (tipus === 'ressegueix') {
        // cada fila té la seva pissarra; l'exercici és fet quan totes les guies estan resseguides (> 85 %)
        const pis = [...sec.querySelectorAll('.pis')];
        const ps = pis.map((p) => { p._t = []; return pissarra(p, { gruix: 9, color: C.traç, onTraç: (t) => {
          p._t = t; fet(pis.every((q) => cobertura(q, q._t) > 0.85)); } }); });
        sec.querySelector('[data-esborra]').onclick = () => { ps.forEach((x) => x.esborra()); pis.forEach((p) => (p._t = [])); fet(false); };
      } else if (tipus === 'dibuixa') {
        const ps = [...sec.querySelectorAll('.pis')].map((p) => pissarra(p, { gruix: 5 * p.querySelector('svg').viewBox.baseVal.width / 300, color: C.tinta, onTraç: () => fet() }));
        sec.querySelectorAll('.color').forEach((b) => (b.onclick = () => { sec.querySelectorAll('.color').forEach((x) => x.classList.remove('on')); b.classList.add('on'); ps.forEach((p) => p.color(b.dataset.c)); }));
        sec.querySelector('[data-esborra]').onclick = () => { ps.forEach((p) => p.esborra()); fet(false); };
      } else {
        const capes = [...sec.querySelectorAll('.pis svg')].map((svg) => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'g'); svg.appendChild(c); return c; });
        const objectius = sec.querySelectorAll(tipus === 'encercla' ? '.el[data-ok="1"]' : '.op[data-ok="1"]').length;
        let trobats = new Set();
        sec.querySelectorAll(tipus === 'encercla' ? '.el' : '.op').forEach((el, idx) => {
          const svg = el.ownerSVGElement, capa = svg.lastElementChild;
          el.style.cursor = 'pointer';
          el.addEventListener('click', () => {
            if (el.dataset.ok !== '1') return sacseja(el);
            if (trobats.has(idx)) return;
            trobats.add(idx);
            const x = +el.dataset.x, y = +el.dataset.y;
            if (tipus === 'encercla') { const m = +el.dataset.m; capa.insertAdjacentHTML('beforeend', cercle(x, y, m * 0.62 + 5, m * 0.7 + 4)); }
            else if (tipus === 'compta') capa.insertAdjacentHTML('beforeend', cercle(x, y, 13, 13));
            else { const b = svg.querySelector(`.buit[data-fila="${el.dataset.fila}"] rect`); const bx = +b.getAttribute('x') + 15, by = +b.getAttribute('y') + 15;
              capa.insertAdjacentHTML('beforeend', icona(SERIE[el.dataset.v], bx, by, 12)); }
            if (trobats.size === objectius) fet();
          });
        });
        sec.querySelector('[data-reinicia]').onclick = () => { capes.forEach((c) => (c.innerHTML = '')); trobats = new Set(); fet(false); };
      }
    });
  }

  /** Diverses fitxes i activitats en un sol PDF (per revisar o per a un paquet). */
  async function pdfLot(recursos, arees, lang, textos) {
    const css = await carregaFonts();
    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', compress: true });
    const W = 1654, H = 2339; // 200 ppp: prou per revisar i no tan pesat
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    recursos = recursos.filter((r) => !(r.full && r.full.model === 'pdf'));
    for (let i = 0; i < recursos.length; i++) {
      const r = recursos[i];
      const s = (r.tipus === 'fitxa' ? svgPaper(r, arees[r.area], lang, textos) : svgActivitat(r, arees[r.area], lang)).replace('>', `><style>${css}</style>`);
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
      await img.decode();
      await new Promise((ok) => setTimeout(ok, 30));
      ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H); ctx.drawImage(img, 0, 0, W, H);
      if (i) doc.addPage();
      doc.addImage(cv.toDataURL('image/jpeg', 0.85), 'JPEG', 0, 0, 210, 297);
    }
    return new Uint8Array(doc.output('arraybuffer'));
  }

  /** Vista prèvia per imprimir: per a una fitxa PDF, les seves pàgines; si no, l'A4 generat. */
  function previa(r, area, lang, textos) {
    if (r.full && r.full.model === 'pdf') return pagines(r, lang).map((p) => `<div class="sheet"><img src="${esc(window.XIU_URL ? XIU_URL(p.src) : p.src)}" alt="" loading="lazy" style="display:block;width:100%"></div>`).join('');
    return `<div class="sheet">${svgPaper(r, area, lang, textos)}</div>`;
  }

  /** La mateixa fitxa per a tota la classe: una còpia per infant, amb el seu nom (o `noms` buits = còpies sense nom). */
  async function pdfAula(r, area, lang, textos, noms) {
    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', compress: true });
    doc.setProperties({ title: `XIU · ${r.titol[lang]}`, creator: 'XIU · Aprendre jugant' });
    let primera = true;
    const pagina = (url, w = 210, h = 297) => { if (!primera) doc.addPage([w, h], h >= w ? 'portrait' : 'landscape'); primera = false; doc.addImage(url, 'JPEG', 0, 0, w, h, undefined, 'FAST'); };
    if (r.full && r.full.model === 'pdf') {
      const ps = await Promise.all(pagines(r, lang).map(async (p) => {
        const im = new Image(); im.crossOrigin = 'anonymous'; im.src = window.XIU_URL ? XIU_URL(p.src) : p.src; await im.decode();
        const cv = document.createElement('canvas'); cv.width = im.naturalWidth; cv.height = im.naturalHeight; cv.getContext('2d').drawImage(im, 0, 0);
        return { url: cv.toDataURL('image/jpeg', 0.88), w: 210, h: (210 * p.h) / p.w };
      }));
      for (const nom of noms) ps.forEach((p, i) => {
        pagina(p.url, p.w, p.h);
        if (i === 0 && nom) { doc.setFillColor(255, 255, 255); doc.roundedRect(150, 6, 54, 10, 2, 2, 'F'); doc.setFont('helvetica', 'normal'); doc.setFontSize(12); doc.setTextColor(56, 51, 46); doc.text(nom, 177, 12.8, { align: 'center' }); }
      });
    } else {
      const css = await carregaFonts(), W = 2480, H = 3508, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      const ctx = cv.getContext('2d');
      for (const nom of noms) {
        const s = svgPaper(r, area, lang, { ...textos, infant: nom || '' }).replace('>', `><style>${css}</style>`);
        const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s); await img.decode();
        await new Promise((ok) => setTimeout(ok, 30));
        ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H); ctx.drawImage(img, 0, 0, W, H);
        pagina(cv.toDataURL('image/jpeg', 0.85));
      }
    }
    return new Uint8Array(doc.output('arraybuffer'));
  }

  /** Un dels dibuixos (estrella, flor, bola, castanya, fulla, pedra, poma) centrat a (0,0), de radi r. */
  const dibuix = (nom, r) => (ICONES[nom] || ICONES.bola)(r);
  window.XFitxa = { html, munta, svg: svgPaper, svgActivitat, previa, pdf, pdfLot, endevina, dibuix, pdfAula, DIBUIXOS: Object.keys(ICONES) };
})();
