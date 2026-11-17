# TJ Družstevník Rišňovce – návrh webu

Návrh nového webu futbalového klubu TJ Družstevník Rišňovce. **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/tj-druzstevnik-risnovce/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/tj-druzstevnik-risnovce/admin/

## Vzhľad

**„Prúd okolo dneška“ (dizajn v2, 18. 11. 2026).** Krémový papier, tmavohnedá tlač, červená z erbu len ako akcent. Písmo Rokkitt (nadpisy) a Petrona (text).

- program a výsledky v jednom časovom prúde: hore najbližšie zápasy, v strede značka „Dnes“, pod ňou posledné výsledky; vedľa tabuľka áčka,
- krátko o prvej koženej lopte z roku 1923, celá kronika, ročníky, tradície, výbor, ihrisko a obec sú na stránke Klub,
- menu na telefóne je papierová plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 5 tímov (áčko, U13, U11, U9, U7) zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Ročníky áčka 2015/16 – 2025/26 z konečných tabuliek na Sportnete, tituly vo VII. lige ObFZ Nitra 2016/17 a 2024/25 (`data/klub.json`).
- História futbalu v obci (1923 prvá kožená lopta, od 1930 zápasy, exotická jedenástka 1963, Inter Bratislava 1969 a 1980, postupy, ihrisko), výbor klubu, obec (1272, Kutuzov, brakteáty, erb) podľa webu obce Rišňovce.
- E-mail zo Sportnetu. Vlastný web ani sociálne siete klubu sme nenašli (18. 11. 2026).
- Erb klubu a erby súperov zo Sportnetu (`scripts/logos.py`). Patria príslušným klubom.
- Písmo Rokkitt a Petrona, licencia SIL Open Font License 1.1 (`scripts/fonts.py`, rovné číslice sú zapečené do písma).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby a fontTools na písmo):

```
python C:\Users\lenic\kluby-siet\engine\assemble.py .   # zloží build.js a site.css zo spoločného jadra
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-18 prepíše dnešný dátum)
node scripts/serve.mjs dist 5452 # náhľad na http://127.0.0.1:5452/ (?nolr = bez obnovovania, s CSP)
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`). Ročníky v `data/klub.json` treba po sezóne doplniť ručne.
