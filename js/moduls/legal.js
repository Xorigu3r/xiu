// XIU · Política de privadesa, condicions d'ús, cookies i formulari de contacte.
// Textos orientatius: cal que els revisi un assessor legal abans de cobrar i de publicar a Google Play.
// El titular i el correu de contacte es posen al Gestor (biblioteca.json: titular, contacte).
(window.XIU_MODULS ||= []).push((A) => {
  const { esc, I } = A, t = (k) => A.t(k);
  const titular = () => (A.BIB.titular || '').trim() || t('titularPendent');
  const correu = () => (A.BIB.contacte || '').trim();
  A.textos({
    ca: {
      privadesa: 'Política de privadesa', condicions: "Condicions d'ús", cookies: 'Cookies', contacte: 'Contacte', legal: 'Legal',
      titularPendent: '[nom del titular]', revisaLegal: "Text orientatiu: revisa'l amb un assessor legal abans de començar a cobrar.",
      ajudaMesP: "Escriu-nos i et respondrem tan aviat com puguem.",
      acceptoCond: 'Accepto les <a data-go="#/condicions">condicions d\'ús</a> i la <a data-go="#/privadesa">política de privadesa</a>.',
      privText: () => [
        ['Qui és el responsable', `${titular()} és responsable de les dades que es tracten a XIU.${correu() ? ` Contacte: ${correu()}.` : ''}`],
        ['Quines dades fem servir', "L'idioma, el perfil (família o docent), les edats que t'interessen, els favorits, els infants que hi afegeixis (nom i edat), el progrés, les notes i les fotos de «Ho hem fet», la programació i les observacions. Tot això es desa només en aquest aparell: XIU no ho envia enlloc."],
        ['Compte i pagaments', "Quan hi hagi comptes i pagaments, el teu nom i el teu correu es desaran als nostres servidors (a la Unió Europea) per donar-te accés a Premium en tots els aparells. Els pagaments els farà una plataforma de pagament segura: XIU no veu ni desa mai les dades de la targeta."],
        ['Infants', "XIU s'adreça a persones adultes (famílies i docents). Les dades dels infants que hi afegeixis (només el nom de pila i l'edat) es queden al teu aparell. No les demanem ni les fem servir per a res més."],
        ['Per a què', "Per adaptar les propostes al teu perfil, recordar els teus favorits i el progrés, i, si t'hi apuntes, enviar-te novetats. No fem publicitat ni venem dades."],
        ['Els teus drets', "Pots consultar, corregir o esborrar les teves dades en qualsevol moment: a «Perfil» (o esborrant les dades de l'app) i escrivint-nos. També pots reclamar davant de l'Autoritat Catalana de Protecció de Dades o de l'Agencia Española de Protección de Datos."],
      ],
      condText: () => [
        ['Què és XIU', `XIU · Aprendre jugant és un servei de ${titular()} amb propostes educatives per a infants de 0 a 6 anys, pensades per fer-les amb un adult.`],
        ['Ús del contingut', "Pots fer servir les propostes i imprimir les fitxes per a ús personal i familiar, o amb el teu grup d'infants a l'aula. No pots revendre-les, publicar-les ni distribuir-les. Vegeu «Drets d'autor»."],
        ['Seguretat', "Les activitats s'han de fer sempre amb la supervisió d'una persona adulta. Llegeix les recomanacions de seguretat de cada activitat i adapta-les a cada infant."],
        ['Premium', "XIU es pot fer servir de franc amb una part del contingut. XIU Premium (subscripció mensual o anual, o paquets) dona accés a tot. Les subscripcions es renoven soles fins que les cancel·lis; si cancel·les, conserves l'accés fins al final del període pagat."],
        ['Desistiment', "Si contractes Premium, tens 14 dies per desistir-ne, excepte si ja has començat a fer servir el contingut digital i ho has acceptat expressament en comprar."],
        ['Canvis', "Podem actualitzar aquestes condicions. Si el canvi és important, t'ho direm a l'app."],
      ],
      cookText: () => [
        ['Fem servir cookies?', "XIU no fa servir cookies de publicitat ni de seguiment. Només desa al teu navegador o aparell les teves preferències (idioma, perfil, favorits, progrés...) perquè l'app funcioni, i una còpia del contingut perquè funcioni sense connexió."],
        ['Com ho esborro', "Des de la configuració del navegador (esborrant les dades d'aquest lloc) o, a l'app d'Android, des de la informació de l'app → Emmagatzematge → Esborra les dades."],
      ],
      contacteS: 'Escriu-nos', contacteP: "Dubtes, problemes, suggeriments o propostes per a escoles: et respondrem tan aviat com puguem.",
      motiu: 'Motiu', motius: ['Tinc un dubte', 'Alguna cosa no funciona', 'Un suggeriment', 'Sóc d\'una escola o centre', 'Premium i pagaments'],
      missatge: 'Missatge', envia: 'Envia', errMissatge: 'Escriu el missatge.',
      contacteMail: "S'obrirà el teu programa de correu amb el missatge preparat: només cal que l'enviïs.", contacteAviat: 'Molt aviat podràs escriure\'ns des d\'aquí.',
    },
    es: {
      privadesa: 'Política de privacidad', condicions: 'Condiciones de uso', cookies: 'Cookies', contacte: 'Contacto', legal: 'Legal',
      titularPendent: '[nombre del titular]', revisaLegal: 'Texto orientativo: revísalo con un asesor legal antes de empezar a cobrar.',
      ajudaMesP: 'Escríbenos y te responderemos lo antes posible.',
      acceptoCond: 'Acepto las <a data-go="#/condicions">condiciones de uso</a> y la <a data-go="#/privadesa">política de privacidad</a>.',
      privText: () => [
        ['Quién es el responsable', `${titular()} es responsable de los datos que se tratan en XIU.${correu() ? ` Contacto: ${correu()}.` : ''}`],
        ['Qué datos usamos', 'El idioma, el perfil (familia o docente), las edades que te interesan, los favoritos, los niños y niñas que añadas (nombre y edad), el progreso, las notas y las fotos de «Lo hemos hecho», la programación y las observaciones. Todo esto se guarda solo en este dispositivo: XIU no lo envía a ningún sitio.'],
        ['Cuenta y pagos', 'Cuando haya cuentas y pagos, tu nombre y tu correo se guardarán en nuestros servidores (en la Unión Europea) para darte acceso a Premium en todos los dispositivos. Los pagos los hará una plataforma de pago segura: XIU nunca ve ni guarda los datos de la tarjeta.'],
        ['Niños y niñas', 'XIU se dirige a personas adultas (familias y docentes). Los datos de los niños y niñas que añadas (solo el nombre de pila y la edad) se quedan en tu dispositivo. No los pedimos ni los usamos para nada más.'],
        ['Para qué', 'Para adaptar las propuestas a tu perfil, recordar tus favoritos y el progreso y, si te apuntas, enviarte novedades. No hacemos publicidad ni vendemos datos.'],
        ['Tus derechos', 'Puedes consultar, corregir o borrar tus datos en cualquier momento: en «Perfil» (o borrando los datos de la app) y escribiéndonos. También puedes reclamar ante la Agencia Española de Protección de Datos.'],
      ],
      condText: () => [
        ['Qué es XIU', `XIU · Aprender jugando es un servicio de ${titular()} con propuestas educativas para niños y niñas de 0 a 6 años, pensadas para hacerlas con un adulto.`],
        ['Uso del contenido', 'Puedes usar las propuestas e imprimir las fichas para uso personal y familiar, o con tu grupo en el aula. No puedes revenderlas, publicarlas ni distribuirlas. Ver «Derechos de autor».'],
        ['Seguridad', 'Las actividades deben hacerse siempre con la supervisión de una persona adulta. Lee las recomendaciones de seguridad de cada actividad y adáptalas a cada niño o niña.'],
        ['Premium', 'XIU se puede usar gratis con una parte del contenido. XIU Premium (suscripción mensual o anual, o paquetes) da acceso a todo. Las suscripciones se renuevan solas hasta que las canceles; si cancelas, conservas el acceso hasta el final del periodo pagado.'],
        ['Desistimiento', 'Si contratas Premium, tienes 14 días para desistir, salvo que ya hayas empezado a usar el contenido digital y lo hayas aceptado expresamente al comprar.'],
        ['Cambios', 'Podemos actualizar estas condiciones. Si el cambio es importante, te lo diremos en la app.'],
      ],
      cookText: () => [
        ['¿Usamos cookies?', 'XIU no usa cookies de publicidad ni de seguimiento. Solo guarda en tu navegador o dispositivo tus preferencias (idioma, perfil, favoritos, progreso...) para que la app funcione, y una copia del contenido para que funcione sin conexión.'],
        ['Cómo lo borro', 'Desde la configuración del navegador (borrando los datos de este sitio) o, en la app de Android, desde la información de la app → Almacenamiento → Borrar datos.'],
      ],
      contacteS: 'Escríbenos', contacteP: 'Dudas, problemas, sugerencias o propuestas para escuelas: te responderemos lo antes posible.',
      motiu: 'Motivo', motius: ['Tengo una duda', 'Algo no funciona', 'Una sugerencia', 'Soy de una escuela o centro', 'Premium y pagos'],
      missatge: 'Mensaje', envia: 'Enviar', errMissatge: 'Escribe el mensaje.',
      contacteMail: 'Se abrirá tu programa de correo con el mensaje preparado: solo tienes que enviarlo.', contacteAviat: 'Muy pronto podrás escribirnos desde aquí.',
    },
  });
  const pagina = (titol, seccions) => `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
    <section class="pageH"><h1>${t(titol)}</h1><div class="scr">XIU · ${t('legal')}</div></section>
    <div class="drets">${seccions.map(([h, p]) => `<h3>${esc(h)}</h3><p>${esc(p)}</p>`).join('')}<p class="nota" style="text-align:left">${t('revisaLegal')}</p></div>`;
  A.vista('privadesa', () => pagina('privadesa', t('privText')()));
  A.vista('condicions', () => pagina('condicions', t('condText')()));
  A.vista('cookies', () => pagina('cookies', t('cookText')()));
  A.vista('contacte', () => {
    const c = A.compte;
    return `<button class="back" data-enrere>${I.back}${t('tornar')}</button>
      <section class="pageH"><h1>${t('contacte')}</h1><div class="scr">${t('contacteS')}</div><p>${t('contacteP')}</p></section>
      ${correu() ? `<form data-form="contacte" class="formC" novalidate>
        <label>${t('nomC')}<input name="nom" value="${esc(c ? c.nom : '')}" autocomplete="name"></label>
        <label>${t('correu')}<input name="correu" type="email" value="${esc(c ? c.correu : '')}" autocomplete="email"></label>
        <label>${t('motiu')}<select name="motiu">${t('motius').map((m) => `<option>${esc(m)}</option>`).join('')}</select></label>
        <label>${t('missatge')}<textarea name="missatge" rows="6"></textarea></label>
        <div class="err"></div><button class="btn pri gran" type="submit">${t('envia')}</button><p class="segur">${t('contacteMail')}</p></form>`
        : `<div class="caixa"><p class="sub2">${t('contacteAviat')}</p></div>`}`;
  });
  A.HOOKS.quant.push(() => `<button data-go="#/contacte">${I.ajuda}<span>${t('contacte')}</span>${I.back}</button>
    <button data-go="#/privadesa">${I.cadenat}<span>${t('privadesa')}</span>${I.back}</button>
    <button data-go="#/condicions">${I.copyright}<span>${t('condicions')}</span>${I.back}</button>
    <button data-go="#/cookies">${I.info}<span>${t('cookies')}</span>${I.back}</button>`);
  document.addEventListener('submit', (e) => {
    const f = e.target; if (f.dataset.form !== 'contacte') return;
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f)), err = (k) => (f.querySelector('.err').textContent = k ? t(k) : '');
    if (!(v.nom || '').trim()) return err('errNom');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.correu || '')) return err('errCorreu');
    if (!(v.missatge || '').trim()) return err('errMissatge');
    err('');
    const cos = `${v.missatge.trim()}\n\n— ${v.nom.trim()} <${v.correu.trim()}>\n${A.perfil ? (A.perfil.tipus === 'pro' ? 'Docent' : 'Família') : ''} · XIU ${window.XIU_VERSIO || ''}`;
    location.href = `mailto:${encodeURIComponent(correu())}?subject=${encodeURIComponent('XIU · ' + v.motiu)}&body=${encodeURIComponent(cos)}`;
  });
});
