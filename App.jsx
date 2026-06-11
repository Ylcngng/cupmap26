import { useState, useEffect } from "react";

const GROUPS = {
  A:['Mexico','South Korea','Czech Republic','South Africa'],
  B:['Canada','Qatar','Switzerland','Bosnia'],
  C:['Brazil','Scotland','Morocco','Haiti'],
  D:['USA','Australia','Turkey','Paraguay'],
  E:['Germany','Ivory Coast','Ecuador','Curacao'],
  F:['Netherlands','Japan','Sweden','Tunisia'],
  G:['Belgium','Iran','New Zealand','Egypt'],
  H:['Spain','Cape Verde','Saudi Arabia','Uruguay'],
  I:['France','Norway','Iraq','Senegal'],
  J:['Argentina','Algeria','Austria','Jordan'],
  K:['Portugal','DR Congo','Uzbekistan','Colombia'],
  L:['England','Croatia','Ghana','Panama'],
};

const TI = {
  'Mexico':{f:'🇲🇽',de:'Mexiko',tr:'Meksika',en:'Mexico'},
  'South Korea':{f:'🇰🇷',de:'Südkorea',tr:'Güney Kore',en:'South Korea'},
  'Czech Republic':{f:'🇨🇿',de:'Tschechien',tr:'Çekya',en:'Czech Republic'},
  'South Africa':{f:'🇿🇦',de:'Südafrika',tr:'Güney Afrika',en:'South Africa'},
  'Canada':{f:'🇨🇦',de:'Kanada',tr:'Kanada',en:'Canada'},
  'Qatar':{f:'🇶🇦',de:'Katar',tr:'Katar',en:'Qatar'},
  'Switzerland':{f:'🇨🇭',de:'Schweiz',tr:'İsviçre',en:'Switzerland'},
  'Bosnia':{f:'🇧🇦',de:'Bosnien',tr:'Bosna-Hersek',en:'Bosnia & Herz.'},
  'Brazil':{f:'🇧🇷',de:'Brasilien',tr:'Brezilya',en:'Brazil'},
  'Scotland':{f:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',de:'Schottland',tr:'İskoçya',en:'Scotland'},
  'Morocco':{f:'🇲🇦',de:'Marokko',tr:'Fas',en:'Morocco'},
  'Haiti':{f:'🇭🇹',de:'Haiti',tr:'Haiti',en:'Haiti'},
  'USA':{f:'🇺🇸',de:'USA',tr:'ABD',en:'USA'},
  'Australia':{f:'🇦🇺',de:'Australien',tr:'Avustralya',en:'Australia'},
  'Turkey':{f:'🇹🇷',de:'Türkei',tr:'Türkiye',en:'Türkiye'},
  'Paraguay':{f:'🇵🇾',de:'Paraguay',tr:'Paraguay',en:'Paraguay'},
  'Germany':{f:'🇩🇪',de:'Deutschland',tr:'Almanya',en:'Germany'},
  'Ivory Coast':{f:'🇨🇮',de:'Elfenbeinküste',tr:'Fildişi Sahili',en:'Ivory Coast'},
  'Ecuador':{f:'🇪🇨',de:'Ecuador',tr:'Ekvador',en:'Ecuador'},
  'Curacao':{f:'🇨🇼',de:'Curaçao',tr:'Curaçao',en:'Curaçao'},
  'Netherlands':{f:'🇳🇱',de:'Niederlande',tr:'Hollanda',en:'Netherlands'},
  'Japan':{f:'🇯🇵',de:'Japan',tr:'Japonya',en:'Japan'},
  'Sweden':{f:'🇸🇪',de:'Schweden',tr:'İsveç',en:'Sweden'},
  'Tunisia':{f:'🇹🇳',de:'Tunesien',tr:'Tunus',en:'Tunisia'},
  'Belgium':{f:'🇧🇪',de:'Belgien',tr:'Belçika',en:'Belgium'},
  'Iran':{f:'🇮🇷',de:'Iran',tr:'İran',en:'Iran'},
  'New Zealand':{f:'🇳🇿',de:'Neuseeland',tr:'Yeni Zelanda',en:'New Zealand'},
  'Egypt':{f:'🇪🇬',de:'Ägypten',tr:'Mısır',en:'Egypt'},
  'Spain':{f:'🇪🇸',de:'Spanien',tr:'İspanya',en:'Spain'},
  'Cape Verde':{f:'🇨🇻',de:'Kap Verde',tr:'Yeşil Burun',en:'Cape Verde'},
  'Saudi Arabia':{f:'🇸🇦',de:'Saudi-Arabien',tr:'Suudi Arabistan',en:'Saudi Arabia'},
  'Uruguay':{f:'🇺🇾',de:'Uruguay',tr:'Uruguay',en:'Uruguay'},
  'France':{f:'🇫🇷',de:'Frankreich',tr:'Fransa',en:'France'},
  'Norway':{f:'🇳🇴',de:'Norwegen',tr:'Norveç',en:'Norway'},
  'Iraq':{f:'🇮🇶',de:'Irak',tr:'Irak',en:'Iraq'},
  'Senegal':{f:'🇸🇳',de:'Senegal',tr:'Senegal',en:'Senegal'},
  'Argentina':{f:'🇦🇷',de:'Argentinien',tr:'Arjantin',en:'Argentina'},
  'Algeria':{f:'🇩🇿',de:'Algerien',tr:'Cezayir',en:'Algeria'},
  'Austria':{f:'🇦🇹',de:'Österreich',tr:'Avusturya',en:'Austria'},
  'Jordan':{f:'🇯🇴',de:'Jordanien',tr:'Ürdün',en:'Jordan'},
  'Portugal':{f:'🇵🇹',de:'Portugal',tr:'Portekiz',en:'Portugal'},
  'DR Congo':{f:'🇨🇩',de:'DR Kongo',tr:'Kongo DR',en:'DR Congo'},
  'Uzbekistan':{f:'🇺🇿',de:'Usbekistan',tr:'Özbekistan',en:'Uzbekistan'},
  'Colombia':{f:'🇨🇴',de:'Kolumbien',tr:'Kolombiya',en:'Colombia'},
  'England':{f:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',de:'England',tr:'İngiltere',en:'England'},
  'Croatia':{f:'🇭🇷',de:'Kroatien',tr:'Hırvatistan',en:'Croatia'},
  'Ghana':{f:'🇬🇭',de:'Ghana',tr:'Gana',en:'Ghana'},
  'Panama':{f:'🇵🇦',de:'Panama',tr:'Panama',en:'Panama'},
};

const M = {
  r1: {dt:'28.06 · 21:00',rnd:'r16',h:{t:'grp',g:'A',p:2},a:{t:'grp',g:'B',p:2}},
  r2: {dt:'29.06 · 19:00',rnd:'r16',h:{t:'grp',g:'C',p:1},a:{t:'grp',g:'F',p:2}},
  r3: {dt:'29.06 · 22:30',rnd:'r16',h:{t:'grp',g:'E',p:1},a:{t:'thd',e:['A','B','C','D','F']}},
  r4: {dt:'30.06 · 03:00',rnd:'r16',h:{t:'grp',g:'F',p:1},a:{t:'grp',g:'C',p:2}},
  r5: {dt:'30.06 · 19:00',rnd:'r16',h:{t:'grp',g:'E',p:2},a:{t:'grp',g:'I',p:2}},
  r6: {dt:'30.06 · 23:00',rnd:'r16',h:{t:'grp',g:'I',p:1},a:{t:'thd',e:['C','D','F','G','H']}},
  r7: {dt:'01.07 · 03:00',rnd:'r16',h:{t:'grp',g:'A',p:1},a:{t:'thd',e:['E','C','F','H','I']}},
  r8: {dt:'01.07 · 18:00',rnd:'r16',h:{t:'grp',g:'L',p:1},a:{t:'thd',e:['H','E','I','J','K']}},
  r9: {dt:'01.07 · 22:00',rnd:'r16',h:{t:'grp',g:'G',p:1},a:{t:'thd',e:['I','A','E','H','J']}},
  r10:{dt:'02.07 · 02:00',rnd:'r16',h:{t:'grp',g:'D',p:1},a:{t:'thd',e:['B','E','F','I','J']}},
  r11:{dt:'02.07 · 21:00',rnd:'r16',h:{t:'grp',g:'H',p:1},a:{t:'grp',g:'J',p:2}},
  r12:{dt:'03.07 · 01:00',rnd:'r16',h:{t:'grp',g:'K',p:2},a:{t:'grp',g:'L',p:2}},
  r13:{dt:'03.07 · 05:00',rnd:'r16',h:{t:'grp',g:'B',p:1},a:{t:'thd',e:['G','E','F','I','J']}},
  r14:{dt:'03.07 · 20:00',rnd:'r16',h:{t:'grp',g:'D',p:2},a:{t:'grp',g:'G',p:2}},
  r15:{dt:'04.07 · 00:00',rnd:'r16',h:{t:'grp',g:'J',p:1},a:{t:'grp',g:'H',p:2}},
  r16:{dt:'04.07 · 03:30',rnd:'r16',h:{t:'grp',g:'K',p:1},a:{t:'thd',e:['D','E','I','J','L']}},
  af1:{dt:'04.07 · 19:00',rnd:'r8',h:{t:'win',m:'r1'},a:{t:'win',m:'r4'}},
  af2:{dt:'04.07 · 23:00',rnd:'r8',h:{t:'win',m:'r3'},a:{t:'win',m:'r6'}},
  af3:{dt:'06.07 · 19:00',rnd:'r8',h:{t:'win',m:'r11'},a:{t:'win',m:'r12'}},
  af4:{dt:'07.07 · 02:00',rnd:'r8',h:{t:'win',m:'r9'},a:{t:'win',m:'r10'}},
  af5:{dt:'05.07 · 22:00',rnd:'r8',h:{t:'win',m:'r2'},a:{t:'win',m:'r5'}},
  af6:{dt:'06.07 · 02:00',rnd:'r8',h:{t:'win',m:'r7'},a:{t:'win',m:'r8'}},
  af7:{dt:'07.07 · 22:00',rnd:'r8',h:{t:'win',m:'r13'},a:{t:'win',m:'r16'}},
  af8:{dt:'07.07 · 18:00',rnd:'r8',h:{t:'win',m:'r14'},a:{t:'win',m:'r15'}},
  vf1:{dt:'09.07 · 22:00',rnd:'qf',h:{t:'win',m:'af1'},a:{t:'win',m:'af2'}},
  vf2:{dt:'10.07 · 21:00',rnd:'qf',h:{t:'win',m:'af3'},a:{t:'win',m:'af4'}},
  vf3:{dt:'11.07 · 23:00',rnd:'qf',h:{t:'win',m:'af5'},a:{t:'win',m:'af6'}},
  vf4:{dt:'12.07 · 02:00',rnd:'qf',h:{t:'win',m:'af7'},a:{t:'win',m:'af8'}},
  hf1:{dt:'14.07 · 21:00',rnd:'sf',h:{t:'win',m:'vf1'},a:{t:'win',m:'vf2'}},
  hf2:{dt:'15.07 · 21:00',rnd:'sf',h:{t:'win',m:'vf3'},a:{t:'win',m:'vf4'}},
  fin:{dt:'19.07 · 21:00',rnd:'fin',h:{t:'win',m:'hf1'},a:{t:'win',m:'hf2'}},
};

const RNDS = ['r16','r8','qf','sf','fin'];
const RND_IDS = {
  r16:['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15','r16'],
  r8: ['af1','af2','af3','af4','af5','af6','af7','af8'],
  qf: ['vf1','vf2','vf3','vf4'],
  sf: ['hf1','hf2'],
  fin:['fin'],
};

const RC = { r16:'#00A87A', r8:'#FF8C42', qf:'#8B5CF6', sf:'#E30A17', fin:'#D4AF37' };

const TX = {
  de:{
    title:'WM 2026', sub:'Konstellations-Tool',
    teamTab:'🌍 Dein Team', grpTab:'⚙ Gruppen', koTab:'⚡ KO-Phase',
    grp:'Gruppe', reset:'↺ Reset',
    r16:'Sechzehntelfinale', r8:'Achtelfinale', qf:'Viertelfinale', sf:'Halbfinale', fin:'Finale',
    p1:'1.', p2:'2.', p3:'3.', p4:'4.',
    hint:'Klicke ein Team um den Sieger zu wählen · ↑↓ zum Umsortieren',
    thd:'3. aus Gr.', thirdLabel:'Drittplatzierten wählen', champion:'🏆 Weltmeister!',
    eliminated:'Ausgeschieden –', groupOut:'Nicht qualifiziert',
    next:'Nächstes Spiel', qualified:'Qualifiziert!', saved:'Gespeichert ✓',
    grpHint:'Sortiere jede Gruppe nach deiner Prognose',
    selectTeam:'Wähle deine Nation', followingText:'Team auswählen',
    pathSuffix:'-Pfad', continueHint:'Weiter zu den Gruppen →',
    selectPlaceholder:'── Mannschaft auswählen ──',
    noTeam:'Wähle deine Mannschaft aus',
    footer:'FIFA World Cup™ ist ein eingetragenes Warenzeichen der FIFA. Dieses Tool ist ein inoffizielles Fan-Projekt und steht in keiner Verbindung zur FIFA oder ihren Lizenznehmern. Alle Angaben ohne Gewähr – Irrtümer und Änderungen vorbehalten. Keine Haftung für Entscheidungen auf Basis dieser Daten. Kein Sportwetten-Bezug. Gekennzeichnete Inhalte sind Werbung.',
    infoTitle:'Gruppen setzen – und sehen wer als nächstes wartet',
    infoSubline:'Der WM 2026 Konstellations-Builder – Erstelle deine eigene Prognose',
    infoDesc:'48 Teams. 12 Gruppen. Ein Turnierbaum. Du entscheidest.\n\nWähle deine Nation, ordne die Gruppen nach deiner Prognose und tippe dich durch alle Runden bis zum WM-Finale. Das Tool zeigt dir in Echtzeit, welchen Weg dein Team nehmen würde – vom Sechzehntelfinale bis zum Weltmeistertitel.\n\nAlle 48 Mannschaften wählbar. Vollständiger offizieller Spielplan. Prognosen werden automatisch gespeichert. Verfügbar auf Deutsch, Türkisch und Englisch.\n\n──────────────────\n\nWarum wählst du den Drittplatzierten selbst?\n\nBei der WM 2026 gibt es 12 Gruppen – also auch 12 Drittplatzierte. Aber nur die 8 besten kommen in die KO-Runde weiter. Welche das sind, steht erst nach der kompletten Gruppenphase fest: Punkte, Tordifferenz, erzielte Tore – alles zählt.\n\nDa das im Voraus niemand sicher weiß, kannst du in diesem Tool selbst entscheiden welchen Drittplatzierten du für realistisch hältst. Jeder der 8 Slots zeigt dir welche Gruppen grundsätzlich berechtigt sind – du wählst deinen Favoriten.',
    infoClose:'Schließen', adSpace:'Werbefläche', adInfoBtn:'Werbung schalten',
  },
  tr:{
    title:'DK 2026', sub:'Senaryo Aracı',
    teamTab:'🌍 Takımın', grpTab:'⚙ Gruplar', koTab:'⚡ Eleme',
    grp:'Grup', reset:'↺ Sıfırla',
    r16:'Son 32', r8:'Son 16', qf:'Çeyrek Final', sf:'Yarı Final', fin:'Final',
    p1:'1.', p2:'2.', p3:'3.', p4:'4.',
    hint:'Galip seçmek için takıma tıkla · ↑↓ sıralaması değiştir',
    thd:'3. Gr.', thirdLabel:'3. takımı seç', champion:'🏆 Dünya Şampiyonu!',
    eliminated:'Elendi –', groupOut:'Gruptan Çıkamadı',
    next:'Sıradaki Maç', qualified:'Elemeler için hazır!', saved:'Kaydedildi ✓',
    grpHint:'Her grubu tahminine göre sırala',
    selectTeam:'Takımını Seç', followingText:'Takımını Seç',
    pathSuffix:' Yolu', continueHint:'Gruplara devam et →',
    selectPlaceholder:'── Takımını seç ──',
    noTeam:'Takımını seçmek için tıkla',
    footer:'FIFA World Cup™, FIFA\'nın tescilli markasıdır. Bu araç, FIFA veya lisans sahipleriyle bağlantısı bulunmayan gayri resmi bir fan projesidir. Tüm bilgiler garantisiz sunulur – hata ve değişiklik hakkı saklıdır. Bu verilere dayanılarak alınan kararlar için sorumluluk kabul edilmez. Spor bahisleriyle ilişkisi yoktur. İşaretlenmiş içerikler reklamdır.',
    infoTitle:'Grupları belirle ve bir sonraki rakibimiz kim olacak gör',
    infoSubline:'2026 Dünya Kupası Senaryo Aracı – Kendi tahminini oluştur',
    infoDesc:'48 takım. 12 grup. Tek bir kupa. Karar senin.\n\nTakımını seç, grupları istediğin gibi sırala ve her turda galipleri belirleyerek finale kadar ilerle. Araç sana gerçek zamanlı olarak takımının turnuvadaki olası yolunu gösterir – Son 32\'den Dünya Şampiyonluğuna kadar.\n\nTüm 48 milli takım seçilebilir. Resmi 2026 FIFA Dünya Kupası programı. Tahminler otomatik kaydedilir. Türkçe, Almanca ve İngilizce seçeneği mevcut.\n\n──────────────────\n\nNeden üçüncü takımı kendin seçiyorsun?\n\n2026 Dünya Kupası\'nda 12 grup var – yani 12 potansiyel üçüncü. Ama bunların yalnızca en iyi 8\'i eleme turuna geçebilir. Hangileri olduğu grup aşaması bittikten sonra belli olur: puan, averaj, atılan goller – her şey hesaba katılır.\n\nBunu önceden kimse kesin bilemeyeceği için, bu araçta hangi üçüncü takımın ilerleyeceğini sen belirliyorsun. Her slot hangi grupların bu pozisyona aday olduğunu gösterir – sen favori takımını seçersin.',
    infoClose:'Kapat', adSpace:'Reklam Alanı', adInfoBtn:'Reklam ver',
  },
  en:{
    title:'WC 2026', sub:'Bracket Builder',
    teamTab:'🌍 Your Team', grpTab:'⚙ Groups', koTab:'⚡ Knockout',
    grp:'Group', reset:'↺ Reset',
    r16:'Round of 32', r8:'Round of 16', qf:'Quarterfinal', sf:'Semifinal', fin:'Final',
    p1:'1st', p2:'2nd', p3:'3rd', p4:'4th',
    hint:'Click a team to pick the winner · use ↑↓ to reorder',
    thd:'3rd from', thirdLabel:'Select 3rd place team', champion:'🏆 World Champion!',
    eliminated:'Eliminated –', groupOut:'Not qualified',
    next:'Next Match', qualified:'Qualified!', saved:'Saved ✓',
    grpHint:'Sort each group according to your prediction',
    selectTeam:'Choose Your Team', followingText:'Select Team',
    pathSuffix:"'s Path", continueHint:'Continue to Groups →',
    selectPlaceholder:'── Select your team ──',
    noTeam:'Select your team above',
    footer:'FIFA World Cup™ is a registered trademark of FIFA. This is an unofficial fan project with no affiliation to FIFA or its licensees. All information provided without guarantee – errors and changes excepted. No liability for decisions made based on this data. No connection to sports betting. Marked content is advertising.',
    infoTitle:'Set the groups – see who comes next',
    infoSubline:'The 2026 World Cup Bracket Builder – Build your own prediction',
    infoDesc:'48 teams. 12 groups. One trophy. You decide.\n\nChoose your nation, rank the groups your way and pick winners round by round all the way to the final. The tool shows you in real time exactly which path your team would take – from the Round of 32 to World Champion.\n\nAll 48 national teams available. Full official 2026 FIFA World Cup schedule. Predictions save automatically. Available in English, German and Turkish.\n\n──────────────────\n\nWhy do you choose the third-place team yourself?\n\nThe 2026 World Cup has 12 groups – meaning 12 potential third-place teams. But only the best 8 advance to the knockout stage. Which ones make it is determined only after the entire group stage is complete: points, goal difference, goals scored – everything counts.\n\nSince nobody can know this in advance, this tool lets you decide which third-place team you consider most likely to qualify. Each slot shows you which groups are eligible – you pick your favourite.',
    infoClose:'Close', adSpace:'Ad Space', adInfoBtn:'Advertise here',
  },
};

const DEF = {
  A:['Mexico','South Korea','Czech Republic','South Africa'],
  B:['Switzerland','Canada','Qatar','Bosnia'],
  C:['Brazil','Morocco','Scotland','Haiti'],
  D:['Turkey','USA','Australia','Paraguay'],
  E:['Germany','Ecuador','Ivory Coast','Curacao'],
  F:['Netherlands','Japan','Sweden','Tunisia'],
  G:['Belgium','Egypt','Iran','New Zealand'],
  H:['Spain','Uruguay','Saudi Arabia','Cape Verde'],
  I:['France','Norway','Senegal','Iraq'],
  J:['Argentina','Austria','Algeria','Jordan'],
  K:['Portugal','Colombia','DR Congo','Uzbekistan'],
  L:['England','Croatia','Ghana','Panama'],
};

// ══════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════

function tn(team, lang) { return team ? (TI[team]?.[lang] ?? team) : '?'; }
function tf(team) { return team ? (TI[team]?.f ?? '⚽') : '·'; }

// Uhrzeiten: Basis MESZ | TR +1h | EN -1h
function adjustTime(dt, lang) {
  if (lang === 'de') return dt;
  const [datePart, timePart] = dt.split(' · ');
  const [d, mo] = datePart.split('.').map(Number);
  const [h, min] = timePart.split(':').map(Number);
  const offset = lang === 'tr' ? 1 : -1;
  let nh = h + offset, nd = d, nm = mo;
  if (nh >= 24) {
    nh -= 24; nd++;
    const dim = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    if (nd > dim[nm]) { nd = 1; nm++; }
  } else if (nh < 0) {
    nh += 24; nd--;
    if (nd < 1) { nm--; const dim=[0,31,28,31,30,31,30,31,31,30,31,30,31]; nd = dim[nm]; }
  }
  return `${String(nd).padStart(2,'0')}.${String(nm).padStart(2,'0')} · ${String(nh).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
}

function resolve(slot, rnks, thirds, wins) {
  if (!slot) return null;
  if (slot.t === 'grp') return rnks[slot.g]?.[slot.p - 1] ?? null;
  if (slot.t === 'thd') {
    const key = slot.e.join('-');
    return thirds[key] || null; // nur explizite Auswahl, kein Auto-Default
  }
  if (slot.t === 'win') return wins[slot.m] ?? null;
  return null;
}

function getTeams(mid, rnks, thirds, wins) {
  const m = M[mid]; if (!m) return [null, null];
  return [resolve(m.h, rnks, thirds, wins), resolve(m.a, rnks, thirds, wins)];
}

function downstream(startMid) {
  const found = [], seen = new Set();
  function dfs(mid) {
    Object.entries(M).forEach(([k, m]) => {
      if (((m.h.t==='win'&&m.h.m===mid)||(m.a.t==='win'&&m.a.m===mid)) && !seen.has(k)) {
        seen.add(k); found.push(k); dfs(k);
      }
    });
  }
  dfs(startMid); return found;
}

// Dynamischer Turnierweg für jedes Team
function getTeamPath(team, rnks, thirds, wins) {
  let r16Mid = null;
  for (const mid of RND_IDS.r16) {
    const [h, a] = getTeams(mid, rnks, thirds, wins);
    if (h === team || a === team) { r16Mid = mid; break; }
  }
  if (!r16Mid) return [];

  const path = [{ mid: r16Mid, rnd: 'r16' }];
  const nextRnds = [
    { rnd:'r8',  ids: RND_IDS.r8  },
    { rnd:'qf',  ids: RND_IDS.qf  },
    { rnd:'sf',  ids: RND_IDS.sf  },
    { rnd:'fin', ids: RND_IDS.fin },
  ];
  let cur = r16Mid;
  for (const { rnd, ids } of nextRnds) {
    const next = ids.find(mid => {
      const m = M[mid];
      return (m.h.t==='win'&&m.h.m===cur) || (m.a.t==='win'&&m.a.m===cur);
    });
    if (!next) break;
    path.push({ mid: next, rnd });
    cur = next;
  }
  return path;
}

function computeStatus(team, rnks, thirds, wins) {
  const path = getTeamPath(team, rnks, thirds, wins);
  if (!path.length) return { status:'group_out', matchId:null, round:null };

  let status = 'qualified', matchId = null, round = null;
  for (const { mid, rnd } of path) {
    const [h, a] = getTeams(mid, rnks, thirds, wins);
    if (h !== team && a !== team) break;
    matchId = mid; round = rnd;
    const w = wins[mid];
    if (!w) { status = 'in_progress'; break; }
    if (w !== team) { status = 'eliminated'; break; }
    if (rnd === 'fin') status = 'champion';
  }
  return { status, matchId, round };
}

const GOLD = '#D4AF37';

// ══════════════════════════════════════════════════════
// GRUPPENCARD
// ══════════════════════════════════════════════════════

function GroupCard({ gid, ranking, onChange, lang, t, selectedTeam }) {
  const pc = ['#4ade80', '#60a5fa', 'rgba(255,255,255,0.22)', 'rgba(255,255,255,0.1)'];
  const swap = (i, j) => { const r = [...ranking]; [r[i], r[j]] = [r[j], r[i]]; onChange(gid, r); };
  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: 10, padding: '0.75rem 0.85rem',
      background: 'rgba(255,255,255,0.06)',
    }}>
      <div style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.2em',
        color:'rgba(255,255,255,0.35)', fontFamily:'Arial', marginBottom:'0.55rem' }}>
        {t.grp} {gid}
      </div>
      {ranking.map((team, idx) => {
        const isSel = team === selectedTeam;
        return (
          <div key={team} style={{
            display:'flex', alignItems:'center', gap:'0.5rem',
            padding:'0.6rem 0.3rem', minHeight:52,
            borderBottom: idx < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            background: isSel ? 'rgba(255,255,255,0.04)' : 'transparent',
            borderRadius: isSel ? 6 : 0,
          }}>
            <span style={{ fontSize:'0.7rem', fontWeight:700, width:22, color:pc[idx],
              fontFamily:'Arial', flexShrink:0, textAlign:'right' }}>
              {[t.p1, t.p2, t.p3, t.p4][idx]}
            </span>
            <span style={{ fontSize:'1.2rem', flexShrink:0, lineHeight:1 }}>{tf(team)}</span>
            <span style={{
              flex:1, fontSize:'0.84rem',
              color: isSel ? '#ffe066' : idx < 2 ? '#ddd' : 'rgba(255,255,255,0.28)',
              fontWeight: isSel ? 700 : 400,
              overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            }}>{tn(team, lang)}</span>
            <div style={{ display:'flex', gap:5, flexShrink:0 }}>
              {[0, 1].map(d => (
                <button key={d} onClick={() => swap(idx, idx + (d ? 1 : -1))}
                  disabled={d ? idx === 3 : idx === 0}
                  style={{
                    width:44, height:44, borderRadius:10, padding:0,
                    border: `1px solid ${(d ? idx===3 : idx===0) ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.2)'}`,
                    background: (d ? idx===3 : idx===0) ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.09)',
                    cursor: (d ? idx === 3 : idx === 0) ? 'default' : 'pointer',
                    color: (d ? idx === 3 : idx === 0) ? 'rgba(255,255,255,0.1)' : '#fff',
                    fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center',
                    touchAction:'manipulation',
                  }}>{d ? '▼' : '▲'}</button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Bezeichnungs-Label für nicht aufgelöste Slots (wie im Media Markt Spielplan)
function slotLabel(slot, t) {
  if (!slot) return '?';
  if (slot.t === 'grp') return `${slot.p}. ${t.grp} ${slot.g}`;
  if (slot.t === 'thd') return `3. ${slot.e.join('/')}`;
  if (slot.t === 'win') {
    const m = M[slot.m];
    if (!m) return '?';
    const getMain = s => {
      if (s.t === 'grp') return `${s.p}.${s.g}`;
      if (s.t === 'thd') return `3.`;
      if (s.t === 'win') {
        const mm = M[s.m];
        if (!mm) return 'W';
        if (mm.h.t === 'grp') return `${mm.h.p}.${mm.h.g}`;
        if (mm.h.t === 'win') {
          const mmm = M[mm.h.m];
          if (mmm?.h?.t === 'grp') return `${mmm.h.p}.${mmm.h.g}`;
          if (mmm?.h?.t === 'win') {
            const mmmm = M[mmm.h.m];
            if (mmmm?.h?.t === 'grp') return `${mmmm.h.p}.${mmmm.h.g}`;
          }
        }
        return 'W';
      }
      return 'W';
    };
    return `W ${getMain(m.h)}`;
  }
  return '?';
}

// ══════════════════════════════════════════════════════
// MATCHCARD
// ══════════════════════════════════════════════════════

function MatchCard({ mid, rnks, thirds, wins, onWin, onThird, lang, t, rndColor, selectedTeam }) {
  const m = M[mid];
  const [home, away] = getTeams(mid, rnks, thirds, wins);
  const winner = wins[mid];
  const canPick = !!(home && away);
  const hasST = home === selectedTeam || away === selectedTeam;
  const accent = rndColor || 'rgba(255,255,255,0.15)';
  const thdSlot = m.h.t === 'thd' ? m.h : m.a.t === 'thd' ? m.a : null;

  const click = team => {
    if (!canPick || !team) return;
    onWin(mid, winner === team ? null : team);
  };

  const Slot = ({ team, slot, side }) => {
    const isW = winner === team;
    const isL = !!(winner && winner !== team);
    const isSel = team === selectedTeam;

    // Kein Team bekannt → Bezeichnung anzeigen wie im Spielplan
    if (!team) {
      const label = slotLabel(slot, t);
      return (
        <div style={{
          flex:1, display:'flex', alignItems:'center',
          padding:'0.4rem 0.42rem', borderRadius:6,
          background:'rgba(255,255,255,0.02)',
          justifyContent: side === 'away' ? 'flex-end' : 'flex-start',
        }}>
          <span style={{
            fontSize:'0.62rem', color:'rgba(255,255,255,0.3)',
            fontFamily:'Arial', fontStyle:'italic',
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            maxWidth:105, textAlign: side === 'away' ? 'right' : 'left',
          }}>{label}</span>
        </div>
      );
    }

    return (
      <div onClick={() => click(team)} style={{
        flex:1, display:'flex', alignItems:'center', gap:'0.28rem',
        padding:'0.4rem 0.42rem', borderRadius:6,
        cursor: canPick ? 'pointer' : 'default',
        background: isW ? (isSel ? 'rgba(255,224,102,0.15)' : 'rgba(255,255,255,0.11)') : isL ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.03)',
        border: isW ? `1px solid ${isSel ? 'rgba(255,224,102,0.4)' : accent+'55'}` : '1px solid transparent',
        opacity: isL ? 0.36 : 1, transition: 'all 0.12s ease',
        justifyContent: side === 'away' ? 'flex-end' : 'flex-start',
      }}>
        {side === 'home' && <>
          <span style={{ fontSize:'0.95rem', flexShrink:0 }}>{tf(team)}</span>
          <span style={{ fontSize:'0.73rem', fontWeight: isSel || isW ? 700 : 400,
            color: isSel ? '#ffe066' : isW ? '#fff' : 'rgba(255,255,255,0.68)',
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:82 }}>
            {tn(team, lang)}
          </span>
        </>}
        {side === 'away' && <>
          <span style={{ fontSize:'0.73rem', fontWeight: isSel || isW ? 700 : 400,
            color: isSel ? '#ffe066' : isW ? '#fff' : 'rgba(255,255,255,0.68)',
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:82, textAlign:'right' }}>
            {tn(team, lang)}
          </span>
          <span style={{ fontSize:'0.95rem', flexShrink:0 }}>{tf(team)}</span>
        </>}
      </div>
    );
  };

  return (
    <div style={{
      border: `1px solid ${hasST ? 'rgba(255,224,102,0.35)' : 'rgba(255,255,255,0.16)'}`,
      borderLeft: `2px solid ${hasST ? '#ffe066' : accent}`,
      borderRadius: 8, padding: '0.48rem 0.5rem 0.4rem',
      background: hasST ? 'rgba(255,224,102,0.05)' : 'rgba(255,255,255,0.05)',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.26rem' }}>
        <span style={{ fontSize:'0.52rem', color:'rgba(255,255,255,0.25)', fontFamily:'Arial' }}>{adjustTime(m.dt, lang)}</span>
        {hasST && <span style={{ fontSize:'0.52rem', color:'#ffe066', fontWeight:700 }}>★</span>}
        {!hasST && canPick && !winner && <span style={{ fontSize:'0.5rem', color:`${accent}88`, fontFamily:'Arial' }}>▶</span>}
      </div>
      {thdSlot && (
        <div style={{ marginBottom:'0.4rem',
          background:'rgba(255,255,255,0.04)', borderRadius:6,
          padding:'0.35rem 0.45rem',
          border:'1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ fontSize:'0.55rem', color:'rgba(255,255,255,0.4)',
            fontFamily:'Arial', letterSpacing:'0.1em', marginBottom:'0.2rem' }}>
            🔀 {t.thirdLabel}
          </div>
          {(() => {
            const currentKey = thdSlot.e.join('-');
            const currentVal = thirds[currentKey] || '';
            const placeholder = `3. ${t.grp} ${thdSlot.e.join('/')}`;

            // Nur explizit gesetzte Slots zählen als "belegt"
            const usedByOthers = new Set(
              Object.entries(thirds)
                .filter(([k, v]) => k !== currentKey && v)
                .map(([, v]) => v)
            );

            const opts = thdSlot.e
              .map(g => {
                const tm = rnks[g]?.[2];
                const used = !!(tm && usedByOthers.has(tm));
                return { g, tm, used };
              })
              .filter(({ tm }) => tm);

            return (
              <select
                value={currentVal}
                onChange={e => onThird(currentKey, e.target.value || null)}
                style={{ width:'100%',
                  background:'rgba(8,0,15,0.9)', border:'1px solid rgba(255,255,255,0.2)',
                  borderRadius:5, color: currentVal ? '#fff' : 'rgba(255,255,255,0.45)',
                  fontSize:'0.75rem', fontWeight:600,
                  padding:'0.28rem 0.4rem', fontFamily:'Arial', cursor:'pointer' }}>
                <option value="" style={{ background:'#120008', color:'rgba(255,255,255,0.45)' }}>
                  {placeholder}
                </option>
                {opts.map(({ g, tm, used }) => (
                  <option key={g} value={tm} disabled={used}
                    style={{ background: used ? '#200010' : '#120008',
                             color: used ? 'rgba(255,255,255,0.3)' : '#fff' }}>
                    {used ? '⊘ ' : ''}{tf(tm)} {tn(tm, lang)} — {t.grp} {g}{used ? ' ✕' : ''}
                  </option>
                ))}
              </select>
            );
          })()}
        </div>
      )}
      <div style={{ display:'flex', alignItems:'center', gap:'0.22rem' }}>
        <Slot team={home} slot={m.h} side="home" />
        <span style={{ color:'rgba(255,255,255,0.18)', fontSize:'0.62rem', fontWeight:700, flexShrink:0 }}>vs</span>
        <Slot team={away} slot={m.a} side="away" />
      </div>
      {winner && (
        <div style={{ marginTop:'0.2rem', fontSize:'0.54rem', color:`${accent}bb`, fontFamily:'Arial', textAlign:'center' }}>
          ✓ {tf(winner)} {tn(winner, lang)}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang]           = useState('de');
  const [tab, setTab]             = useState('groups');
  const [rnks, setRnks]           = useState(() => Object.fromEntries(Object.entries(DEF).map(([g,ts])=>[g,[...ts]])));
  const [thirds, setThirds]       = useState({});
  const [wins, setWins]           = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [saved, setSaved]         = useState(false);
  const [showInfo, setShowInfo]   = useState(false);
  const [showAdInfo, setShowAdInfo] = useState(false);
  const t = TX[lang];

  useEffect(() => {
    (async () => {
      try {
        const saved = localStorage.getItem('wm26-v5');
        if (saved) {
          const p = JSON.parse(saved);
          if (p.rnks) setRnks(p.rnks);
          if (p.thirds) setThirds(p.thirds);
          if (p.wins) setWins(p.wins);
          if (p.lang) setLang(p.lang);
          if ('selectedTeam' in p) setSelectedTeam(p.selectedTeam ?? null);
          if (p.tab) setTab(p.tab);
        }
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    const id = setTimeout(async () => {
      try {
        localStorage.setItem('wm26-v5', JSON.stringify({ rnks, thirds, wins, lang, selectedTeam, tab }));
        setSaved(true); setTimeout(() => setSaved(false), 1600);
      } catch (e) {}
    }, 900);
    return () => clearTimeout(id);
  }, [rnks, thirds, wins, lang, selectedTeam, tab]);

  const updRnk = (g, r) => { setRnks(p => ({...p,[g]:r})); };

  const pickWin = (mid, team) => setWins(p => {
    const u = {...p};
    if (team === null) delete u[mid]; else u[mid] = team;
    downstream(mid).forEach(d => delete u[d]);
    return u;
  });

  const pickThird = (key, team) => {
    setThirds(p => {
      const u = { ...p };
      if (!team) {
        delete u[key]; // Placeholder gewählt → Slot leeren
      } else {
        for (const [k, v] of Object.entries(u)) {
          if (k !== key && v === team) delete u[k];
        }
        u[key] = team;
      }
      return u;
    });
  };

  // Smarte Invalidierung: nur Picks löschen wo das eingetippte Team nicht mehr im Spiel steht
  useEffect(() => {
    setWins(prevWins => {
      const u = { ...prevWins };
      let changed = true;
      while (changed) {
        changed = false;
        for (const mid of Object.keys(u)) {
          const winner = u[mid];
          if (!winner) continue;
          const [h, a] = getTeams(mid, rnks, thirds, u);
          if (winner !== h && winner !== a) {
            delete u[mid];
            changed = true;
          }
        }
      }
      return JSON.stringify(u) === JSON.stringify(prevWins) ? prevWins : u;
    });
  }, [rnks, thirds]);

  // Hintergrund-Scroll sperren wenn Modal offen
  useEffect(() => {
    if (showInfo || showAdInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showInfo, showAdInfo]);

  const reset = () => {
    setRnks(Object.fromEntries(Object.entries(DEF).map(([g,ts])=>[g,[...ts]])));
    setThirds({}); setWins({});
  };

  // Status des ausgewählten Teams
  const { status: stStatus, matchId: stMid, round: stRound } = computeStatus(selectedTeam, rnks, thirds, wins);
  const rl = { r16:t.r16, r8:t.r8, qf:t.qf, sf:t.sf, fin:t.fin };

  const bannerBg = stStatus==='champion'
    ? 'linear-gradient(135deg,rgba(212,175,55,0.2),rgba(139,92,246,0.15))'
    : stStatus==='eliminated' ? 'rgba(255,255,255,0.02)'
    : 'rgba(255,255,255,0.04)';
  const bannerBrd = stStatus==='champion' ? 'rgba(212,175,55,0.45)'
    : stStatus==='eliminated' ? 'rgba(255,255,255,0.08)'
    : 'rgba(255,255,255,0.12)';

  const TABS = [
    ['groups', t.grpTab],
    ['bracket', t.koTab],
  ];

  return (
    <div style={{ minHeight:'100vh',
      background:'linear-gradient(160deg,#111020 0%,#17132e 45%,#0e0b1e 100%)',
      color:'#f0f0f0', fontFamily:'Georgia,serif', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing:border-box }
        button:hover:not(:disabled) { filter:brightness(1.2) }
        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-thumb { background:rgba(139,92,246,0.4);border-radius:2px }
        select { appearance:none;-webkit-appearance:none }
        select option { background:#120008!important;color:#fff }
      `}</style>

      <div style={{ position:'fixed',top:'-18%',right:'-12%',width:480,height:480,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 65%)',pointerEvents:'none' }}/>
      <div style={{ position:'fixed',top:'-12%',left:'-10%',width:400,height:400,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(0,168,122,0.14) 0%,transparent 65%)',pointerEvents:'none' }}/>
      <div style={{ position:'fixed',bottom:'-18%',right:'8%',width:420,height:420,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(255,140,66,0.12) 0%,transparent 65%)',pointerEvents:'none' }}/>
      <div style={{ position:'fixed',bottom:'-15%',left:'-10%',width:380,height:380,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(227,10,23,0.12) 0%,transparent 65%)',pointerEvents:'none' }}/>

      {/* ── INFO-MODAL ── */}
      {showInfo && (
        <div onClick={() => setShowInfo(false)} style={{
          position:'fixed', inset:0, zIndex:1000,
          background:'rgba(0,0,0,0.75)', backdropFilter:'blur(6px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          padding:'1rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            maxWidth:480, width:'100%',
            background:'linear-gradient(160deg,#0f0818,#100a1a)',
            border:'1px solid rgba(255,255,255,0.12)', borderRadius:14,
            position:'relative', display:'flex', flexDirection:'column',
            maxHeight:'85vh', overflow:'hidden',
          }}>
            {/* Deko-Linie oben */}
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:2,
              background:'linear-gradient(90deg,transparent,rgba(139,92,246,0.6),transparent)',
              borderRadius:1, zIndex:1 }}/>

            {/* FIXER HEADER */}
            <div style={{ padding:'1.6rem 1.5rem 1rem', flexShrink:0 }}>
              {/* Logo-Mini */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.1rem' }}>
                <div style={{ background:'#fff', borderRadius:6, padding:'0.15rem 0.38rem',
                  display:'flex', alignItems:'center', gap:'0.04rem', lineHeight:1 }}>
                  <span style={{ fontFamily:"'Bebas Neue',Impact,sans-serif", fontSize:'1.1rem', color:'#111' }}>2</span>
                  <span style={{ fontSize:'0.8rem' }}>🏆</span>
                  <span style={{ fontFamily:"'Bebas Neue',Impact,sans-serif", fontSize:'1.1rem', color:'#111' }}>6</span>
                </div>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif", fontSize:'0.75rem',
                    letterSpacing:'0.15em',
                    background:'linear-gradient(90deg,#FF8C42,#E30A17 40%,#8B5CF6)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                    FIFA WORLD CUP
                  </div>
                </div>
              </div>
              <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif", fontSize:'1.55rem',
                letterSpacing:'0.04em', color:'#fff', lineHeight:1.1, marginBottom:'0.3rem' }}>
                {t.infoTitle}
              </div>
              <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', fontFamily:'Arial',
                lineHeight:1.4 }}>
                {t.infoSubline}
              </div>
            </div>

            {/* SCROLLBARER INHALT */}
            <div style={{
              flex:1, minHeight:0, overflowY:'auto',
              padding:'0 1.5rem',
              borderTop:'1px solid rgba(255,255,255,0.07)',
              borderBottom:'1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.72)', fontFamily:'Arial',
                lineHeight:1.7, whiteSpace:'pre-line', padding:'1rem 0' }}>
                {t.infoDesc}
              </div>
            </div>

            {/* FIXER FOOTER – Schließen immer sichtbar */}
            <div style={{ padding:'1rem 1.5rem', flexShrink:0 }}>
              <button onClick={() => setShowInfo(false)} style={{
                width:'100%', padding:'0.55rem',
                borderRadius:8, fontFamily:'Arial', fontWeight:700,
                fontSize:'0.78rem', cursor:'pointer',
                background:'linear-gradient(90deg,rgba(255,140,66,0.6),rgba(139,92,246,0.6))',
                border:'1px solid rgba(255,255,255,0.15)', color:'#fff',
              }}>{t.infoClose}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── WERBE-INFO-MODAL ── */}
      {showAdInfo && (
        <div onClick={() => setShowAdInfo(false)} style={{
          position:'fixed', inset:0, zIndex:1000,
          background:'rgba(0,0,0,0.75)', backdropFilter:'blur(6px)',
          display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            maxWidth:460, width:'100%',
            background:'linear-gradient(160deg,#0f0818,#100a1a)',
            border:'1px solid rgba(255,255,255,0.12)', borderRadius:14,
            display:'flex', flexDirection:'column', maxHeight:'80vh',
            position:'relative',
          }}>
            <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:2,
              background:'linear-gradient(90deg,transparent,rgba(255,140,66,0.7),transparent)',
              borderRadius:1 }}/>

            {/* Header */}
            <div style={{ padding:'1.4rem 1.5rem 0.8rem', flexShrink:0 }}>
              <div style={{ fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.2em',
                color:'rgba(255,140,66,0.8)', fontFamily:'Arial', marginBottom:'0.4rem' }}>
                {t.adSpace}
              </div>
              <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif", fontSize:'1.45rem',
                letterSpacing:'0.04em', color:'#fff', lineHeight:1.1 }}>
                {/* TITEL – hier eintragen */}
                Werbung schalten auf WC2026
              </div>
            </div>

            {/* Scrollbarer Inhalt – HIER SPÄTER BEFÜLLEN */}
            <div style={{ overflowY:'auto', flex:1, padding:'0 1.5rem',
              borderTop:'1px solid rgba(255,255,255,0.07)',
              borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ padding:'1rem 0', fontSize:'0.82rem',
                color:'rgba(255,255,255,0.6)', fontFamily:'Arial', lineHeight:1.8 }}>

                {/* PLATZHALTER – wird später ersetzt */}
                <div style={{ textAlign:'center', padding:'2rem 0',
                  color:'rgba(255,255,255,0.2)', fontStyle:'italic', fontSize:'0.75rem' }}>
                  Kontaktdaten · Preise · Informationen<br/>
                  werden hier eingetragen
                </div>

              </div>
            </div>

            {/* Footer */}
            <div style={{ padding:'1rem 1.5rem', flexShrink:0 }}>
              <button onClick={() => setShowAdInfo(false)} style={{
                width:'100%', padding:'0.55rem', borderRadius:8, fontFamily:'Arial',
                fontWeight:700, fontSize:'0.78rem', cursor:'pointer',
                background:'linear-gradient(90deg,rgba(255,140,66,0.6),rgba(255,80,30,0.6))',
                border:'1px solid rgba(255,255,255,0.15)', color:'#fff',
              }}>{t.infoClose}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth:920, margin:'0 auto', padding:'0.9rem 0.75rem', position:'relative' }}>

        {/* ── HEADER ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
          marginBottom:'1rem', paddingBottom:'0.85rem', borderBottom:'1px solid rgba(255,255,255,0.18)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{
              width:52, height:52, flexShrink:0, display:'flex',
              alignItems:'center', justifyContent:'center',
              fontSize: selectedTeam ? '2.8rem' : '2rem',
              lineHeight:1, borderRadius:12,
              background: selectedTeam ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
              border: selectedTeam ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.06)',
              filter: selectedTeam ? 'none' : 'grayscale(1) opacity(0.25)',
            }}>
              {selectedTeam ? tf(selectedTeam) : '🏳️'}
            </div>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif",
                letterSpacing:'0.18em', lineHeight:1,
                background:'linear-gradient(90deg,#FF8C42,#E30A17 40%,#8B5CF6)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'flex', alignItems:'baseline', gap:'0.3rem' }}>
                <span style={{ fontSize:'0.95rem' }}>FIFA WORLD CUP</span>
                <span style={{ fontSize:'1.3rem', letterSpacing:'0.02em' }}>26</span>
              </div>
              <div style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.3)', fontFamily:'Arial',
                letterSpacing:'0.12em', marginTop:2 }}>{t.sub}</div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'0.28rem' }}>
            <div style={{ display:'flex', gap:'0.22rem' }}>
              {['de','tr','en'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding:'0.2rem 0.44rem', borderRadius:4, fontFamily:'Arial',
                  fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em',
                  background: lang===l ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${lang===l ? 'rgba(139,92,246,0.9)' : 'rgba(255,255,255,0.12)'}`,
                  color: lang===l ? '#fff' : 'rgba(255,255,255,0.5)', cursor:'pointer',
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
            <div style={{ display:'flex', gap:'0.22rem', alignItems:'center' }}>
              {saved && <span style={{ fontSize:'0.58rem', color:'rgba(74,222,128,0.7)', fontFamily:'Arial' }}>{t.saved}</span>}
              <button onClick={() => setShowInfo(true)} style={{ padding:'0.2rem 0.52rem', borderRadius:4, fontFamily:'Arial',
                fontSize:'0.6rem', color:'rgba(255,255,255,0.55)', background:'rgba(255,255,255,0.06)',
                border:'1px solid rgba(255,255,255,0.14)', cursor:'pointer', fontWeight:700 }}>ℹ</button>
              <button onClick={reset} style={{ padding:'0.2rem 0.55rem', borderRadius:4, fontFamily:'Arial',
                fontSize:'0.6rem', color:'rgba(255,255,255,0.35)', background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.08)', cursor:'pointer' }}>{t.reset}</button>
            </div>
          </div>
        </div>

        {/* ── WERBEFLÄCHE ── */}
        {/* PARTNER WECHSELN: href = Partner-URL, src = Logo-URL vom Partner */}
        <div style={{ marginBottom:'0.3rem' }}>
          <span style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.18em',
            color:'rgba(255,255,255,0.25)', fontFamily:'Arial', textTransform:'uppercase' }}>
            {t.adSpace}
          </span>
        </div>
        <a href="https://www.mercedes-benz.de" target="_blank" rel="noopener noreferrer"
          style={{ display:'block', width:'100%', marginBottom:'0.75rem', textDecoration:'none' }}>
          <div style={{
            width:'100%', height:72, borderRadius:10,
            background:'#fff',
            border:'1px solid rgba(255,255,255,0.15)',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:'0 1rem', cursor:'pointer', overflow:'hidden', position:'relative',
            transition:'opacity 0.18s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}
          >
            <img
              src="data:image/png;base64,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"
              alt="Mercedes-Benz"
              style={{ height:52, width:'auto', objectFit:'contain' }}
            />
          </div>
        </a>

        {/* ── TEAM-DROPDOWN ── */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.55rem', marginBottom:'0.6rem' }}>
          <span style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.35)', fontFamily:'Arial',
            letterSpacing:'0.1em', whiteSpace:'nowrap', flexShrink:0 }}>
            {t.followingText}:
          </span>
          <div style={{ position:'relative', flex:1, maxWidth:280 }}>
            <span style={{ position:'absolute', left:'0.55rem', top:'50%', transform:'translateY(-50%)',
              fontSize:'1rem', pointerEvents:'none', zIndex:1,
              filter: selectedTeam ? 'none' : 'grayscale(1) opacity(0.3)' }}>
              {selectedTeam ? tf(selectedTeam) : '🏳️'}
            </span>
            <select
              value={selectedTeam || ''}
              onChange={e => setSelectedTeam(e.target.value || null)}
              style={{ width:'100%', background:'rgba(255,255,255,0.07)',
                border:'1px solid rgba(255,255,255,0.18)', borderRadius:8,
                color: selectedTeam ? '#fff' : 'rgba(255,255,255,0.45)',
                fontSize:'0.78rem', fontWeight:600, fontFamily:'Arial',
                padding:'0.36rem 0.5rem 0.36rem 2.1rem', cursor:'pointer',
              }}>
              <option value="" style={{ background:'#1a0008', color:'rgba(255,255,255,0.5)' }}>
                {t.selectPlaceholder}
              </option>
              {Object.entries(GROUPS).map(([gid, teams]) => (
                <optgroup key={gid} label={`${t.grp} ${gid}`} style={{ background:'#1a0008' }}>
                  {teams.map(team => (
                    <option key={team} value={team} style={{ background:'#1a0008' }}>
                      {tn(team, lang)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* ── STATUS-BANNER ── */}
        <div style={{ background:bannerBg, border:`1px solid ${bannerBrd}`, borderRadius:10,
          padding:'0.65rem 1rem', marginBottom:'0.9rem',
          display:'flex', justifyContent:'space-between', alignItems:'center', minHeight:62 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'0.58rem', color:'rgba(255,255,255,0.3)', fontFamily:'Arial',
              letterSpacing:'0.14em', marginBottom:'0.1rem' }}>
              {selectedTeam
                ? `${t.followingText}: ${tf(selectedTeam)} ${tn(selectedTeam, lang)}${t.pathSuffix}`
                : t.followingText}
            </div>
            <div style={{ fontFamily:"'Bebas Neue',Impact,sans-serif", fontSize:'1.1rem', letterSpacing:'0.04em' }}>
              {!selectedTeam && (
                <span style={{ color:'rgba(255,255,255,0.35)', fontSize:'0.85rem', fontFamily:'Arial', fontWeight:400 }}>
                  {t.noTeam}
                </span>
              )}
              {selectedTeam && stStatus==='champion' && <span style={{ color:GOLD }}>{t.champion}</span>}
              {selectedTeam && stStatus==='eliminated' && <span style={{ color:'rgba(255,255,255,0.4)' }}>{t.eliminated} {rl[stRound]}</span>}
              {selectedTeam && stStatus==='group_out' && <span style={{ color:'rgba(255,255,255,0.32)' }}>{t.groupOut}</span>}
              {selectedTeam && (stStatus==='in_progress'||stStatus==='qualified') && stMid && (() => {
                const [h,a] = getTeams(stMid, rnks, thirds, wins);
                return <span style={{ color:'#fff' }}>
                  {rl[stRound]} · {t.next}:{' '}
                  <span style={{ color:'#ffe066' }}>{tf(h)} {tn(h,lang)}</span>
                  <span style={{ color:'rgba(255,255,255,0.28)' }}> vs </span>
                  <span>{tf(a)} {tn(a,lang)}</span>
                </span>;
              })()}
              {selectedTeam && stStatus==='qualified' && !stMid && <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.85rem', fontFamily:'Arial' }}>{t.qualified}</span>}
            </div>
            {stStatus==='in_progress' && stMid && <div style={{ fontSize:'0.57rem', color:'rgba(255,255,255,0.2)', fontFamily:'Arial', marginTop:2 }}>{adjustTime(M[stMid]?.dt ?? '', lang)}</div>}
          </div>
          <div style={{ fontSize: stStatus==='champion'?'2.2rem': selectedTeam?'1.9rem':'1.6rem', marginLeft:'0.5rem',
            filter: stStatus==='champion'?`drop-shadow(0 0 10px ${GOLD})`: selectedTeam?'none':'grayscale(1) opacity(0.2)' }}>
            {!selectedTeam ? '🏳️' : stStatus==='champion'?'🏆':stStatus==='eliminated'?'💔':stStatus==='group_out'?'❌':tf(selectedTeam)}
          </div>
        </div>

        {/* ── TABS (3 Stück) ── */}
        <div style={{ display:'flex', gap:'0.38rem', marginBottom:'1rem' }}>
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex:1, padding:'0.5rem 0.25rem', borderRadius:8, fontFamily:'Arial', fontWeight:700,
              fontSize:'0.72rem', letterSpacing:'0.03em', cursor:'pointer',
              background: tab===id ? 'linear-gradient(90deg,rgba(255,140,66,0.7),rgba(139,92,246,0.7))' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${tab===id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.18)'}`,
              color: tab===id ? '#fff' : 'rgba(255,255,255,0.42)',
            }}>{label}</button>
          ))}
        </div>

        {/* ── GRUPPEN ── */}
        {tab==='groups' && (
          <div>
            <div style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.25)', fontFamily:'Arial',
              textAlign:'center', marginBottom:'0.8rem', letterSpacing:'0.07em' }}>{t.grpHint}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'0.55rem' }}>
              {Object.keys(GROUPS).map(g => (
                <GroupCard key={g} gid={g} ranking={rnks[g]} onChange={updRnk}
                  lang={lang} t={t} selectedTeam={selectedTeam} />
              ))}
            </div>
          </div>
        )}

        {/* ── KO-PHASE ── */}
        {tab==='bracket' && (
          <div>
            <div style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.28)', fontFamily:'Arial',
              textAlign:'center', marginBottom:'0.8rem', letterSpacing:'0.06em' }}>{t.hint}</div>
            {RNDS.map(rnd => {
              const color = RC[rnd];
              return (
                <div key={rnd} style={{ marginBottom:'1.35rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.45rem', marginBottom:'0.45rem' }}>
                    <div style={{ flex:1, height:'1px', background:`${color}55` }}/>
                    <span style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.22em',
                      color:color, fontFamily:'Arial', whiteSpace:'nowrap' }}>{rl[rnd]}</span>
                    <div style={{ flex:1, height:'1px', background:`${color}55` }}/>
                  </div>
                  {rnd==='fin' ? (
                    <div style={{ maxWidth:360, margin:'0 auto' }}>
                      <MatchCard mid="fin" rnks={rnks} thirds={thirds} wins={wins}
                        onWin={pickWin} onThird={pickThird} lang={lang} t={t}
                        rndColor={color} selectedTeam={selectedTeam} />
                      {wins['fin'] && (
                        <div style={{ textAlign:'center', marginTop:'0.6rem',
                          fontFamily:"'Bebas Neue',Impact,sans-serif", fontSize:'1.4rem',
                          color:GOLD, filter:`drop-shadow(0 0 8px ${GOLD})` }}>
                          🏆 {tf(wins['fin'])} {tn(wins['fin'],lang)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(186px,1fr))', gap:'0.4rem' }}>
                      {RND_IDS[rnd].map(mid => (
                        <MatchCard key={mid} mid={mid} rnks={rnks} thirds={thirds} wins={wins}
                          onWin={pickWin} onThird={pickThird} lang={lang} t={t}
                          rndColor={color} selectedTeam={selectedTeam} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop:'1.5rem', textAlign:'center',
          borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'0.8rem' }}>
          <div style={{ fontSize:'0.58rem', color:'rgba(255,255,255,0.18)',
            fontFamily:'Arial', lineHeight:1.7, maxWidth:680, margin:'0 auto' }}>
            {t.footer}
          </div>
        </div>
      </div>
    </div>
  );
}
