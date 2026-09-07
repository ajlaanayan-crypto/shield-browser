/**
 * ShieldBrowser — Interactive Screen-Share Simulator
 * Dual Mode: "What You See (Your Mac)" vs "What Viewers See (Zoom/Meet)"
 * 1:1 Match with Real ShieldBrowser macOS App UI & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnUser = document.getElementById('sim-tab-user');
  const btnViewer = document.getElementById('sim-tab-viewer');
  const browserWindow = document.getElementById('floating-browser-window');
  
  // Outer simulator slider
  const opacitySlider = document.getElementById('sim-opacity-slider');
  const opacityValue = document.getElementById('sim-opacity-val');

  // Inside-app native slider capsule
  const capsuleSlider = document.getElementById('capsule-opacity-slider');
  const capsulePct = document.getElementById('capsule-opacity-pct');

  // In-app VIP popover
  const vipPill = document.getElementById('browser-vip-pill');
  const vipPopover = document.getElementById('app-vip-popover');

  const viewerNotice = document.getElementById('viewer-stealth-notice');
  const panicNotice = document.getElementById('panic-key-hint');

  if (!browserWindow) return;

  let currentOpacity = 0.94;
  let isViewerMode = false;
  let isPanicHidden = false;

  function setOpacity(val) {
    const num = Math.max(10, Math.min(100, parseInt(val, 10)));
    currentOpacity = num / 100;

    // Update outer slider
    if (opacitySlider) opacitySlider.value = num;
    if (opacityValue) opacityValue.textContent = `${num}%`;

    // Update in-app capsule slider
    if (capsuleSlider) capsuleSlider.value = num;
    if (capsulePct) capsulePct.textContent = `${num}%`;

    // Apply to browser window if not in stealth mode
    if (!isViewerMode && !isPanicHidden) {
      browserWindow.style.opacity = currentOpacity;
    }
  }

  function updateBrowserState() {
    if (isViewerMode || isPanicHidden) {
      browserWindow.style.opacity = '0';
      browserWindow.style.pointerEvents = 'none';
      browserWindow.style.transform = 'scale(0.98)';
      if (vipPopover) vipPopover.classList.remove('open');
      if (viewerNotice) viewerNotice.classList.add('show');
    } else {
      browserWindow.style.opacity = currentOpacity;
      browserWindow.style.pointerEvents = 'auto';
      browserWindow.style.transform = 'scale(1)';
      if (viewerNotice) viewerNotice.classList.remove('show');
    }
  }

  // Mode 1: What You See (Your Mac)
  if (btnUser) {
    btnUser.addEventListener('click', () => {
      isViewerMode = false;
      btnUser.classList.add('active');
      btnViewer.classList.remove('active', 'viewer-active');
      updateBrowserState();
    });
  }

  // Mode 2: What Viewers See (Zoom/Meet Screen Share)
  if (btnViewer) {
    btnViewer.addEventListener('click', () => {
      isViewerMode = true;
      btnViewer.classList.add('viewer-active');
      btnUser.classList.remove('active');
      updateBrowserState();
    });
  }

  // Outer Slider listener
  if (opacitySlider) {
    opacitySlider.addEventListener('input', (e) => {
      setOpacity(e.target.value);
    });
  }

  // Inside-App Native Capsule Slider listener
  if (capsuleSlider) {
    capsuleSlider.addEventListener('input', (e) => {
      setOpacity(e.target.value);
    });
  }

  // Toggle In-App VIP Account Popover
  if (vipPill && vipPopover) {
    vipPill.addEventListener('click', (e) => {
      e.stopPropagation();
      vipPopover.classList.toggle('open');
    });

    // Close popover when clicking anywhere else inside simulator
    browserWindow.addEventListener('click', (e) => {
      if (!vipPopover.contains(e.target) && e.target !== vipPill) {
        vipPopover.classList.remove('open');
      }
    });
  }

  // Panic Key & Live Shortcut Simulation
  window.addEventListener('keydown', (e) => {
    // 1. Instant Summon / Hide: Escape or ⌘ + Shift + B
    if (e.key === 'Escape' || ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === 'KeyB')) {
      isPanicHidden = !isPanicHidden;
      updateBrowserState();
      if (panicNotice) {
        panicNotice.innerHTML = isPanicHidden 
          ? "🚨 <strong>Instant Hide Triggered (⌘ + Shift + B / Esc)!</strong> Window minimized in &lt;10ms. Press again to restore."
          : "⌨️ Press <strong style=\"color: #ffffff;\">⌘ + Shift + B</strong> or <strong style=\"color: #ffffff;\">Esc</strong> to test Instant Panic Hide";
      }
    }

    // 2. Ghost Mode: ⌘ + Shift + H
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === 'KeyH') {
      const chromeArea = browserWindow.querySelector('.native-browser-chrome');
      if (chromeArea) {
        const isHidden = chromeArea.style.display === 'none';
        chromeArea.style.display = isHidden ? '' : 'none';
        if (panicNotice) {
          panicNotice.innerHTML = isHidden 
            ? "👻 <strong>Normal Mode Restored!</strong> Toolbar and omnibox visible."
            : "👻 <strong>Ghost Mode Active (⌘ + Shift + H)!</strong> Toolbar hidden for 100% borderless clean web view.";
        }
      }
    }

    // 3. 36% Stealth Sweet Spot: ⌘ + ⌥ + 6
    if ((e.metaKey || e.ctrlKey) && e.altKey && e.code === 'Digit6') {
      setOpacity(36);
      if (panicNotice) {
        panicNotice.innerHTML = "🎯 <strong>36% Stealth Sweet Spot Locked (⌘ + ⌥ + 6)!</strong> Desktop shines through clearly.";
      }
    }
  });

  // Initial opacity sync
  setOpacity(94);
});
