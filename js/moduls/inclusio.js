// XIU · A cada proposta: «Per a tots els infants» (com adaptar-la a necessitats diferents, i una agenda visual per imprimir)
// i «Què pots observar» (senyals que l'infant avança, segons l'àrea i l'edat). Una proposta pot portar els seus propis
// textos amb els camps «adaptacions» i «observar» ({ca:[...], es:[...]}); si no, es fan servir aquests.
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  A.textos({
    ca: { inclusio: 'Per a tots els infants', inclusioP: 'Idees per adaptar-la a cada infant.', observar: 'Què pots observar', observarP: 'Petits senyals que l\'infant avança. No és un examen: cada infant té el seu ritme.',
      agenda: 'Agenda visual (PDF)', agendaP: 'Els passos en targetes, per anticipar què farem (molt útil per a infants amb TEA).', pasA: 'Pas',
      cat: { motriu: 'Si li costa moure les mans o el cos', atencio: 'Si li costa mantenir l\'atenció', comunicacio: 'Si li costa comunicar-se o els canvis (TEA)', sensorial: 'Si li molesten els sorolls, les textures o la llum' } },
    es: { inclusio: 'Para todos los niños y niñas', inclusioP: 'Ideas para adaptarla a cada niño o niña.', observar: 'Qué puedes observar', observarP: 'Pequeñas señales de que avanza. No es un examen: cada niño o niña tiene su ritmo.',
      agenda: 'Agenda visual (PDF)', agendaP: 'Los pasos en tarjetas, para anticipar qué haremos (muy útil para niños y niñas con TEA).', pasA: 'Paso',
      cat: { motriu: 'Si le cuesta mover las manos o el cuerpo', atencio: 'Si le cuesta mantener la atención', comunicacio: 'Si le cuesta comunicarse o los cambios (TEA)', sensorial: 'Si le molestan los ruidos, las texturas o la luz' } },
  });
  // adaptacions generals per necessitat, i una de concreta per àrea
  const AD = {
    ca: { motriu: ['Feu servir objectes més grossos i fàcils d\'agafar (o engruixiu els mànecs amb esponja o cinta).', 'Fixeu el recipient o el paper a la taula perquè no es mogui.'],
      atencio: ['Poques coses a la vista: traieu el que no cal i feu-ho en un racó tranquil.', 'Partides curtes i en petits passos; celebreu cada pas.'],
      comunicacio: ['Anticipeu-ho amb l\'agenda visual: primer això, després allò.', 'Poques paraules i sempre les mateixes; ensenyeu-ho fent-ho vosaltres.'],
      sensorial: ['Deixeu que s\'hi acosti al seu ritme: primer mirar, després tocar amb un estri.', 'Tingueu a mà un drap i un lloc on retirar-se si se satura.'] },
    es: { motriu: ['Usad objetos más grandes y fáciles de coger (o engrosad los mangos con esponja o cinta).', 'Fijad el recipiente o el papel a la mesa para que no se mueva.'],
      atencio: ['Pocas cosas a la vista: quitad lo que no hace falta y hacedlo en un rincón tranquilo.', 'Partidas cortas y en pequeños pasos; celebrad cada paso.'],
      comunicacio: ['Anticipadlo con la agenda visual: primero esto, después aquello.', 'Pocas palabras y siempre las mismas; enseñadlo haciéndolo vosotros.'],
      sensorial: ['Dejad que se acerque a su ritmo: primero mirar, después tocar con un utensilio.', 'Tened a mano un trapo y un sitio donde retirarse si se satura.'] },
  };
  const ADAREA = {
    ca: { exp: 'Comenceu amb un sol material i afegiu-ne d\'altres a poc a poc.', llen: 'Acompanyeu les paraules amb gestos o imatges; valoreu qualsevol forma de comunicar.', mot: 'Si cal, feu-ho amb tota la mà abans de demanar la pinça amb els dits.',
      log: 'Comenceu amb quantitats petites (fins a 3) i objectes que es puguin tocar.', cre: 'No hi ha una manera bona de fer-ho: deixeu que triï el material i el ritme.', aut: 'Feu-ne una part vosaltres i deixeu-li l\'últim pas: així acaba amb èxit.' },
    es: { exp: 'Empezad con un solo material y añadid otros poco a poco.', llen: 'Acompañad las palabras con gestos o imágenes; valorad cualquier forma de comunicar.', mot: 'Si hace falta, hacedlo con toda la mano antes de pedir la pinza con los dedos.',
      log: 'Empezad con cantidades pequeñas (hasta 3) y objetos que se puedan tocar.', cre: 'No hay una manera buena de hacerlo: dejad que elija el material y el ritmo.', aut: 'Haced una parte vosotros y dejadle el último paso: así acaba con éxito.' },
  };
  // què observar per àrea: [0-3 anys, 3-6 anys]
  const OBS = {
    ca: {
      exp: [['Explora amb les mans i la boca, i hi torna', 'Repeteix una acció per veure què passa', 'Mostra sorpresa davant d\'una cosa nova'], ['Fa prediccions («crec que flotarà»)', 'Compara i classifica per una qualitat', 'Explica què ha passat amb les seves paraules']],
      llen: [['Respon al seu nom i a paraules conegudes', 'Assenyala per demanar o mostrar', 'Diu o imita paraules noves'], ['Explica un fet en ordre (primer, després)', 'Fa servir paraules noves que ha après', 'Escolta i respon preguntes sobre un conte']],
      mot: [['Agafa i deixa objectes amb intenció', 'Passa un objecte d\'una mà a l\'altra', 'Comença a fer la pinça (polze i índex)'], ['Fa la pinça amb control', 'Ressegueix línies i formes sense sortir-se gaire', 'Agafa el llapis amb tres dits']],
      log: [['Busca un objecte que s\'ha amagat', 'Encaixa i apila peces', 'Agrupa coses iguals'], ['Compta objectes un a un sense saltar-se\'n cap', 'Continua una sèrie senzilla', 'Ordena per mida (petit, mitjà, gran)']],
      cre: [['Gaudeix del material i el fa servir a la seva manera', 'Fa sons i moviments amb la música', 'Fa marques amb pintura o ceres'], ['Explica què ha dibuixat o creat', 'Inventa una història o un personatge', 'Tria colors i materials amb intenció']],
      aut: [['Intenta fer-ho sol («jo!»)', 'Col·labora en rutines (rentar-se les mans, recollir)', 'Expressa què vol i què no'], ['Fa sol els passos d\'una rutina', 'Demana ajuda quan la necessita', 'Espera el torn i comparteix el material']],
    },
    es: {
      exp: [['Explora con las manos y la boca, y vuelve a ello', 'Repite una acción para ver qué pasa', 'Muestra sorpresa ante algo nuevo'], ['Hace predicciones («creo que flotará»)', 'Compara y clasifica por una cualidad', 'Explica qué ha pasado con sus palabras']],
      llen: [['Responde a su nombre y a palabras conocidas', 'Señala para pedir o mostrar', 'Dice o imita palabras nuevas'], ['Explica un hecho en orden (primero, después)', 'Usa palabras nuevas que ha aprendido', 'Escucha y responde preguntas sobre un cuento']],
      mot: [['Coge y suelta objetos con intención', 'Pasa un objeto de una mano a la otra', 'Empieza a hacer la pinza (pulgar e índice)'], ['Hace la pinza con control', 'Repasa líneas y formas sin salirse mucho', 'Coge el lápiz con tres dedos']],
      log: [['Busca un objeto que se ha escondido', 'Encaja y apila piezas', 'Agrupa cosas iguales'], ['Cuenta objetos uno a uno sin saltarse ninguno', 'Continúa una serie sencilla', 'Ordena por tamaño (pequeño, mediano, grande)']],
      cre: [['Disfruta del material y lo usa a su manera', 'Hace sonidos y movimientos con la música', 'Hace marcas con pintura o ceras'], ['Explica qué ha dibujado o creado', 'Inventa una historia o un personaje', 'Elige colores y materiales con intención']],
      aut: [['Intenta hacerlo solo («¡yo!»)', 'Colabora en rutinas (lavarse las manos, recoger)', 'Expresa qué quiere y qué no'], ['Hace solo los pasos de una rutina', 'Pide ayuda cuando la necesita', 'Espera su turno y comparte el material']],
    },
  };
  const l = () => (A.lang === 'es' ? 'es' : 'ca');
  const ul = (xs) => `<ul>${xs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  A.HOOKS.fitxaSota.push((r) => {
    const propi = r.adaptacions && A.L(r.adaptacions), obs = (r.observar && A.L(r.observar)) || OBS[l()][r.area][A.EDATS.indexOf(r.edat) < 3 ? 0 : 1];
    const cats = Object.keys(AD.ca);
    return `<div class="cols extra">
      <details class="box"><summary><h3>${t('inclusio')}</h3><span class="sub2">${t('inclusioP')}</span></summary>
        ${propi ? ul(propi) : cats.map((k) => `<h4>${t('cat')[k]}</h4>${ul(AD[l()][k])}`).join('') + `<p class="nota" style="text-align:left">${esc(ADAREA[l()][r.area])}</p>`}
        ${r.tipus === 'activitat' ? `<div class="actions"><button class="btn" data-agenda="${r.id}">${I.dl}${t('agenda')}</button></div><p class="sub2">${t('agendaP')}</p>` : ''}</details>
      <details class="box"><summary><h3>${t('observar')}</h3><span class="sub2">${t('observarP')}</span></summary>${ul(obs)}</details></div>`;
  });
  // les fitxes PDF i els jocs també (els jocs ja tenen el seu ganxo a recurs; s'hi afegeix sota)
  async function agenda(r) {
    const passos = [A.L(r.preparacio), ...(A.L(r.desenvolupament) || [])].filter(Boolean);
    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape', compress: true });
    const il = window.XIL && XIL.portada(r, A.AREES[r.area]);
    let img = null;
    if (il) { const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(il); await im.decode().catch(() => null);
      const cv = document.createElement('canvas'); cv.width = 400; cv.height = 500; cv.getContext('2d').drawImage(im, 0, 0, 400, 500); img = cv.toDataURL('image/jpeg', 0.85); }
    doc.setFont('times', 'bold'); doc.setFontSize(20); doc.setTextColor(56, 51, 46); doc.text(A.L(r.titol), 14, 16);
    const n = Math.min(passos.length, 6), w = (297 - 28 - (n - 1) * 6) / n;
    passos.slice(0, 6).forEach((p, i) => {
      const x = 14 + i * (w + 6), y = 26;
      doc.setDrawColor(221, 208, 193); doc.setFillColor(255, 255, 255); doc.roundedRect(x, y, w, 168, 4, 4, 'FD');
      doc.setFillColor(56, 51, 46); doc.circle(x + 10, y + 10, 6, 'F'); doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text(String(i + 1), x + 10, y + 14.5, { align: 'center' });
      if (img) doc.addImage(img, 'JPEG', x + 6, y + 20, w - 12, (w - 12) * 1.25);
      doc.setTextColor(56, 51, 46); doc.setFont('helvetica', 'normal'); doc.setFontSize(12);
      doc.text(doc.splitTextToSize(p, w - 10).slice(0, 9), x + 5, y + 30 + (w - 12) * 1.25);
    });
    const m = await XP.desaPdf(new Uint8Array(doc.output('arraybuffer')), `XIU - ${t('agenda').replace(' (PDF)', '')} - ${A.L(r.titol)}.pdf`.replace(/[\\/:*?"<>|]/g, ''), { desat: t('desat') });
    if (m) A.avis(m);
  }
  document.addEventListener('click', (e) => { const el = e.target.closest('[data-agenda]'); if (el) agenda(A.perId[el.dataset.agenda]).catch(() => A.avis(t('errPdf'))); });
});
