(() => {
  const D = window.AC, RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (n, d = 0) => n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  const sgn = v => (v > 0 ? '+' : '') + v.toFixed(2) + '%';
  const cls = v => v > 0 ? 'up' : v < 0 ? 'down' : '';
  const arrow = v => v > 0 ? '▲' : v < 0 ? '▼' : '■';
  const ic = n => `<svg aria-hidden="true"><use href="#i-${n}"/></svg>`;
  /* colour scale shared by heat map tiles */
  const heatCol = v => {
    const t = Math.max(-3, Math.min(3, v)) / 3; if (Math.abs(v) < .005) return '#4a5470';
    return t > 0 ? `rgba(22,160,107,${.35 + t * .65})` : `rgba(200,50,62,${.35 - t * .65})`
  };

  /* ---------- curtain / page entrance ---------- */
  const curtain = $('#curtain');
  const first = !sessionStorage.getItem('ac-seen');
  const startPage = () => {
    document.body.classList.add('ready');
    $$('.hero .rv,.page-hero .rv,.words').forEach(el => el.classList.add('in'));
    $$('.art').forEach(el => el.classList.add('in'));
    observe()
  };
  if (curtain) {
    if (!first) curtain.classList.add('quick');
    const wait = RM ? 0 : (first ? 2100 : 450);
    setTimeout(() => { curtain.classList.add('open'); if (!first) curtain.classList.add('fast'); sessionStorage.setItem('ac-seen', '1'); setTimeout(startPage, RM ? 0 : (first ? 350 : 120)) }, wait);
  } else startPage();
  /* page-leave transition */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a || !curtain || RM) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || a.target || e.metaKey || e.ctrlKey || e.shiftKey || (u.pathname === location.pathname && u.hash)) return;
    if (u.pathname === location.pathname && u.search === location.search) return;
    e.preventDefault();
    curtain.classList.remove('open', 'fast'); curtain.style.transition = 'none'; curtain.style.transform = 'translateY(101%)';
    void curtain.offsetWidth; curtain.style.transition = 'transform .55s cubic-bezier(.22,.8,.24,1)'; curtain.style.transform = 'translateY(0)';
    curtain.classList.add('quick');
    setTimeout(() => location.href = a.href, 560);
  });
  addEventListener('pageshow', e => { if (e.persisted && curtain) { curtain.style.cssText = ''; curtain.classList.add('open', 'fast') } });

  /* ---------- header ---------- */
  const getNav = () => $('#nav'), getSticky = () => $('#sticky');
  addEventListener('scroll', () => {
    const nav = getNav(), sticky = getSticky();
    if (nav) nav.classList.toggle('scrolled', scrollY > 20);
    if (sticky) { const c = $('#contact-band'); sticky.classList.toggle('show', scrollY > 600 && !(c && c.getBoundingClientRect().top < innerHeight)) }
  }, { passive: true });
  const initNav = () => {
    const burger = $('#burger'), menu = $('#menu'), nav = $('#nav');
    if (!burger || !menu || burger.__init) return;
    burger.__init = true;
    const closeMenu = () => { if (menu.classList.contains('open')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu') } };
    burger.onclick = (e) => { e.stopPropagation(); const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu') };
    menu.addEventListener('click', e => { if (e.target.closest('a')) closeMenu() });
    document.addEventListener('click', e => { if (menu.classList.contains('open') && nav && !nav.contains(e.target)) closeMenu() });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); burger.focus() } });
  };
  initNav();

  /* ---------- words split ---------- */
  $$('.words').forEach(h => {
    let i = 0; const walk = n => {
      [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(t => {
            if (!t) return; if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return }
            const w = document.createElement('span'); w.className = 'w'; const s = document.createElement('span'); s.textContent = t; s.style.setProperty('--i', i++); w.appendChild(s); frag.appendChild(w)
          });
          c.replaceWith(frag)
        } else if (c.nodeType === 1) walk(c)
      })
    }; walk(h)
  });

  /* ---------- reveal observer ---------- */
  function count(el) {
    const t = +el.dataset.count, suf = el.dataset.suffix || '';
    if (RM) { el.textContent = fmt(t) + suf; return }
    const d = 1500, s = performance.now(); (function f(n) { const p = Math.min((n - s) / d, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(Math.round(t * e)) + suf; if (p < 1) requestAnimationFrame(f) })(s)
  }
  let ro;
  function observe() {
    if (!ro) ro = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const t = e.target; t.classList.add('in');
      $$('[data-count]', t).forEach(count); if (t.dataset.count) count(t);
      $$('.adv-bar i', t).forEach(i => i.style.width = i.dataset.w + '%');
      $$('.score i b', t).forEach(b => b.style.width = b.dataset.w + '%');
      ro.unobserve(t)
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('.rv:not(.in),.words:not(.in),[data-count]:not(.rv),.reveal-box:not(.in)').forEach(el => { if (!el.__o) { el.__o = 1; ro.observe(el) } });
  }
  /* stagger children */
  $$('[data-stagger]').forEach(p => [...p.children].forEach((c, i) => { c.classList.add('rv'); if (p.dataset.stagger === 'z') c.classList.add('rv-z'); c.style.setProperty('--d', (i * .07) + 's') }));

  /* ---------- ticker ---------- */
  const tk = $('#ticker');
  if (tk) { const one = D.ticker.map(([n, p, c]) => `<span><b>${n}</b>${fmt(p, 2)}<em class="${cls(c)}" style="font-style:normal">${arrow(c)} ${Math.abs(c).toFixed(2)}%</em></span>`).join(''); tk.innerHTML = one + one }

  /* ---------- home summary ---------- */
  const hs = $('#summary');
  if (hs) {
    const s = D.summary, t = s.advance + s.decline + s.unchanged;
    const bars = $$('.adv-bar i', hs); bars[0].dataset.w = (s.advance / t * 100).toFixed(1); bars[1].dataset.w = (s.unchanged / t * 100).toFixed(1); bars[2].dataset.w = (s.decline / t * 100).toFixed(1);
    $('#s-adv').dataset.count = s.advance; $('#s-dec').dataset.count = s.decline; $('#s-unc').dataset.count = s.unchanged; $('#s-hi').dataset.count = s.high52;
    if ($('#s-lo')) $('#s-lo').dataset.count = s.low52 || 24;
  }

  /* ---------- heat map ---------- */
  const heat = $('#heat');
  if (heat) {
    const sets = { all: D.heat.map(([s, p, c]) => [s, c, p]), bank: D.bank.map(([s, c]) => [s, c, null]) };
    let cur = 'all', sort = 'default', tick;
    const draw = () => {
      let arr = [...sets[cur]]; if (sort === 'gain') arr.sort((a, b) => b[1] - a[1]); if (sort === 'loss') arr.sort((a, b) => a[1] - b[1]);
      heat.innerHTML = arr.map(([s, c, p], i) => `<div class="tile" style="background:${heatCol(c)};--d:${RM ? 0 : Math.min(i * 14, 900)}ms" aria-label="${s} ${c >= 0 ? 'up' : 'down'} ${Math.abs(c).toFixed(2)} percent"><b>${s}</b>${p ? `<small>₹${fmt(p, 2)}</small>` : '<small>&nbsp;</small>'}<span>${arrow(c)} ${sgn(c)}</span></div>`).join('');
      $('#heat-count').textContent = arr.length
    };
    $$('[data-heat]').forEach(b => b.onclick = () => { $$('[data-heat]').forEach(x => x.setAttribute('aria-pressed', x === b)); cur = b.dataset.heat; draw() });
    $$('[data-sort]').forEach(b => b.onclick = () => { $$('[data-sort]').forEach(x => x.setAttribute('aria-pressed', x === b)); sort = b.dataset.sort; draw() });
    draw();
  }

  /* ---------- advance / decline bars ---------- */
  const adn = $('#adnifty');
  if (adn) {
    const mx = 1; const row = (s, v, i) => `<div class="adrow"><b>${s}</b><div class="bar"><i style="--w:${Math.min(100, Math.abs(v) / mx * 100)}%;--d:${i * 40}ms;background:${v >= 0 ? 'var(--up)' : 'var(--down)'}"></i></div><span class="mono ${cls(v)}">${sgn(v)}</span></div>`;
    adn.innerHTML = `<div><h3 class="up" style="margin-bottom:10px">▲ Advancing · ${D.adNifty.up.length}</h3>${D.adNifty.up.map((r, i) => row(r[0], r[1], i)).join('')}</div><div><h3 class="down" style="margin-bottom:10px">▼ Declining · ${D.adNifty.down.length}</h3>${D.adNifty.down.map((r, i) => row(r[0], r[1], i)).join('')}</div>`
  }

  /* ---------- sector weights ---------- */
  const sw = $('#sw');
  if (sw) {
    const cm = { 'Very high': 'vh', 'High': 'h', 'Moderately high': 'mh', 'Moderate': 'm', 'Low to moderate': 'lm', 'Low': 'l', 'Lowest': 'lo' };
    const max = D.sectorWeights[0][1];
    sw.innerHTML = D.sectorWeights.map(([n, p, d, c], i) => `<article class="card sw-card cat-${cm[c]} rv" style="--d:${(i % 6) * .06}s"><span class="rk">#${i + 1}</span><h3>${n}</h3><div class="pc">${p.toFixed(2)}%</div><p>${d}</p><div class="bar"><i style="--w:${p / max * 100}%;--d:${(i % 6) * .06 + .2}s"></i></div><em>${c} weight</em></article>`).join('');
    const lg = $('#sw-legend'); if (lg) lg.innerHTML = [['Very high · above 20%', 'vh'], ['High · 10–20%', 'h'], ['Moderately high · 5–10%', 'mh'], ['Moderate · 2–5%', 'm'], ['Low to moderate · 1–2%', 'lm'], ['Low · 0.5–1%', 'l'], ['Lowest · below 0.5%', 'lo']].map(([t, k]) => `<span class="cat-${k}"><i></i>${t}</span>`).join('')
  }

  /* ---------- matrix ---------- */
  const mx = $('#matrix');
  if (mx) mx.innerHTML = D.matrix.map(([n, d], i) => `<div class="mrow rv ${i === 5 ? 'hl' : ''}" style="--d:${(i % 10) * .05}s"><b class="n">${String(i + 1).padStart(2, '0')}</b><div><b>${n}</b><span class="d">${d}</span></div></div>`).join('');


  /* ---------- holdings ---------- */
  const hd = $('#holdings');
  if (hd) hd.innerHTML = D.holdings.map((h, k) => {
    const mx = Math.max(...h.rows.map(r => r[1] || 0)) || 1;
    return `<article class="card hold rv" style="--d:${(k % 3) * .1}s"><h3>${h.name}<small>Total weightage ${h.total}%</small></h3><ol>${h.rows.map((r, i) => `<li style="--w:${r[1] ? r[1] / mx * 100 : 0}"><span class="mono" style="text-align:left;color:var(--ink-mute)">${i + 1}</span><span>${r[0]}</span><span class="mono">${r[1] !== null ? r[1].toFixed(2) + '%' : '–'}</span></li>`).join('')}</ol>${h.note ? `<p class="note">${h.note}</p>` : ''}</article>`
  }).join('');

  /* ---------- banking drill-down ---------- */
  const dr = $('#drill');
  if (dr) {
    const b = D.banking;
    dr.innerHTML = `<div class="card reveal-box"><div class="dtiles">${b.tiles.map(([n, c, sz], i) => `<div class="dt ${sz}" style="background:${heatCol(c * 2)};--d:${i * .12}s"><b>${n}</b><span class="mono">${sgn(c)}</span></div>`).join('')}</div><p class="note" style="padding:0 20px 18px">Tile size reflects index weightage. Click any tile for full analysis (full drill-down is part of the live build).</p></div>
  <div class="card dsum reveal-box"><h3>Sector summary</h3><p class="note" style="margin:6px 0 0">Banking · sector strength ${b.strength} / 100</p><div class="gauge"><i style="--w:${b.strength}%"></i></div><dl>${b.summary.map(([k, v]) => `<div><dt>${k}</dt><dd class="${/\+|Positive|8 \//.test(v) ? 'up' : 'gold'}">${v}</dd></div>`).join('')}</dl></div>`
  }

  /* ---------- rotation / gainers, neutral, losers ---------- */
  const rot = $('#rot');
  if (rot && D.rotation) {
    const gainers = D.rotation.Gainers || D.rotation.Leading || [];
    const neutral = D.rotation.Neutral || D.rotation.Improving || [];
    const losers = D.rotation.Losers || [...(D.rotation.Lagging || []), ...(D.rotation.Weakening || [])];
    const q = [
      ['lead', 'Gainers', 'positive momentum & sector leadership', gainers],
      ['neu', 'Neutral', 'steady, range-bound & consolidating', neutral],
      ['lag', 'Losers', 'underperforming & lagging sectors', losers]
    ];
    rot.innerHTML = q.map(([c, t, s, list]) => `<div class="q ${c} in reveal-box"><h3>${t} <small>(${s})</small></h3><div class="pill-list">${list.map((p, i) => `<span class="pill" style="--d:${i * .04}s">${p}</span>`).join('')}</div></div>`).join('');
  }

  /* ---------- sector map ---------- */
  const sm = $('#smap');
  if (sm) sm.innerHTML = D.sectorMap.map(([n, cs], k) => `<div class="card grp rv" style="--d:${(k % 4) * .08}s"><h3>${n}</h3><div class="cells">${cs.map(([s, c]) => `<div class="cell" style="background:${heatCol(c)}"><b>${s}</b><span class="mono">${sgn(c)}</span></div>`).join('')}</div></div>`).join('');

  /* ---------- analysis lists ---------- */
  [['fund', D.fundamental], ['fin', D.financial], ['tech', D.technical], ['ind', D.indicators]].forEach(([id, list]) => {
    const el = $('#' + id);
    if (el) el.innerHTML = list.map((t, i) => `<div class="metric rv" style="--d:${i * .04}s">${t}</div>`).join('')
  });
  const cards = (id, list, cls2 = '') => { const el = $('#' + id); if (el) el.innerHTML = list.map(([t, d], i) => `<article class="card tile-card ${cls2} rv" style="--d:${i * .07}s"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></article>`).join('') };
  cards('proPart', D.pro.particulars); cards('proUni', D.pro.universe); cards('proVol', D.pro.volume); cards('proTech', D.pro.technical);
  const pd = $('#proDec');
  if (pd) pd.innerHTML = D.pro.decisions.map(([t, d, c], i) => `<article class="dec ${c} rv" style="--d:${i * .09}s"><h3>${t}</h3><p>${d}</p></article>`).join('');
  const pl = $('#policy-list');
  if (pl) pl.innerHTML = D.policy.map((t, i) => `<li class="rv" style="--d:${i * .08}s">${t}</li>`).join('');

  /* ---------- dividend / watch ---------- */
  const cal = $('#cal');
  if (cal) {
    const colors = ['#4a90e2', '#f08a3c', '#47b36a', '#e24a4a', '#f2c94c', '#38b6c4', '#9a6be0', '#3c9a4a', '#4a6fd0', '#e08a3c', '#a9742f', '#38a89a'];
    cal.innerHTML = D.dividends.map(([m, s], i) => `<article class="card mo rv" style="--c:${colors[i]};--d:${(i % 4) * .07}s"><h3>${m}</h3><ul>${s.map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('')
  }
  const wp = $('#watchpos');
  if (wp) wp.innerHTML = D.watchPositive.map(([n, t], i) => `<article class="card watch pos rv" style="--d:${i * .07}s"><h3>${n}</h3><p>${t}</p></article>`).join('');
  const wn = $('#watchneg');
  if (wn) wn.innerHTML = `<article class="card watch neg rv"><h3>Lock-in period expiry</h3><div class="chips" style="margin-top:12px">${D.watchNegative.map(n => `<span class="chip">${n}</span>`).join('')}</div></article>`;

  /* ---------- portfolio model ---------- */
  const pf = $('#portfolio');
  if (pf) {
    const p = D.portfolio; const cols = ['#d9a93a', '#5b8cff', '#2ad08a', '#f08a3c', '#b186f0'];
    const parts = [['Banking', p.banking], ...p.sectors.map(s => [s.name.replace(' Sector', ''), s.shares])];
    pf.innerHTML = `<div class="card reveal-box" style="padding:26px;margin-bottom:18px"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px"><h3>Portfolio summary</h3><span class="mono gold">${p.total} shares total</span></div><div class="port-bar" role="img" aria-label="Banking 26, IT 15, FMCG 15, Infrastructure 15, Pharma 15">${parts.map(([n, v], i) => `<i style="width:${v / p.total * 100}%;background:${cols[i]};transition-delay:${i * .15}s"></i>`).join('')}</div><div class="legend-row" style="margin:10px 0 0">${parts.map(([n, v], i) => `<span style="--c:${cols[i]}"><i></i>${n} · ${v}</span>`).join('')}</div><p class="note">Banking: ${p.banking} shares · other 4 sectors: 15 shares each.</p></div>
  <div class="grid g3">${p.sectors.filter(s => s.groups.length).map((s, k) => `<article class="card tile-card rv" style="--d:${k * .1}s"><span class="num">${s.shares} SHARES</span><h3>${s.name}</h3>${s.groups.map(([g, l]) => `<p><b class="gold">${g}</b><br>${l}</p>`).join('')}</article>`).join('')}</div>`
  }

  /* ---------- screener ---------- */
  const sb = $('#scrBody');
  if (sb) {
    const cols = [['name', 'Stock'], ['sector', 'Sector'], ['cmp', 'CMP ₹'], ['mcap', 'Mkt cap ₹ Cr'], ['curNP', 'Cur Qtr N/P ₹ Cr'], ['prevNP', 'Prev Qtr N/P ₹ Cr'], ['growth', 'Change %'], ['buy', 'Buy qty (L)'], ['sell', 'Sell qty (L)'], ['chg', 'Price chg %'], ['vol', 'Today vol (L)'], ['avg', '1-wk avg vol (L)'], ['var', 'Variance'], ['piv', 'Pivot'], ['op', 'Open vs pivot'], ['c15', '15-min candle'], ['score', 'Score'], ['status', 'Status']];
    let rows = D.screener.map(r => ({ name: r[0], sector: r[1], cmp: r[2], mcap: r[3], curNP: r[4], prevNP: r[5], growth: (r[4] - r[5]) / r[5] * 100, buy: r[6], sell: r[7], chg: r[8], vol: r[9], avg: r[10], var: (r[9] - r[10]) / r[10] * 100, piv: r[11], op: r[12] === '>' ? 'Above' : 'Below', c15: r[13] === '>' ? 'Higher' : 'Lower', score: r[14], status: r[15] }));
    let key = 'score', dir = -1, flt = 'All', q = '';
    const stc = { 'Strong Buy': 'buy', 'Strong Sell': 'sell', 'Review': 'review', 'Not Now': 'not' };
    const head = $('#scrHead');
    head.innerHTML = '<tr>' + cols.map(([k, t], i) => `<th scope="col" class="${i < 2 ? 'l' : ''}" aria-sort="none"><button data-k="${k}">${t}<span aria-hidden="true"> ↕</span></button></th>`).join('') + '</tr>';
    const draw = () => {
      let list = rows.filter(r => (flt === 'All' || r.status === flt) && (!q || (r.name + r.sector).toLowerCase().includes(q)));
      list.sort((a, b) => (typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key]) * dir);
      sb.innerHTML = list.map((r, i) => `<tr class="${RM ? '' : 'enter'}" style="--d:${i * 45}ms"><td>${r.name}</td><td class="l" style="font-family:var(--f-sans);font-weight:400;color:var(--ink-dim)">${r.sector}</td><td>${fmt(r.cmp, 2)}</td><td>${fmt(r.mcap)}</td><td>${fmt(r.curNP)}</td><td>${fmt(r.prevNP)}</td><td class="${cls(r.growth)}">${sgn(r.growth)}</td><td>${r.buy.toFixed(1)}</td><td>${r.sell.toFixed(1)}</td><td class="${cls(r.chg)}">${sgn(r.chg)}</td><td>${r.vol}</td><td>${r.avg}</td><td class="${cls(r.var)}">${sgn(r.var)}</td><td>${fmt(r.piv)}</td><td class="${r.op === 'Above' ? 'up' : 'down'}">${r.op}</td><td class="${r.c15 === 'Higher' ? 'up' : 'down'}">${r.c15}</td><td><span class="score">${r.score}<i><b data-w="${r.score}" style="width:${r.score}%"></b></i></span></td><td><span class="sig ${stc[r.status]}">${r.status}</span></td></tr>`).join('');
      $('#scr-n').textContent = list.length;
      ['Strong Buy', 'Strong Sell', 'Review', 'Not Now'].forEach(s => { const e = $(`[data-kpi="${s}"]`); if (e) e.textContent = rows.filter(r => r.status === s).length });
      $('#scr-empty').style.display = list.length ? 'none' : 'block'
    };
    head.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return; const k = b.dataset.k; dir = key === k ? -dir : (typeof rows[0][k] === 'string' ? 1 : -1); key = k;
      $$('th', head).forEach(th => th.setAttribute('aria-sort', 'none')); b.closest('th').setAttribute('aria-sort', dir > 0 ? 'ascending' : 'descending'); draw()
    });
    $$('[data-status]').forEach(b => b.onclick = () => { $$('[data-status]').forEach(x => x.setAttribute('aria-pressed', x === b)); flt = b.dataset.status; draw() });
    $('#scr-q').addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); draw() });
    draw();
  }

  /* ---------- contact form ---------- */
  const f = $('#cf');
  if (f) {
    f.addEventListener('submit', e => {
      e.preventDefault(); let first = null;
      [['n', v => v.trim().length > 1], ['e', v => /^\S+@\S+\.\S+$/.test(v)], ['m', v => v.trim().length > 4]].forEach(([id, ok]) => { const i = $('#' + id), good = ok(i.value); i.closest('.fld').classList.toggle('bad', !good); i.setAttribute('aria-invalid', !good); if (!good && !first) first = i });
      if (first) { first.focus(); return }
      const b = $('#send'); b.disabled = true; b.classList.add('loading');
      setTimeout(() => { b.disabled = false; b.classList.remove('loading'); f.reset(); $('#ok').style.display = 'block' }, 1200)
    });
    $$('#cf input,#cf textarea').forEach(i => i.addEventListener('blur', () => { if (i.value) i.closest('.fld').classList.remove('bad') }))
  }

  /* ---------- sector slider (home page) ---------- */
  const initSectorSlider = () => {
    const slider = $('#secSlider');
    if (!slider) return;
    const track = $('#secTrack', slider);
    const slides = $$('.sec-slide', track);
    const dotsContainer = $('#secDots', slider);
    if (!slides.length) return;

    let current = 0;
    const total = slides.length;
    let timer = null;
    const interval = 5000;
    let startX = 0;
    let isSwiping = false;

    if (dotsContainer) {
      dotsContainer.innerHTML = slides.map((_, i) =>
        `<button class="s-dot${i === 0 ? ' active' : ''}" aria-label="Go to sector slide ${i + 1}" data-index="${i}"></button>`
      ).join('');

      const dots = $$('.s-dot', dotsContainer);
      dots.forEach(dot => {
        dot.onclick = () => {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          goTo(idx);
          startTimer();
        };
      });
    }

    const goTo = (index) => {
      current = (index + total) % total;
      slides.forEach((sl, i) => {
        sl.classList.toggle('active', i === current);
        sl.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });
      if (dotsContainer) {
        const dots = $$('.s-dot', dotsContainer);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const startTimer = () => {
      stopTimer();
      timer = setInterval(next, interval);
    };

    const stopTimer = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    slider.addEventListener('mouseenter', stopTimer);
    slider.addEventListener('mouseleave', startTimer);

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
      stopTimer();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 45) {
        prev();
      } else if (diff < -45) {
        next();
      }
      startTimer();
    }, { passive: true });

    goTo(0);
    startTimer();
  };
  initSectorSlider();

  /* ---------- analysis page: 4-pillar interactive slider ---------- */
  const initAnalysisSlider = () => {
    const slider = $('#analysisSlider');
    if (!slider) return;

    const track = $('#analysisTrack', slider);
    const slides = $$('.analysis-slide', track);
    const dotsContainer = $('#anaDots', slider);
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;
    let timer = null;
    const interval = 5000;
    let startX = 0;
    let isSwiping = false;

    if (dotsContainer) {
      dotsContainer.innerHTML = slides.map((_, i) =>
        `<button class="s-dot${i === 0 ? ' active' : ''}" aria-label="Go to analysis slide ${i + 1}" data-index="${i}"></button>`
      ).join('');

      const dots = $$('.s-dot', dotsContainer);
      dots.forEach(dot => {
        dot.onclick = () => {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          goTo(idx);
          startTimer();
        };
      });
    }

    const goTo = (index) => {
      current = (index + total) % total;
      slides.forEach((sl, i) => {
        sl.classList.toggle('active', i === current);
        sl.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });
      if (dotsContainer) {
        const dots = $$('.s-dot', dotsContainer);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const startTimer = () => {
      stopTimer();
      timer = setInterval(next, interval);
    };

    const stopTimer = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    slider.addEventListener('mouseenter', stopTimer);
    slider.addEventListener('mouseleave', startTimer);

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
      stopTimer();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 45) {
        prev();
      } else if (diff < -45) {
        next();
      }
      startTimer();
    }, { passive: true });

    goTo(0);
    startTimer();
  };
  initAnalysisSlider();

  /* ---------- analysis page: signals & activity slider ---------- */
  const initSignalsSlider = () => {
    const slider = $('#sigSlider');
    if (!slider) return;

    const track = $('#sigTrack', slider);
    const slides = $$('.sig-slide', track);
    const dotsContainer = $('#sigDots', slider);
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;
    let timer = null;
    const interval = 5000;
    let startX = 0;
    let isSwiping = false;

    if (dotsContainer) {
      dotsContainer.innerHTML = slides.map((_, i) =>
        `<button class="s-dot${i === 0 ? ' active' : ''}" aria-label="Go to signal slide ${i + 1}" data-index="${i}"></button>`
      ).join('');

      const dots = $$('.s-dot', dotsContainer);
      dots.forEach(dot => {
        dot.onclick = () => {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          goTo(idx);
          startTimer();
        };
      });
    }

    const goTo = (index) => {
      current = (index + total) % total;
      slides.forEach((sl, i) => {
        sl.classList.toggle('active', i === current);
        sl.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });
      if (dotsContainer) {
        const dots = $$('.s-dot', dotsContainer);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const startTimer = () => {
      stopTimer();
      timer = setInterval(next, interval);
    };

    const stopTimer = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    slider.addEventListener('mouseenter', stopTimer);
    slider.addEventListener('mouseleave', startTimer);

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
      stopTimer();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 45) {
        prev();
      } else if (diff < -45) {
        next();
      }
      startTimer();
    }, { passive: true });

    goTo(0);
    startTimer();
  };
  initSignalsSlider();

  /* ---------- circular orbit sector ecosystem tooltip ---------- */
  const initSectorOrbit = () => {
    const stage = $('#sector-ecosystem');
    if (!stage) return;
    const stageEl = $('.orbit-stage', stage);
    const items = $$('.orbit-item, .orbit-center-card', stage);
    const tooltip = $('#orbitTooltip', stage);
    const nameEl = $('.info-sector-name', stage);
    const weightEl = $('.info-weight-pill', stage);
    const leadEl = $('.info-lead-stocks', stage);
    const descEl = $('.info-desc', stage);

    if (!stageEl || !tooltip) return;

    let hideTimer = null;

    const positionCard = (item) => {
      const stageRect = stageEl.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Read dimensions of the card
      const cardWidth = tooltip.offsetWidth || 280;
      const cardHeight = tooltip.offsetHeight || 110;

      // Item center relative to stage
      const itemCenterX = (itemRect.left + itemRect.width / 2) - stageRect.left;
      const itemCenterY = (itemRect.top + itemRect.height / 2) - stageRect.top;

      // Stage center
      const stageCenterX = stageRect.width / 2;
      const stageCenterY = stageRect.height / 2;

      const dx = itemCenterX - stageCenterX;
      const dy = itemCenterY - stageCenterY;

      let top = 0;
      let left = 0;

      // Center Anchor card: place cleanly right below it
      if (item.classList.contains('orbit-center-card')) {
        top = (itemRect.bottom - stageRect.top) + 14;
        left = itemCenterX - cardWidth / 2;
      } else {
        // Place strictly OUTSIDE the circular orbit
        const gap = 16;

        if (Math.abs(dy) >= Math.abs(dx)) {
          // Primarily vertical:
          if (dy < 0) {
            // Upper hemisphere: place ABOVE the badge (outside the circle)
            top = (itemRect.top - stageRect.top) - cardHeight - gap;
          } else {
            // Lower hemisphere: place BELOW the badge (outside the circle)
            top = (itemRect.bottom - stageRect.top) + gap;
          }
          // Align horizontally centered with the badge
          left = itemCenterX - cardWidth / 2;
        } else {
          // Primarily horizontal:
          if (dx > 0) {
            // Right hemisphere: place to the RIGHT of the badge (outside the circle)
            left = (itemRect.right - stageRect.left) + gap;
            top = itemCenterY - cardHeight / 2;

            // Check if placing to the right overflows the viewport
            const screenRight = stageRect.left + left + cardWidth;
            if (screenRight > window.innerWidth - 12) {
              // Position on the outer vertical perimeter instead
              if (dy < 0) {
                top = (itemRect.top - stageRect.top) - cardHeight - gap;
              } else {
                top = (itemRect.bottom - stageRect.top) + gap;
              }
              left = itemCenterX - cardWidth / 2;
            }
          } else {
            // Left hemisphere: place to the LEFT of the badge (outside the circle)
            left = (itemRect.left - stageRect.left) - cardWidth - gap;
            top = itemCenterY - cardHeight / 2;

            // Check if placing to the left overflows the viewport
            const screenLeft = stageRect.left + left;
            if (screenLeft < 12) {
              // Position on the outer vertical perimeter instead
              if (dy < 0) {
                top = (itemRect.top - stageRect.top) - cardHeight - gap;
              } else {
                top = (itemRect.bottom - stageRect.top) + gap;
              }
              left = itemCenterX - cardWidth / 2;
            }
          }
        }
      }

      // Safeguard horizontal placement within screen viewport
      const minScreenLeft = 12 - stageRect.left;
      const maxScreenLeft = (window.innerWidth - 12) - stageRect.left - cardWidth;
      if (maxScreenLeft >= minScreenLeft) {
        left = Math.max(minScreenLeft, Math.min(left, maxScreenLeft));
      }

      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.style.top = `${Math.round(top)}px`;
    };

    const showCard = (item) => {
      if (hideTimer) clearTimeout(hideTimer);
      const sector = item.dataset.sector;
      const weight = item.dataset.weight;
      const lead = item.dataset.lead;
      const desc = item.dataset.desc;
      if (nameEl && sector) nameEl.textContent = sector;
      if (weightEl && weight) weightEl.textContent = weight.includes('Weight') ? weight : weight + ' Weight';
      if (leadEl && lead) leadEl.textContent = lead;
      if (descEl && desc) descEl.textContent = desc;

      // Position directly adjacent to the hovered logo
      positionCard(item);

      tooltip.classList.add('visible');
    };

    const hideCard = () => {
      hideTimer = setTimeout(() => {
        tooltip.classList.remove('visible');
      }, 180);
    };

    items.forEach(item => {
      item.addEventListener('mouseenter', () => showCard(item));
      item.addEventListener('mouseleave', hideCard);
    });

    tooltip.addEventListener('mouseenter', () => {
      if (hideTimer) clearTimeout(hideTimer);
    });
    tooltip.addEventListener('mouseleave', hideCard);
  };
  initSectorOrbit();

  /* ---------- products page: our projects showcase carousel ---------- */
  const initProjectShowcaseSlider = () => {
    const slider = $('#projectCarousel');
    if (!slider) return;

    const track = $('#projectTrack', slider);
    const slides = $$('.project-slide', track);
    const prevBtn = $('#projPrev', slider);
    const nextBtn = $('#projNext', slider);
    const dotsContainer = $('#projDots', slider);
    const countCur = $('#projCur', slider);

    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;
    let timer = null;
    const interval = 5000;
    let startX = 0;
    let isSwiping = false;

    if (dotsContainer) {
      dotsContainer.innerHTML = slides.map((_, i) =>
        `<button class="s-dot${i === 0 ? ' active' : ''}" aria-label="Go to project ${i + 1}" data-index="${i}"></button>`
      ).join('');

      const dots = $$('.s-dot', dotsContainer);
      dots.forEach(dot => {
        dot.onclick = () => {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          goTo(idx);
          startTimer();
        };
      });
    }

    const goTo = (index) => {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      slides.forEach((sl, i) => {
        sl.classList.toggle('active', i === current);
        sl.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });
      if (dotsContainer) {
        const dots = $$('.s-dot', dotsContainer);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }
      if (countCur) {
        countCur.textContent = String(current + 1).padStart(2, '0');
      }
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    if (nextBtn) nextBtn.onclick = () => { next(); startTimer(); };
    if (prevBtn) prevBtn.onclick = () => { prev(); startTimer(); };

    const startTimer = () => {
      stopTimer();
      timer = setInterval(next, interval);
    };

    const stopTimer = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    slider.addEventListener('mouseenter', stopTimer);
    slider.addEventListener('mouseleave', startTimer);

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
      stopTimer();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 45) {
        prev();
      } else if (diff < -45) {
        next();
      }
      startTimer();
    }, { passive: true });

    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prev(); startTimer(); }
      if (e.key === 'ArrowRight') { next(); startTimer(); }
    });

    goTo(0);
    startTimer();
  };
  initProjectShowcaseSlider();

  /* ---------- Financial Gateway & Quarterly Results ---------- */
  const initFinancialGateway = () => {
    const section = $('#financial-gateway');
    if (!section) return;

    const cardsData = [
      {
        title: 'Quarterly results',
        metricsLabel: 'Metrics 3/13',
        defaultTooltip: { period: 'Revenue', rev: '6868 Cr.', exp: '4135 Cr.', np: '765 Cr.' },
        quarters: [
          { q: "Q1'21", revH: 34, expH: 26, rev: '3,840 Cr.', exp: '2,920 Cr.', np: '410 Cr.' },
          { q: "Q2'21", revH: 38, expH: 29, rev: '4,150 Cr.', exp: '3,110 Cr.', np: '480 Cr.' },
          { q: "Q3'21", revH: 42, expH: 31, rev: '4,520 Cr.', exp: '3,380 Cr.', np: '520 Cr.' },
          { q: "Q4'21", revH: 46, expH: 33, rev: '4,890 Cr.', exp: '3,550 Cr.', np: '590 Cr.' },
          { q: "Q1'22", revH: 49, expH: 36, rev: '5,180 Cr.', exp: '3,810 Cr.', np: '610 Cr.' },
          { q: "Q2'22", revH: 54, expH: 39, rev: '5,540 Cr.', exp: '4,020 Cr.', np: '680 Cr.' },
          { q: "Q3'22", revH: 60, expH: 43, rev: '5,960 Cr.', exp: '4,280 Cr.', np: '710 Cr.' },
          { q: "Q4'22", revH: 65, expH: 47, rev: '6,310 Cr.', exp: '4,560 Cr.', np: '740 Cr.' },
          { q: "Q1'23", revH: 70, expH: 50, rev: '6,868 Cr.', exp: '4,135 Cr.', np: '765 Cr.', highlight: true },
          { q: "Q2'23", revH: 74, expH: 53, rev: '7,150 Cr.', exp: '4,380 Cr.', np: '810 Cr.' },
          { q: "Q3'23", revH: 78, expH: 56, rev: '7,490 Cr.', exp: '4,620 Cr.', np: '860 Cr.' },
          { q: "Q4'23", revH: 84, expH: 61, rev: '7,920 Cr.', exp: '4,880 Cr.', np: '920 Cr.' },
          { q: "Q1'24", revH: 89, expH: 65, rev: '8,340 Cr.', exp: '5,120 Cr.', np: '980 Cr.' },
          { q: "Q2'24", revH: 94, expH: 68, rev: '8,850 Cr.', exp: '5,410 Cr.', np: '1,040 Cr.' }
        ]
      },
      {
        title: 'Annual P&L Statements',
        metricsLabel: 'Metrics 5/13',
        defaultTooltip: { period: 'FY2024', rev: '32,450 Cr.', exp: '21,890 Cr.', np: '4,120 Cr.' },
        quarters: [
          { q: 'FY18', revH: 38, expH: 28, rev: '14,200 Cr.', exp: '10,500 Cr.', np: '1,820 Cr.' },
          { q: 'FY19', revH: 46, expH: 33, rev: '16,800 Cr.', exp: '12,100 Cr.', np: '2,150 Cr.' },
          { q: 'FY20', revH: 52, expH: 38, rev: '19,400 Cr.', exp: '13,900 Cr.', np: '2,480 Cr.' },
          { q: 'FY21', revH: 60, expH: 44, rev: '22,600 Cr.', exp: '15,800 Cr.', np: '2,920 Cr.' },
          { q: 'FY22', revH: 72, expH: 51, rev: '26,100 Cr.', exp: '17,900 Cr.', np: '3,410 Cr.' },
          { q: 'FY23', revH: 85, expH: 58, rev: '29,800 Cr.', exp: '20,100 Cr.', np: '3,860 Cr.' },
          { q: 'FY24', revH: 95, expH: 64, rev: '32,450 Cr.', exp: '21,890 Cr.', np: '4,120 Cr.', highlight: true }
        ]
      },
      {
        title: 'Cash Flow & Balance Sheet',
        metricsLabel: 'Metrics 4/13',
        defaultTooltip: { period: 'Operating CF', rev: '7,420 Cr.', exp: '3,210 Cr.', np: '4,210 Cr.' },
        quarters: [
          { q: 'FY19', revH: 42, expH: 25, rev: '4,200 Cr.', exp: '1,800 Cr.', np: '2,400 Cr.' },
          { q: 'FY20', revH: 48, expH: 28, rev: '4,850 Cr.', exp: '2,100 Cr.', np: '2,750 Cr.' },
          { q: 'FY21', revH: 58, expH: 34, rev: '5,600 Cr.', exp: '2,450 Cr.', np: '3,150 Cr.' },
          { q: 'FY22', revH: 68, expH: 39, rev: '6,350 Cr.', exp: '2,800 Cr.', np: '3,550 Cr.' },
          { q: 'FY23', revH: 80, expH: 44, rev: '7,100 Cr.', exp: '3,050 Cr.', np: '4,050 Cr.' },
          { q: 'FY24', revH: 92, expH: 48, rev: '7,420 Cr.', exp: '3,210 Cr.', np: '4,210 Cr.', highlight: true }
        ]
      }
    ];

    let currentCardIndex = 0;
    const cardTitleEl = $('#gwCardTitle');
    const barsTrackEl = $('#gwBarsTrack');
    const ttHeaderEl = $('#gwTtHeader');
    const revValEl = $('#gwRevVal');
    const expValEl = $('#gwExpVal');
    const npValEl = $('#gwNpVal');
    const metricsPillEl = $('#gwMetricsDropdown');
    const prevBtn = $('#gwDeckPrev');
    const nextBtn = $('#gwDeckNext');

    const renderCard = (index) => {
      const data = cardsData[index];
      if (!data) return;

      if (cardTitleEl) cardTitleEl.textContent = data.title;
      if (metricsPillEl) {
        const textSpan = metricsPillEl.querySelector('span');
        if (textSpan) textSpan.textContent = data.metricsLabel;
      }

      // Reset tooltip
      if (ttHeaderEl) ttHeaderEl.textContent = data.defaultTooltip.period;
      if (revValEl) revValEl.textContent = data.defaultTooltip.rev;
      if (expValEl) expValEl.textContent = data.defaultTooltip.exp;
      if (npValEl) npValEl.textContent = data.defaultTooltip.np;

      // Render Bars
      if (barsTrackEl) {
        barsTrackEl.innerHTML = data.quarters.map((q, i) => `
          <div class="gw-bar-group${q.highlight ? ' active' : ''}" data-idx="${i}" title="${q.q}: Rev ${q.rev}">
            <div class="gw-bar gw-bar-rev" style="height:${q.revH}%"></div>
            <div class="gw-bar gw-bar-exp" style="height:${q.expH}%"></div>
            <div class="gw-bar-profit"></div>
          </div>
        `).join('');

        // Attach hover on bars
        const groups = barsTrackEl.querySelectorAll('.gw-bar-group');
        groups.forEach(g => {
          g.addEventListener('mouseenter', () => {
            groups.forEach(item => item.classList.remove('active'));
            g.classList.add('active');
            const qIdx = parseInt(g.dataset.idx, 10);
            const qItem = data.quarters[qIdx];
            if (qItem) {
              if (ttHeaderEl) ttHeaderEl.textContent = `${qItem.q} Financials`;
              if (revValEl) revValEl.textContent = qItem.rev;
              if (expValEl) expValEl.textContent = qItem.exp;
              if (npValEl) npValEl.textContent = qItem.np;
            }
          });
        });
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + cardsData.length) % cardsData.length;
        renderCard(currentCardIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % cardsData.length;
        renderCard(currentCardIndex);
      });
    }

    // View switchers
    const viewBtns = section.querySelectorAll('.gw-view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      });
    });

    // Initial render
    renderCard(0);

    /* Search Input & Cmd+K Shortcut */
    const searchInput = $('#gwSearchInput');
    const searchPopover = $('#gwSearchPopover');
    const popoverList = $('#gwPopoverList');

    const sampleCompanies = [
      { sym: 'HDFCBANK', name: 'HDFC Bank Ltd', price: '₹708.25', chg: '+2.08%' },
      { sym: 'RELIANCE', name: 'Reliance Industries', price: '₹2,980.00', chg: '+0.74%' },
      { sym: 'TCS', name: 'Tata Consultancy Services', price: '₹2,200.80', chg: '+3.36%' },
      { sym: 'INFY', name: 'Infosys Limited', price: '₹1,037.70', chg: '+0.12%' },
      { sym: 'ICICIBANK', name: 'ICICI Bank Ltd', price: '₹1,248.50', chg: '+0.86%' },
      { sym: 'MARUTI', name: 'Maruti Suzuki India', price: '₹12,450.00', chg: '+0.70%' },
      { sym: 'ASIANPAINT', name: 'Asian Paints Ltd', price: '₹2,840.00', chg: '+0.50%' },
      { sym: 'WIPRO', name: 'Wipro Limited', price: '₹485.30', chg: '+0.66%' },
      { sym: 'BAJAJ-AUTO', name: 'Bajaj Auto Limited', price: '₹9,120.00', chg: '+0.49%' },
      { sym: 'ADANIENT', name: 'Adani Enterprises Ltd', price: '₹3,060.00', chg: '+0.25%' }
    ];

    const renderSuggestions = (query = '') => {
      if (!popoverList) return;
      const q = query.trim().toUpperCase();
      const filtered = q
        ? sampleCompanies.filter(c => c.sym.includes(q) || c.name.toUpperCase().includes(q))
        : sampleCompanies.slice(0, 5);

      if (filtered.length === 0) {
        popoverList.innerHTML = `<div style="padding:10px 16px;font-size:13px;color:rgba(255,255,255,0.45)">No matching companies found for "${query}"</div>`;
        return;
      }

      popoverList.innerHTML = filtered.map(c => `
        <div class="gw-popover-item" data-sym="${c.sym}">
          <div>
            <span class="gw-pop-sym">${c.sym}</span>
            <div class="gw-pop-meta">${c.name}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:13px;font-weight:600">${c.price}</div>
            <div style="font-size:11.5px;color:var(--up)">${c.chg}</div>
          </div>
        </div>
      `).join('');

      popoverList.querySelectorAll('.gw-popover-item').forEach(item => {
        item.addEventListener('click', () => {
          const sym = item.dataset.sym;
          if (searchInput) searchInput.value = sym;
          if (searchPopover) searchPopover.classList.remove('show');
          window.location.href = `analysis.html?sym=${encodeURIComponent(sym)}`;
        });
      });
    };

    if (searchInput && searchPopover) {
      searchInput.addEventListener('focus', () => {
        renderSuggestions(searchInput.value);
        searchPopover.classList.add('show');
      });

      searchInput.addEventListener('input', () => {
        renderSuggestions(searchInput.value);
        searchPopover.classList.add('show');
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchPopover.contains(e.target)) {
          searchPopover.classList.remove('show');
        }
      });
    }

    // Keyboard shortcut Cmd+K or Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  };
  initFinancialGateway();

  /* observe dynamic content once everything is rendered */
  if (document.body.classList.contains('ready')) observe();
})();
