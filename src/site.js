// Statický generátor webu TJ Družstevník Rišňovce: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-17 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Prúd okolo dneška“: program a výsledky nie sú v dvoch stĺpcoch, ale v jednom časovom prúde – hore najbližšie
// zápasy, v strede značka „dnes“, pod ňou posledné výsledky. Vedľa prúdu tabuľka áčka, pod tým krátko o klube od roku
// 1923 (prvá kožená lopta). Krémový papier, tmavohnedá tlač, červená z erbu len ako akcent. Písmo Rokkitt a Petrona.
const SKIN = {
  nav: 'bar', theme: '#7a1d17', brand: 'TJ Družstevník Rišňovce', brandSub: 'futbal od roku 1930',
  fonts: ['rokkitt-700.woff', 'petrona-400.woff', 'petrona-600.woff'],
  sources: 'História futbalu v obci podľa webu obce Rišňovce.',
  adminHero: 'Futbal v Rišňovciach od roku 1930',
  adminFacts: club.kronika.zoznam.map((x) => ({ k: x.rok, t: x.text })),
  links: [[club.obecKlub, 'Klub na webe obce']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – futbal v Rišňovciach od roku ${club.zalozenie}. Zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže, víťaz VII. ligy ObFZ Nitra 2024/25.`;

add('', {
  title: `futbal od roku ${club.zalozenie}`, active: '', bodyClass: 'home',
  body: (R) => {
    const fut = homeUp(4).reverse();
    const past = homeRes(5);
    const wl = winterLine();
    return `<section class="intro"><div class="wrap intro-in">
  <img src="${R}img/erb-240.webp" alt="${esc(club.erbAlt)}" width="${Math.round(96 * CREST_R)}" height="96">
  <div>
    <h1 class="h1">TJ Družstevník Rišňovce</h1>
    <p class="intro-p">${esc(A.leagueName)}${A.pos ? `, ${A.pos}. miesto ${zo(A.of)}` : ''}. Víťaz VII. ligy ObFZ Nitra 2024/25, futbal v obci od roku ${club.zalozenie}.</p>
  </div>
</div></section>
<section class="sec sec--first"><div class="wrap flow">
  <div class="stream" aria-label="Zápasy okolo dneška">
    <h2 class="h2">Zápasy okolo dneška</h2>
    ${fut.length ? `<p class="stream-k">Najbližšie</p>${fxList(fut, R)}` : ''}
    <p class="today"><span>Dnes, ${dShort(TODAY)}</span>${wl ? ` ${wl}` : ''}</p>
    <p class="stream-k">Posledné výsledky</p>${fxList(past, R)}
    ${more(`${R}zapasy/`, 'Všetky zápasy')}
  </div>
  ${A.table ? `<aside class="flow-side" aria-labelledby="t-h"><h2 class="h3" id="t-h">${esc(A.leagueName)}</h2>${tableHtml(A.table, R)}${more(`${R}tabulky/`, 'Všetky tabuľky')}</aside>` : ''}
</div></section>
<section class="sec sec--paper" aria-labelledby="k-h"><div class="wrap club">
  <h2 class="h2" id="k-h">Prvá kožená lopta, 1923</h2>
  <p>${esc(club.kronika.zoznam[0].text)} ${esc(club.kronika.zoznam[1].text)}</p>
  ${more(`${R}klub/`, 'Kronika klubu')}
</div></section>`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: futbal od roku ${club.zalozenie}, prvá kožená lopta 1923, zápasy s Interom Bratislava, ročníky áčka, ihrisko a obec Rišňovce.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}, futbal v obci od roku ${club.zalozenie}. Klubové farby: ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap cols2">
  <div><h2 class="h2">Kronika</h2>${facts(club.kronika.zoznam.map((x) => ({ k: x.rok, t: x.text })))}</div>
  <div><h2 class="h2">Ročníky áčka</h2>${seasonsTable(club.rocniky.zoznam)}
    <h2 class="h2 h2--gap">Tradície</h2><p>${esc(club.tradicie.text)}</p>
    <h2 class="h2 h2--gap">Výbor</h2><p>Prezident ${esc(club.vybor.prezident)}. Členovia výboru: ${club.vybor.clenovia.map(esc).join(', ')}.</p></div>
</div></section>
<section class="sec sec--paper"><div class="wrap cols2">
  <div><h2 class="h2">${esc(ST.nazov)}</h2>${facts(ST.fakty)}</div>
  <div><h2 class="h2">Rišňovce</h2>${facts(club.obec.fakty)}<p class="note">Zdroje: web obce Rišňovce (TJ Družstevník, História, Symboly), Sportnet.</p></div>
</div></section>`,
});
