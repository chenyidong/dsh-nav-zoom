window.__ModuleLoader__.load({
  id: 'dsh-topnav-unifier',
  factory: () => {
    const module = { exports: {} };

    const STORAGE_KEY = 'dsh-topnav-unifier:folded';

    function isFolded() {
      try { return localStorage.getItem(STORAGE_KEY) === 'folded'; } catch (e) { return false; }
    }

    function setFolded(v) {
      try { localStorage.setItem(STORAGE_KEY, v ? 'folded' : 'expanded'); } catch (e) {}
    }

    function findPanelList() {
      return (
        document.querySelector('nav[class*="panelList"]') ||
        document.querySelector('[data-slot="sidebar.panellist"]') ||
        document.querySelector('[data-testid="panel-list"]') ||
        document.querySelector('nav[aria-label*="panel" i]') ||
        document.querySelector('[class*="panel-list" i]') ||
        document.querySelector('[class*="panellist" i]') ||
        document.querySelector('[class*="nav-list" i]') ||
        document.querySelector('[class*="navList" i]')
      );
    }

    function findFooterActions() {
      return (
        document.querySelector('[data-slot="sidebar.footer.action"]') ||
        document.querySelector('[data-testid="footer-actions"]') ||
        document.querySelector('[class*="footer-action" i]') ||
        document.querySelector('[class*="footerAction" i]') ||
        document.querySelector('[class*="footer-actions" i]')
      );
    }

    const css = `
/* ===== dsh-topnav-unifier: merged panel list ===== */
nav[class*="panelList"] { position: relative; }
nav[class*="panelList"][data-dsh-topnav-folded="true"] {
  display: grid;
  grid-template-columns: repeat(auto-fit, 36px);
  align-items: center;
  align-content: start;
  justify-content: space-evenly;
  column-gap: 0;
  min-width: 0;
  padding-bottom: 24px;
}
nav[class*="panelList"][data-dsh-topnav-folded="true"] > button[class*="panelRow"] {
  width: 36px;
  min-width: 36px;
  padding-inline: 8px;
  justify-content: center;
}
nav[class*="panelList"][data-dsh-topnav-folded="true"] > button[class*="panelRow"] [class*="panelTitle"] { display: none; }
nav[class*="panelList"][data-dsh-topnav-folded="true"] > button[class*="panelRow"] [class*="panelGlyph"] { flex: none; }
nav[class*="panelList"][data-dsh-topnav-folded="true"] > button[data-dsh-topnav-footer] > :not([class*="panelGlyph"]) { display: none; }
nav[class*="panelList"] > button[class*="panelRow"] > [class*="panelGlyph"] svg { width: 16px; height: 16px; flex: none; }
nav[class*="panelList"] [data-dsh-topnav-toggle] {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
nav[class*="panelList"] [data-dsh-topnav-toggle]::before,
nav[class*="panelList"] [data-dsh-topnav-toggle]::after {
  content: "";
  flex: 1 1 0;
  height: 0.5px;
  background: currentColor;
  opacity: .16;
}
nav[class*="panelList"] [data-dsh-topnav-toggle]::before { mask-image: linear-gradient(to right, transparent, #000 22%); }
nav[class*="panelList"] [data-dsh-topnav-toggle]::after { mask-image: linear-gradient(to left, transparent, #000 22%); }
nav[class*="panelList"] [data-dsh-topnav-toggle]:hover::before,
nav[class*="panelList"] [data-dsh-topnav-toggle]:hover::after { opacity: .3; }
nav[class*="panelList"] [data-dsh-topnav-toggle]:focus-visible { outline: 2px solid currentColor; outline-offset: -2px; }
nav[class*="panelList"] [data-dsh-topnav-toggle] svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 200ms ease; }
nav[class*="panelList"][data-dsh-topnav-folded="false"] [data-dsh-topnav-toggle] svg { transform: rotate(180deg); }

/* ===== dsh-topnav-unifier: footer rows alignment ===== */
nav[class*="panelList"] { padding-bottom: 28px !important; }
nav[class*="panelList"] > [data-dsh-topnav-footer] {
  height: 36px !important;
  min-height: 36px !important;
  padding: 0 10px !important;
  margin: 0 !important;
  justify-content: flex-start !important;
  align-items: center !important;
  text-align: left !important;
  box-sizing: border-box !important;
  border: 0 !important;
  background: transparent !important;
  gap: 10px !important;
  display: flex !important;
  flex-direction: row !important;
}
nav[class*="panelList"] > [data-dsh-topnav-footer] [class*="panelGlyph"] {
  flex: 0 0 16px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 16px !important;
  height: 16px !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
}
nav[class*="panelList"] > [data-dsh-topnav-footer] [class*="panelGlyph"] svg {
  width: 16px !important;
  height: 16px !important;
  flex: none !important;
  max-width: 16px !important;
  max-height: 16px !important;
  display: block !important;
}
nav[class*="panelList"] > [data-dsh-topnav-footer] [class*="panelTitle"] {
  font-size: inherit !important;
  line-height: 1.2 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  padding: 0 !important;
  margin: 0 !important;
}
`;

    function createToggleIcon() {
      const wrap = document.createElement('span');
      wrap.setAttribute('aria-hidden', 'true');
      wrap.style.display = 'inline-flex';
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', 'M5 9l7 7 7-7');
      svg.appendChild(path);
      wrap.appendChild(svg);
      return wrap;
    }

    function apply(ctx) {
      ctx.effect(() => {
        const style = document.createElement('style');
        style.setAttribute('data-dsh-topnav', 'css');
        style.textContent = css;
        document.head.appendChild(style);
        return () => style.remove();
      }, 'dsh-topnav-unifier: styles');

      ctx.effect(() => {
        const managed = new Set();

        function createToggle(nav) {
          const existing = nav.querySelector(':scope > [data-dsh-topnav-toggle]');
          if (existing) return existing;
          const button = document.createElement('button');
          button.type = 'button';
          button.setAttribute('data-dsh-topnav-toggle', '');
          button.setAttribute('aria-expanded', String(!isFolded()));
          button.setAttribute('aria-label', '折叠/展开导航');
          button.appendChild(createToggleIcon());
          button.addEventListener('click', () => {
            const next = !isFolded();
            setFolded(next);
            nav.setAttribute('data-dsh-topnav-folded', String(next));
            button.setAttribute('aria-expanded', String(!next));
          });
          nav.appendChild(button);
          return button;
        }

        const DEFAULT_GLYPH_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Zm6 0a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Zm6 0a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Z" fill="currentColor"/></svg>';

        function mergeFooterInto(nav) {
          const footer = findFooterActions();
          if (!footer) return;
          const items = Array.from(footer.children);
          for (const item of items) {
            if (item.hasAttribute('data-dsh-topnav-merged')) continue;
            item.setAttribute('data-dsh-topnav-merged', '');
            item.setAttribute('data-dsh-topnav-footer', '');
            if (!item.classList.contains('panelRow')) item.classList.add('panelRow');

            // Canonical label: aria-label > title > cleaned textContent (first non-empty candidate).
            let label = item.getAttribute('aria-label') || item.getAttribute('title') || '';
            if (!label.trim()) {
              const texts = [];
              for (const node of item.querySelectorAll('*')) {
                if (!node.querySelector('svg') && node.children.length === 0 && node.textContent.trim()) texts.push(node.textContent.trim());
              }
              label = texts[0] || item.textContent.trim().replace(/\s+/g, ' ');
            }
            label = label.replace(/\s+/g, ' ').trim();

            // Grab the first svg before wiping children.
            const svg = item.querySelector('svg');

            // Rebuild the item so it holds exactly one glyph + one label.
            while (item.firstChild) item.removeChild(item.firstChild);
            const glyph = document.createElement('span');
            glyph.className = 'panelGlyph';
            glyph.setAttribute('data-dsh-glyph', '');
            glyph.setAttribute('aria-hidden', 'true');
            if (svg) glyph.appendChild(svg);
            else glyph.innerHTML = DEFAULT_GLYPH_SVG;
            item.appendChild(glyph);

            const title = document.createElement('span');
            title.className = 'panelTitle';
            title.textContent = label || item.getAttribute('aria-label') || '条目';
            item.appendChild(title);

            if (item.parentNode !== nav) nav.appendChild(item);
          }
          if (footer.children.length === 0) footer.style.display = 'none';
          else footer.style.display = '';
        }

        function sync() {
          for (const nav of managed) {
            if (!nav.isConnected) { nav.removeAttribute('data-dsh-topnav-folded'); managed.delete(nav); }
          }
          const nav = findPanelList();
          if (!nav) return;
          if (!managed.has(nav)) managed.add(nav);
          mergeFooterInto(nav);
          const folded = isFolded();
          nav.setAttribute('data-dsh-topnav-folded', String(folded));
          const toggle = createToggle(nav);
          toggle.setAttribute('aria-expanded', String(!folded));
        }

        sync();
        let pending = null;
        const observer = new MutationObserver(() => {
          if (pending !== null) return;
          pending = window.setTimeout(() => { pending = null; sync(); }, 0);
        });
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

        return () => {
          observer.disconnect();
          if (pending !== null) window.clearTimeout(pending);
          for (const nav of managed) {
            nav.removeAttribute('data-dsh-topnav-folded');
            const toggle = nav.querySelector(':scope > [data-dsh-topnav-toggle]');
            if (toggle) toggle.remove();
          }
        };
      }, 'dsh-topnav-unifier: merged panel list');
    }

    module.exports.apply = apply;
    module.exports.name = 'dsh-topnav-unifier-client';
    return module.exports;
  }
});
