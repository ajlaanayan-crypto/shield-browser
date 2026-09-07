# 🛡️ ShieldBrowser for macOS

> **The premier privacy browser for macOS engineered with native Quartz Window Server compositor isolation. 100% excluded from screen-sharing streams in real time.**

[![macOS Version](https://img.shields.io/badge/macOS-12.0%20to%2027.0%2B%20Golden%20Gate-000000?style=for-the-badge&logo=apple&logoColor=white)](https://shieldbrowser.com)
[![Architecture](https://img.shields.io/badge/Architecture-Apple%20Silicon%20(M1--M6)%20%26%20Intel-22c55e?style=for-the-badge&logo=apple&logoColor=white)](https://shieldbrowser.com/download)
[![Privacy](https://img.shields.io/badge/Architecture-Strict%20Zero--Logs-3b82f6?style=for-the-badge)](https://shieldbrowser.com/privacy)
[![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

---

## 🌟 Executive Overview

**ShieldBrowser** is an advanced native macOS browser engineered specifically for confidential research, technical interview preparation, presentation note-taking, and privacy-critical multi-window workflows.

By binding directly to the native macOS Quartz Display Server (`CGWindowSharingType.none`), ShieldBrowser completely excludes its surface buffer from all frame-capture pipelines. While you see your reference notes and documentation in crisp detail, meeting attendees on **Zoom, Google Meet, Microsoft Teams, Discord, Slack, Screenflow, and OBS** see only your clean desktop wallpaper or background applications—with **zero black boxes, zero cutouts, and zero lag**.

---

## ⚡ Key Capabilities

- 🛡️ **Display Server Compositor Isolation:** Communicates directly with macOS Window Server to omit the window buffer from screen capture pipelines. No DRM cutouts or black boxes.
- 👻 **Ghost Mode (`⌘ + Shift + H`):** Strips away all window chrome, titlebars, address bar, and tabs to provide a 100% borderless floating web viewport.
- 🌫️ **36% Opacity Stealth Sweet Spot (`⌘ + ⌥ + 6`):** Scientifically calibrated transparency level where documentation remains sharp and readable to you while background desktop/IDE shines through naturally.
- 🖱️ **Click-Through Mode (`⌘ + Shift + C`):** Mouse clicks pass completely through ShieldBrowser into VS Code, Xcode, or Terminal running underneath. Cancel anytime with `Escape`.
- ⚡ **Element Zap (`⌘ + Shift + E`):** Click to eliminate distracting sidebars, banners, or headers on any website. Restore anytime with `⌘ + Shift + U`.
- 🧠 **Gemini AI Screen Analysis (`⌘ + Shift + G`):** On-demand, private ephemeral context analysis of the active viewport.
- ⌨️ **39 Native Keyboard Shortcuts:** Comprehensive hotkey suite across Core Stealth, Opacity, Browsing, and System controls.
- 🚀 **Safari-Grade WebKit Engine:** Native Apple WebKit framework execution. Cold startup in < 180 ms, idle RAM usage < 85 MB, zero Chromium/Electron bloat.
- 🔒 **Universal Binary (M1–M6 & Intel):** Built as a native Universal Mach-O binary (`arm64` + `x86_64`) running natively on **Apple Silicon M1, M2, M3, M4, M5, and M6** (Base, Pro, Max, and Ultra) and Intel Core, verified on **macOS 12.0 Monterey up to macOS 27.0+ Golden Gate**.
- 🕵️‍♂️ **Strict Zero-Logs Sandboxing:** All history, cookies, session cache, and credentials reside solely inside `~/Library/Containers/com.shieldbrowser.app`. Zero outbound telemetry, zero keyloggers.
- ⏱️ **Transparent Time-Bound Passes:** 6 passes (24 Hours, 3 Days, 7 Days, 1 Month, 3 Months, 1 Year). Activated in-app via UPI / Cards with automatic expiration and **zero recurring auto-renewal surprises**.
- 🎁 **5-Minute Complimentary Hardware Trial:** Unrestricted 5-minute evaluation upon initial launch to test screen share invisibility in a live call before activating any pass.

---

## 📂 Repository Structure

```
shield-browser/
├── index.html              # Modern, responsive landing page + 3D Canvas + 39 Shortcuts Master Table + 10-Item FAQ
├── download.html           # Official Distribution Hub, SHA-256 Checksums & Interactive Gatekeeper Guide
├── pricing.html            # 6 Time-bound Pass Comparison & In-App Purchase Specifications
├── features.html           # Architectural Deep Dive (Quartz, WebKit, Opacity, Zero-Logs)
├── how-it-works.html       # Pipeline Comparison (Standard vs ShieldBrowser) + Interactive Screen Simulator
├── contact.html            # Merchant Support Desk, Hardware Re-Binding & Tiered SLA Matrix (P1–P4)
├── terms.html              # Detailed Terms & Conditions (13 sections)
├── privacy.html            # Comprehensive Zero-Logs Privacy Policy (10 sections)
├── refund-policy.html      # 100% Malfunction Refund Policy & Settlement Timelines (7 sections)
├── shipping.html           # Digital Goods Delivery Policy (< 5s token provisioning)
├── assets/                 # SVGs, application icons, logos & vector graphics
├── css/                    # Modular styles, 120Hz GPU-accelerated card transitions & animations
├── js/                     # Application logic, smooth cursor spotlights, 3D canvas & hotkey filters
├── downloads/              # Official Universal macOS DMG installer bundle
├── sitemap.xml             # Search Engine Optimization sitemap
├── robots.txt              # Crawler access directives
└── README.md               # Project documentation
```

---

## ⌨️ Essential Keyboard Shortcuts Quick Reference

| Shortcut | Action | Description |
|---|---|---|
| `⌘ + Shift + B` | **Instant Summon / Hide** | Toggle ShieldBrowser visibility in under 10 milliseconds. |
| `⌘ + Shift + S` | **Toggle Screen Share Shield** | Kernel-level window isolation ON / OFF switch. |
| `⌘ + Shift + H` | **Toggle Ghost Mode** | Borderless clean web view without toolbars, address bar, or tabs. |
| `⌘ + Shift + C` | **Toggle Click-Through Mode** | Forward mouse clicks through the window to background applications. |
| `Escape` | **Cancel Click-Through** | Restore standard mouse control to ShieldBrowser. |
| `⌘ + ⌥ + 6` | **Lock 36% Opacity** | Set calibrated stealth opacity sweet spot. |
| `⌘ + ⌥ + 0` | **100% Solid Opacity** | Return window to fully opaque standard browser view. |
| `⌘ + ⌥ + Up` | **Increase Opacity (+8%)** | Gradually increase window solidity. |
| `⌘ + ⌥ + Down` | **Decrease Opacity (-8%)** | Gradually increase transparency. |
| `⌘ + Shift + E` | **Element Zap** | Click to hide unwanted webpage banners or sidebars. |
| `⌘ + Shift + U` | **Restore Elements** | Restore all zapped webpage elements on active domain. |
| `⌘ + Shift + G` | **Gemini AI Analysis** | Trigger on-demand ephemeral AI screen analysis. |

*View all 39 shortcuts on the website at [`index.html#shortcuts`](https://shieldbrowser.com/#shortcuts).*

---

## 📥 Installation & Setup

1. **Download:** Grab the latest official bundle [`ShieldBrowser-v1.0.4.dmg`](downloads/ShieldBrowser-v1.0.4.dmg) or via the [MediaFire Mirror](https://www.mediafire.com/file/0jfihittclvhhkl/ShieldBrowser-v1.0.4.dmg/file).
2. **Mount & Copy:** Double-click the `.dmg` and drag `ShieldBrowser.app` into your `/Applications` directory.
3. **Apple Gatekeeper Verification (First Launch):**
   - **Recommended:** Right-click (or `Control`-click) `ShieldBrowser.app` in Applications and select **Open**, then click **Open** in the confirmation dialog.
   - **Alternative:** Go to **System Settings > Privacy & Security**, scroll down to Security, and click **Open Anyway**.
   - **Terminal:** Run `xattr -cr /Applications/ShieldBrowser.app`.
4. **Complimentary Trial:** Launch the app, join a test Zoom/Meet/Teams call, share entire screen, and verify invisibility with a secondary test device.

---

## 🔒 Verification & Security Checksum

Always verify the cryptographic integrity of downloaded installer images against the official SHA-256 hash:

```bash
shasum -a 256 ShieldBrowser-v1.0.4.dmg
```

**Official SHA-256 Checksum:**
```
32bcd7327ebd4f44de15e9a3bc643a1f34604064362eaca860e002741a77083b
```

---

## 📄 License & Legal

- **Software License:** MIT License — see the [LICENSE](LICENSE) file.
- **Terms of Service:** [Terms & Conditions](https://shieldbrowser.com/terms)
- **Privacy Policy:** [Privacy Policy](https://shieldbrowser.com/privacy)
- **Refund Policy:** [Cancellation & Refund Policy](https://shieldbrowser.com/refund-policy)
- **Digital Delivery:** [Digital Goods Delivery Policy](https://shieldbrowser.com/shipping)
- **Customer Support & SLA:** [Contact Us & SLA Matrix](https://shieldbrowser.com/contact)

---

© 2026 ShieldBrowser Technologies. All rights reserved. Universal macOS Binary (Apple Silicon M1–M6 & Intel).
