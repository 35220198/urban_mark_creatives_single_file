/* Urban Mark Creatives: High-Definition Vector Mockup Engine */
(() => {
  const N = '#0a1d44', O = '#e8661a', T = '#1fb5b0';
  let U = 0, D = '';

  const G = (a, b, v) => {
    const i = 'g' + (U++);
    D += `<linearGradient id="${i}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
    return `url(#${i})`;
  };

  const svg = f => {
    D = '';
    const b = f();
    return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><filter id="ds" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="12" flood-opacity=".45"/></filter><filter id="ds2" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity=".3"/></filter>${D}<filter id="gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feColorMatrix type="saturate" values="0"/></filter><linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient><radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".42"/></radialGradient></defs>${b}<rect width="400" height="300" filter="url(#gr)" opacity=".16" style="mix-blend-mode:overlay"/><rect width="400" height="300" fill="url(#sh)"/><rect width="400" height="300" fill="url(#vg)"/></svg>`;
  };

  const studio = (a = '#f6f7fa', b = '#d2d7df') => `<rect width="400" height="300" fill="${G(a, b, 1)}"/><ellipse cx="200" cy="268" rx="150" ry="13" fill="#000" opacity=".13"/>`;
  const ln = (x, y, w, n, gap = 9, c = '#cbd5e1', h = 4) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * gap}" width="${i === n - 1 ? w * .6 : w}" height="${h}" rx="2" fill="${c}"/>`).join('');
  const person = (cx, cy, s, c) => `<circle cx="${cx}" cy="${cy}" r="${10 * s}" fill="${c}"/><path d="M${cx - 18 * s} ${cy + 34 * s}q0 ${-22 * s} ${18 * s} ${-22 * s}t${18 * s} ${22 * s}z" fill="${c}"/>`;
  const mark = (cx, cy, s, c) => `<path d="M${cx - 10 * s} ${cy + 8 * s}v${-16 * s}l${10 * s} ${11 * s} ${10 * s} ${-11 * s}v${16 * s}" stroke="${c}" stroke-width="${3 * s}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
  const T2 = (x, y, t, fs, f, w = 800, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${fs}" font-weight="${w}" fill="${f}" ${extra}>${t}</text>`;
  const wm = (t, sub, y, f, sc, fs = 30, font = 'Arial,Helvetica,sans-serif') => `<text x="200" y="${y}" text-anchor="middle" font-family="${font}" font-weight="900" font-size="${fs}" fill="${f}" letter-spacing="1">${t}</text><text x="200" y="${y + 24}" text-anchor="middle" font-size="11" font-weight="700" fill="${sc}" letter-spacing="3">${sub}</text>`;
  const full = c => `<rect width="400" height="300" fill="${c}"/>`;

  /* ---------- CORPORATE & GLOBAL LOGOS (Upgraded from Urban Mark Creatives to Global Brands) ---------- */
  const LOGOS = [
    () => {
      const o = G('#ffb36b', O), b = G('#4cb3ff', '#1d5fb8', 1);
      return full('#14181d') + [...Array(30)].map((_, k) => `<path d="M${k * 14} 0l-60 300" stroke="#fff" opacity=".03"/>`).join('') + `<path d="M120 170V152Q124 134 150 130L172 100Q178 92 190 92H236Q248 92 256 100L278 130Q300 134 304 152V170Z" fill="${b}"/><circle cx="165" cy="170" r="14" fill="#0c0f12" stroke="#cbd5e1" stroke-width="3"/><circle cx="260" cy="170" r="14" fill="#0c0f12" stroke="#cbd5e1" stroke-width="3"/><path d="M96 192q104 18 208-6" stroke="${o}" stroke-width="5" fill="none" stroke-linecap="round"/>` + wm('AERO DYNAMICS', 'GLOBAL AUTOMOTIVE & SPARES', 236, o, '#d1d5db', 24);
    },
    () => {
      const g = G('#ffe08a', '#d99a1c', 1), te = G('#2dd4bf', '#0e7490');
      return full('#1e293b') + `<circle cx="200" cy="108" r="46" fill="none" stroke="${te}" stroke-width="12"/><path d="M168 134l40-70 8 44 26 6z" fill="${O}"/>` + wm('HORIZON EXPLORER', 'GLOBAL SAFARIS & TOURS', 215, g, '#4cc9f0', 24);
    },
    () => {
      const id = 'a' + (U++);
      return full('#2d1b0e') + `<circle cx="200" cy="108" r="64" fill="#542e13" stroke="#f5e6c8" stroke-width="4"/><path id="${id}" d="M153 108a47 47 0 0 1 94 0" fill="none"/><text font-size="11" font-weight="800" fill="#f5e6c8" letter-spacing="3"><textPath href="#${id}" startOffset="50%" text-anchor="middle">ALTITUDE ESTATES</textPath></text>` + wm('HIGHLAND COFFEE', 'PREMIUM ROASTERS', 238, '#f5e6c8', '#d7b98a', 26);
    },
    () => full('#1f2937') + `<path d="M146 146a54 54 0 0 1 108 0z" fill="${G('#8a3b12', '#3b1d06', 1)}"/><rect x="136" y="146" width="128" height="8" rx="4" fill="#3b1d06"/><path d="M164 84q-10-20 6-34M236 84q10-20-6-34" stroke="${O}" stroke-width="5" fill="none" stroke-linecap="round"/><text x="200" y="212" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="32" font-weight="900" fill="${O}">APEX CATERING</text>${T2(200, 242, 'HOSPITALITY SERVICES', 11, '#9ca3af', 700, 'letter-spacing="3"')}`,
    () => {
      const g = G('#ffe9a8', '#c9962b', 1), r = G('#ff9a3d', '#c2410c');
      return full('#0b1a3a') + `<circle cx="200" cy="104" r="54" fill="none" stroke="#cbd5e1" stroke-width="3"/>` + wm('VANGUARD REALTY', 'GLOBAL PROPERTIES', 208, r, '#e5e7eb', 24, 'Georgia,serif');
    },
    () => {
      const l = G('#d9f99d', '#84cc16');
      return full('#06141b') + `<circle cx="200" cy="100" r="54" fill="none" stroke="${l}" stroke-width="7"/><path d="M174 98q0 30 26 30t26-30" stroke="${l}" stroke-width="5" fill="none"/>` + wm('NEXUS BROADCAST', 'MEDIA & COMMUNICATIONS', 226, '#cbd5e1', l, 22);
    },
    () => full('#041e23') + `<circle cx="200" cy="104" r="50" fill="none" stroke="#7fd1d6" stroke-width="3"/>` + wm('BLUE OCEAN LOGISTICS', 'GLOBAL FREIGHT SYSTEM', 226, '#fff', '#7fd1d6', 22, 'Georgia,serif'),
    () => {
      const g = G('#ffe9a8', '#c9962b', 1);
      return full('#111827') + `<circle cx="200" cy="100" r="56" fill="none" stroke="${g}" stroke-width="3"/><text x="200" y="214" text-anchor="middle" font-size="34" font-weight="900" fill="#fff">AURA COSMETICS</text>${T2(200, 246, 'LUXURY BEAUTY & SPA', 12, g, 700, 'letter-spacing="5"')}`;
    }
  ];

  /* ---------- CORPORATE MOCKUP PRODUCTS (Internal branding uses Urban Mark Creatives, corporate items use global titles) ---------- */
  const P = {
    plate: () => {
      const g = G('#f6dd90', '#a67c1a');
      return studio('#efe9df', '#cfc7b8') + `<g filter="url(#ds)"><rect x="70" y="95" width="260" height="110" rx="6" fill="${g}"/><rect x="78" y="103" width="244" height="94" rx="3" fill="none" stroke="#7a5a10" stroke-width="1.5" opacity=".7"/><circle cx="116" cy="150" r="20" fill="#5b4108"/>${mark(116, 150, 1.4, '#f6dd90')}<text x="148" y="148" font-size="18" font-weight="800" fill="#4a3505">BOARDROOM 01</text><text x="148" y="168" font-size="10" fill="#6b4e0c" letter-spacing="3">GLOBAL ENTERPRISE CORP</text></g>`;
    },
    flask: () => studio() + `<g filter="url(#ds)"><path d="M182 70q-14 0-14 14v6h64v-6q0-14-14-14z" fill="${G('#555', '#111')}"/><rect x="164" y="88" width="72" height="170" rx="24" fill="${G('#ff9a4d', '#c2410c')}"/><circle cx="204" cy="158" r="20" fill="#fff"/>${mark(204, 158, 1.4, O)}${T2(204, 200, 'NEXUS LABS', 9, '#fff')}</g>`,
    pens: () => {
      const o = G('#ff9a4d', '#c2410c'), w = G('#fff', '#d6dae2', 1);
      return studio() + [[64, 120, -16], [78, 162, -5], [70, 204, 7]].map(p => `<g transform="translate(${p[0]} ${p[1]}) rotate(${p[2]})" filter="url(#ds2)"><rect width="200" height="14" rx="7" fill="${w}"/><rect x="132" width="50" height="14" fill="${o}"/><text x="40" y="10.5" font-size="7" font-weight="800" fill="${N}" letter-spacing="1">NORTHWIND &amp; CO.</text></g>`).join('');
    },
    docs: () => studio() + `<g filter="url(#ds)"><g transform="rotate(-6 180 150)"><rect x="96" y="38" width="150" height="212" fill="#fff"/><rect x="96" y="38" width="150" height="34" fill="${N}"/>${T2(171, 60, 'EXECUTIVE REPORT', 11, '#fff')}${ln(108, 184, 126, 4)}</g></g>`,
    book: () => studio() + `<g filter="url(#ds)"><rect x="118" y="34" width="150" height="216" rx="3" fill="${G('#12306b', N, 1)}"/><path d="M118 190q60-50 150-10v70H118z" fill="${O}"/>${T2(197, 92, 'CORPORATE', 22, '#fff', 900)}${T2(197, 116, 'PROFILE', 22, '#fff', 900)}${mark(197, 150, 1.8, '#fff')}</g>`,
    spiral: () => studio() + `<g filter="url(#ds)"><rect x="118" y="34" width="160" height="224" rx="5" fill="${G('#16397a', N, 1)}"/>${T2(204, 94, 'STRATEGY', 20, '#fff', 900)}${T2(204, 118, 'NOTES', 20, '#fff', 900)}</g>`,
    plan: () => studio('#e8ecf3', '#c0c9d8') + `<g filter="url(#ds)"><rect x="66" y="62" width="250" height="172" fill="${G('#2c62c4', '#173f8a')}"/>${T2(266, 206, 'BLUEPRINT ARCHITECTURE', 8, '#fff', 600)}</g>`,
    tent: () => studio() + `<g filter="url(#ds)"><path d="M96 238L132 104H285L252 238Z" fill="#fff"/><path d="M96 238L110 188q60-26 120 10L252 238Z" fill="${O}"/>${T2(184, 164, 'EXECUTIVE VIP', 20, N, 900)}</g>`,
    folder: () => studio() + `<g filter="url(#ds)"><rect x="104" y="36" width="170" height="214" fill="#fff"/><path d="M104 200q80-50 170-14v64H104z" fill="${O}"/>${mark(189, 96, 2.2, N)}${T2(189, 150, 'PORTFOLIO', 16, N, 900)}</g>`,
    bag: () => studio('#efe8de', '#cdbfa8') + `<g filter="url(#ds)"><rect x="128" y="92" width="144" height="166" fill="${G('#dcbc8c', '#b58a52', 1)}"/><circle cx="200" cy="168" r="34" fill="${N}"/>${mark(200, 168, 2.2, O)}</g>`,
    mug: () => studio() + `<g filter="url(#ds)"><rect x="108" y="96" width="160" height="140" rx="12" fill="${G('#fff', '#d9dee7')}"/><circle cx="196" cy="156" r="26" fill="${N}"/>${mark(196, 156, 1.8, O)}</g>`,
    flyers: () => studio() + `<g filter="url(#ds)"><rect x="120" y="40" width="150" height="212" fill="#fff"/><path d="M120 40h150v72q-72 40-150 8z" fill="${O}"/>${T2(195, 74, 'GLOBAL SUMMIT', 16, '#fff', 900)}</g>`,
    funeral: () => studio('#e9e7e4', '#bdb9b3') + `<g filter="url(#ds)"><rect x="116" y="34" width="168" height="222" rx="3" fill="${G('#2a2a30', '#0f0f12', 1)}"/>${T2(200, 72, 'IN MEMORIAM', 11, '#d9b45a', 700, 'letter-spacing="2"')}</g>`,
    receipt: () => studio() + `<g filter="url(#ds)"><rect x="112" y="40" width="150" height="208" rx="4" fill="${G('#16397a', N, 1)}"/>${T2(187, 108, 'INVOICE BOOK', 14, '#fff', 900)}</g>`,
    tshirt: () => studio('#e6eef0', '#b7c6cb') + `<g filter="url(#ds)"><path d="M174 40L140 52L92 104L126 130L140 116V250H260V116L274 130L308 104L260 52L226 40Z" fill="${G('#fff', '#dfe3ea')}"/><circle cx="200" cy="130" r="30" fill="${N}"/>${mark(200, 130, 2.4, O)}</g>`,
    banner: () => studio() + `<g filter="url(#ds)"><rect x="138" y="26" width="124" height="224" fill="${G(N, '#16397a', 1)}"/>${T2(200, 62, 'EXPO 2026', 17, '#fff', 900)}</g>`
  };

  const cap = (c = '#8a3b12') => studio('#e9e1d6', '#c9bba6') + `<g filter="url(#ds)"><path d="M130 180Q130 100 200 100T270 180Z" fill="${c}"/><circle cx="200" cy="148" r="14" fill="#fff"/>${mark(200, 148, 1.1, N)}</g>`;
  const cups = () => studio('#dfe9e1', '#b3c8b8') + `<g filter="url(#ds2)"><path d="M168 112h64l-9 126h-46z" fill="${G('#1a7a4c', '#0b4a2c', 1)}"/><circle cx="200" cy="150" r="15" fill="#fff"/></g>`;
  const sign = () => full(G('#2b2f36', '#0d1014', 1)) + `<g filter="url(#ds)"><circle cx="208" cy="170" r="78" fill="#fff"/><circle cx="208" cy="148" r="22" fill="${N}"/>${mark(208, 148, 1.8, O)}${T2(208, 196, 'HALCYON', 16, N, 900)}</g>`;
  const BR = [() => cap('#8a3b12'), cups, P.bag, sign, P.mug, P.flask, P.tshirt, () => cap('#1f2937')];

  /* ---------- POSTERS & FLIERS ---------- */
  const POS = [[O, N, 'GLOBAL OPENING'], [T, N, 'TECH EXPO 2026'], ['#7c3aed', '#1e1b4b', 'NEXUS SYMPOSIUM'], ['#16a34a', '#052e16', 'GREEN ENERGY INITIATIVE'], ['#dc2626', '#1f2937', 'AUTOMOTIVE FORUM'], ['#0ea5e9', '#082f49', 'CLOUD INFRASTRUCTURE'], ['#f59e0b', '#451a03', 'EXECUTIVE LEADERSHIP'], ['#db2777', '#500724', 'LUXURY BRANDING']];
  const poster = i => {
    const p = POS[i % 8];
    return studio('#eceff4', '#c4cad6') + `<g filter="url(#ds)" transform="rotate(${i % 2 ? 3 : -3} 200 140)"><rect x="112" y="16" width="176" height="248" fill="${G(p[0], p[1], 1)}"/>${T2(200, 60, p[2], 16, '#fff', 900)}${person(200, 128, 2.3, '#fff')}</g>`;
  };

  /* ---------- BUSINESS CARDS ---------- */
  const CC = [[N, O], ['#14532d', '#fbbf24'], ['#7f1d1d', '#fecaca'], ['#1e3a8a', '#38bdf8'], ['#111827', O], ['#0f766e', '#fde68a'], ['#4c1d95', '#f472b6'], ['#78350f', '#fbbf24']];
  const cards = i => {
    const c = CC[i % 8];
    return full(G('#c9a073', '#8b5e3c')) + `<g filter="url(#ds)"><g transform="rotate(-14 150 150)"><rect x="70" y="92" width="196" height="112" rx="5" fill="${c[0]}"/><circle cx="168" cy="136" r="22" fill="${c[1]}"/>${T2(168, 182, 'VANGUARD CORP', 12, '#fff', 900)}</g></g>`;
  };

  const letter = i => {
    const c = CC[i % 8];
    return full(G('#dde0e5', '#aab1bb')) + `<g filter="url(#ds)"><g transform="rotate(-5 200 150)"><rect x="108" y="20" width="184" height="254" fill="#fff"/><circle cx="132" cy="52" r="13" fill="${c[0]}"/><text x="152" y="50" font-size="10" font-weight="900" fill="${c[0]}">GLOBAL HEADQUARTERS</text>${ln(124, 92, 150, 12, 10, '#e2e8f0', 3.5)}</g></g>`;
  };

  const booklet = i => {
    const c = CC[i % 8];
    return studio('#dfe2e8', '#b7bdc8') + `<g filter="url(#ds)"><path d="M50 84L200 100V242L50 226Z" fill="#fff"/><path d="M350 84L200 100V242L350 226Z" fill="#f4f5f8"/><rect x="66" y="100" width="64" height="50" fill="${c[0]}"/><rect x="214" y="106" width="122" height="44" fill="${c[1]}"/></g>`;
  };

  /* ---------- WEBSITES ---------- */
  const SITE = [
    ['#7f1d1d', '#111827', '#f87171', 'MERIDIAN TRAVEL', 'Explore the Wild'],
    ['#14532d', '#052e16', '#a3e635', 'VERDANT FOODS', 'Fresh Produce & Export'],
    ['#0a1d44', '#1e40af', '#38bdf8', 'ATLAS FREIGHT', 'Global Freight System'],
    ['#0f766e', '#134e4a', '#fde68a', 'HELIX HEALTH', 'Healthcare Excellence'],
    ['#4c1d95', '#1e1b4b', '#f472b6', 'MAISON LUMIERE', 'Luxury Global Apparel'],
    ['#92400e', '#1c1917', '#fbbf24', 'OXFORD HEIGHTS', 'World-Class Education']
  ];
  const site = i => {
    const s = SITE[i % 6];
    return full(G('#2d3239', '#07080a', 1)) + `<g filter="url(#ds)"><rect x="70" y="40" width="260" height="156" rx="8" fill="#0d0f12" stroke="#3a3f48"/><rect x="78" y="48" width="244" height="140" fill="#fff"/><rect x="78" y="48" width="244" height="24" fill="${s[0]}"/><text x="92" y="64" font-size="10" font-weight="900" fill="#fff">${s[3]}</text><rect x="78" y="72" width="244" height="70" fill="${G(s[1],s[0],1)}"/><text x="92" y="112" font-size="14" font-weight="900" fill="#fff">${s[4]}</text><rect x="92" y="150" width="60" height="22" rx="3" fill="${s[2]}"/></g>`;
  };

  const MAP = { Logos: i => LOGOS[i % 8](), Branding: i => BR[i % 8](), Fliers: poster, Cards: cards, Letterheads: letter, Profiles: booklet };
  window.ART = { pf: (k, i) => svg(() => MAP[k](i)), site: i => svg(() => site(i)), shop: (k, i) => svg(() => P[k](i)) };
})();