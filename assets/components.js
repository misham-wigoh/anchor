/**
 * Anchor Capital – Reusable Site Components
 * Defines <site-header> and <site-footer> custom elements
 */
(()=>{
  const NAV_ITEMS = [
    { label: 'Home', href: 'index.html' },
    { label: 'Products', href: 'products.html' },
    { label: 'Screener', href: 'screener.html' },
    { label: 'Analysis', href: 'analysis.html' },
    { label: 'Market Watch', href: 'market-watch.html' },
    { label: 'Insights', href: 'insights.html' },
    { label: 'About', href: 'about.html' }
  ];

  const FOOTER_DATA = {
    tagline: 'Anchoring wealth. Building futures. Research-led investment guidance, market intelligence and disciplined decision-support tools.',
    explore: [
      { label: 'Products', href: 'products.html' },
      { label: 'Screener', href: 'screener.html' },
      { label: 'Analysis', href: 'analysis.html' },
      { label: 'Market Watch', href: 'market-watch.html' },
      { label: 'Insights', href: 'insights.html' }
    ],
    company: [
      { label: 'About us', href: 'about.html' },
      { label: 'Our policy', href: 'about.html#policy' },
      { label: 'Contact', href: 'contact.html' }
    ],
    contact: {
      phone: '+91 90038 13366',
      phoneRaw: 'tel:+919003813366',
      email: 'rengasamyperumal57@gmail.com',
      address: 'F2, Lakshmi Home, No. 7, Kannan Nagar C, Camp Road, Selaiyur, Chennai – 600073'
    },
    disclaimer: '© 2026 Anchor Capital · P. Rengasamy, Sharekhan Authorised Person. Research and information only; no automatic order placement is available on this website. Market investments are subject to risk. Market figures on this mockup are a sample snapshot for design review, not live quotes.'
  };

  function getCurrentPage(el) {
    const attr = el.getAttribute('current');
    if (attr) return attr;
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;

      const cur = getCurrentPage(this);
      const isCur = (href) => {
        if (cur === href) return true;
        if ((cur === '' || cur === 'index.html') && href === 'index.html') return true;
        return false;
      };

      const navLinks = NAV_ITEMS.map(item => {
        const active = isCur(item.href);
        return `<li><a class="link" href="${item.href}"${active ? ' aria-current="page"' : ''}>${item.label}</a></li>`;
      }).join('');

      const contactActive = isCur('contact.html');

      this.innerHTML = `
<div class="risk" role="note">Research and information only. Market investments are subject to risk. No automatic order placement is available on this website.</div>
<header class="nav" id="nav"><div class="wrap nav-in">
  <a href="index.html" class="brand" aria-label="Anchor Capital home"><img src="public/Anchor.png" alt="Anchor Capital" onerror="this.outerHTML='<span>ANCHOR<small>CAPITAL</small></span>'"></a>
  <nav aria-label="Primary"><ul id="menu">${navLinks}<li><a class="btn btn-gold" href="contact.html" style="min-height:44px;padding:0 20px;margin-left:8px"${contactActive ? ' aria-current="page"' : ''}>Contact</a></li></ul></nav>
  <button class="burger" id="burger" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span></button>
</div></header>`;

      this.bindEvents();
    }

    bindEvents() {
      const nav = this.querySelector('#nav');
      const burger = this.querySelector('#burger');
      const menu = this.querySelector('#menu');
      if (!burger || !menu || burger.__init) return;
      burger.__init = true;

      const closeMenu = () => {
        if (menu.classList.contains('open')) {
          menu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-label', 'Open menu');
        }
      };

      burger.onclick = (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle('open');
        burger.setAttribute('aria-expanded', isOpen);
        burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      };

      menu.addEventListener('click', (e) => {
        if (e.target.closest('a')) closeMenu();
      });

      document.addEventListener('click', (e) => {
        if (menu.classList.contains('open') && nav && !nav.contains(e.target)) {
          closeMenu();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
          closeMenu();
          burger.focus();
        }
      });
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this.__rendered) return;
      this.__rendered = true;

      const exploreLinks = FOOTER_DATA.explore.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('');
      const companyLinks = FOOTER_DATA.company.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('');

      this.innerHTML = `
<footer><div class="wrap">
  <div class="f-grid">
    <div>
      <a href="index.html" class="brand"><img src="public/Anchor.png" alt="Anchor Capital" onerror="this.outerHTML='<span>ANCHOR<small>CAPITAL</small></span>'"></a>
      <p style="margin-top:14px;max-width:320px">${FOOTER_DATA.tagline}</p>
    </div>
    <div>
      <h4>Explore</h4>
      <ul>${exploreLinks}</ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>${companyLinks}</ul>
    </div>
    <div>
      <h4>Contact</h4>
      <ul>
        <li><a href="${FOOTER_DATA.contact.phoneRaw}">${FOOTER_DATA.contact.phone}</a></li>
        <li><a href="mailto:${FOOTER_DATA.contact.email}">${FOOTER_DATA.contact.email}</a></li>
        <li>${FOOTER_DATA.contact.address}</li>
      </ul>
    </div>
  </div>
  <p class="f-bot">${FOOTER_DATA.disclaimer}</p>
</div></footer>
<div class="sticky-cta" id="sticky"><a class="btn btn-gold" href="contact.html">Talk to Anchor Capital</a></div>`;
    }
  }

  if (!customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
  }
  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }
})();
