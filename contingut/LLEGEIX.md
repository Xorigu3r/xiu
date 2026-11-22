# Contingut de XIU

Cada recurs és un fitxer `recursos/<id>.json`. L'`id` (minúscules, xifres i guions) ha de coincidir amb el nom del fitxer.
Després de tocar res, executa `npm run contingut`: comprova que no falti res i genera `www/js/contingut.js`.

## Camps comuns

| Camp | Valors |
|---|---|
| `id` | `panera`, `vocal-a`... |
| `tipus` | `"activitat"` (fitxa pedagògica explicada) o `"fitxa"` (full imprimible) |
| `edat` | `"0-1"`, `"1-2"`, `"2-3"`, `"3-4"`, `"4-5"`, `"5-6"` |
| `area` | `exp`, `llen`, `mot`, `log`, `cre`, `aut` (vegeu `biblioteca.json`) |
| `perfil` | `["fam"]`, `["pro"]` o `["fam","pro"]` |
| `durada` | `"15 min"` o `{"ca":"Cada dia","es":"Cada día"}` |
| `titol`, `subtitol` | `{"ca":"...","es":"..."}` |
| `novetat`, `destacat` | `true` (opcional) |
| `foto` | `"img/recursos/panera.webp"` (opcional; el fitxer va a `www/img/recursos/`) |

Tots els textos van en català (`ca`) i castellà (`es`).

## Activitat (`"tipus": "activitat"`)

`intencio`, `preparacio`: text. `treballa`, `materials`, `desenvolupament`, `variants`, `seguretat`: llistes, amb el mateix
nombre d'elements en els dos idiomes: `{"ca":["...","..."],"es":["...","..."]}`.

## Fitxa (`"tipus": "fitxa"`): digital i imprimible

La mateixa definició serveix per fer-la al mòbil amb el dit i per descarregar-la en PDF (A4, amb l'estil de les fitxes).
`full.exercicis`: d'1 a 4 exercicis, cadascun amb `tipus` i `text` (l'enunciat, en `ca` i `es`):

- `{"tipus":"ressegueix","caracters":"AAAAAA"}`: resseguir amb el dit (vocals A E I O U i xifres 0-9 tenen el traç dibuixat; la resta, el contorn amb punts).
- `{"tipus":"dibuixa"}`: requadre per dibuixar o escriure (al mòbil, amb colors).
- `{"tipus":"encercla","objectiu":"A","elements":["O","E","A",...]}`: tocar/encerclar l'objectiu entre els altres (4 a 16 elements).
- `{"tipus":"compta","grups":[{"element":"flor","n":4,"opcions":[2,4,6]}, ...]}`: comptar i encerclar el nombre (1 a 4 grups).
  Elements: estrella, flor, bola, castanya, fulla, pedra, poma.
- `{"tipus":"serie","files":["fpfpf?","ffpff?"]}`: completar la sèrie (f fulla, p pedra, e estrella, b bola, c castanya, l flor, m poma; acaba en `?`).

## Inici i Inspiració

A `biblioteca.json`: la proposta de la setmana (`temporada`), les col·leccions, «Potser no coneixes...» (`descobreix`) i la cita.
