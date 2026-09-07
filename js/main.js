/**
 * ShieldBrowser — Main Application Script
 * Global Navigation, 3D Tilt Interaction, Checksum Copier & Scroll Revealer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when link is clicked
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Buttery-Smooth Interactive Card Spotlight Glow (Zero Glitch / 120Hz Hardware Accelerated)
  const glowCards = document.querySelectorAll(
    '.tilt-card, .feature-card, .pricing-card, .step-card, .compat-card, .tutorial-card, .deep-dive-card, .pipeline-card'
  );

  glowCards.forEach(card => {
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          ticking = false;
        });
        ticking = true;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });

  // 3. One-Click SHA-256 Checksum Copier
  const copyBtns = document.querySelectorAll('.btn-copy-checksum');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const checksumText = btn.getAttribute('data-checksum') || "32bcd7327ebd4f44de15e9a3bc643a1f34604064362eaca860e002741a77083b";
      navigator.clipboard.writeText(checksumText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `✓ Copied SHA-256!`;
        btn.style.borderColor = 'var(--accent-emerald)';
        btn.style.color = 'var(--text-emerald)';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2200);
      }).catch(err => {
        console.error("Clipboard copy failed:", err);
      });
    });
  });

  // 4. Scroll Reveal IntersectionObserver Fallback
  if (!window.CSS || !CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // 5. Interactive Keyboard Shortcuts Filter & Live Search
  const shortcutTabs = document.querySelectorAll('.shortcut-tab');
  const shortcutSearch = document.getElementById('shortcut-search');
  const shortcutRows = document.querySelectorAll('#shortcut-table tbody tr');

  let activeCategory = 'all';

  function filterShortcuts() {
    const query = (shortcutSearch ? shortcutSearch.value.trim().toLowerCase() : '');
    
    shortcutRows.forEach(row => {
      const category = row.getAttribute('data-category') || '';
      const keywords = (row.getAttribute('data-keywords') || '').toLowerCase();
      const text = row.textContent.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = !query || text.includes(query) || keywords.includes(query);

      if (matchesCategory && matchesSearch) {
        row.classList.remove('hidden-row');
      } else {
        row.classList.add('hidden-row');
      }
    });
  }

  if (shortcutTabs.length > 0) {
    shortcutTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        shortcutTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.getAttribute('data-category') || 'all';
        filterShortcuts();
      });
    });
  }

  if (shortcutSearch) {
    shortcutSearch.addEventListener('input', filterShortcuts);
  }
});

