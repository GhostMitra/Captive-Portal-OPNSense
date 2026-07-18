# Cyberpunk 2077 Wireframe Captive Portal for OPNsense

A high-tech, responsive, Cyberpunk 2077-inspired Captive Portal template designed for **OPNsense** firewalls using **React**, **Vite**, **Tailwind CSS**, and precision **Chamfer Notch UI Geometry**.

---

## ✨ Key Features

- ⚡ **Cyberpunk 2077 Notch Design System**: 
  - Precision $45^\circ$ chamfer cut notched corners on cards, input textboxes, buttons, alerts, badges, and modals.
  - Aligned $2\text{px}$ wireframe borders with zero geometry distortion or clipping glitches.
  - Hard wireframe aesthetic with custom HUD telemetry indicators.
- 🌓 **Synchronized Light & Dark Mode**:
  - Full theme switching with automatic system preference detection (`prefers-color-scheme`) and `localStorage` persistence.
  - High-contrast OLED Pitch Black and Pure White wireframe color palettes.
- 🚨 **Vibrant Cyberpunk Red Error System**:
  - Custom non-intrusive validation replacing ugly HTML5 browser tooltips.
  - Dynamic red notched highlight borders (`bg-destructive`) and red label indicators on required field validation failure.
- 🔑 **Authentication Support**:
  - **User & Voucher Account**: Standard Username/Passcode input with toggleable passkey visibility.
  - **AUP / Terms of Service**: Interactive acceptance checkbox (unchecked by default) with clickable terms modal dialog.
- ⏱️ **Active Session Telemetry**:
  - Real-time countdown session timer.
  - Downloaded (RX) & Uploaded (TX) telemetry statistics in MB/GB.
  - One-click disconnect session handler.
- 📦 **Single-File Standalone Export**:
  - Inlines JS and CSS into a single `index.html` ready for OPNsense template upload.

---

## 📁 Project Structure

```
.
├── opnsense-template/
│   └── index.html             # Single-file bundled HTML ready for OPNsense upload
├── src/
│   ├── components/
│   │   ├── ui/                # Cyberpunk UI Primitives (Button, Input, Card, Alert, Badge, Dialog)
│   │   ├── LoginCard.jsx      # Authentication form with notch inputs & validation
│   │   ├── StatusCard.jsx     # Active session dashboard & telemetry HUD
│   │   ├── NetworkInfo.jsx    # Client IP, MAC & Zone telemetry bar
│   │   ├── Navbar.jsx         # Header & synchronized theme toggle
│   │   ├── TermsModal.jsx     # AUP & Terms of Service modal
│   │   └── FaqModal.jsx       # System help & diagnostics modal
│   ├── lib/
│   │   ├── opnsense.js        # OPNsense API client & context parser
│   │   ├── mockApi.js         # Local dev simulator
│   │   └── utils.js           # Tailwind class merger (cn)
│   ├── App.jsx                # Main layout & theme controller
│   └── index.css              # Cyberpunk notch clip-paths & HSL color tokens
├── scripts/
│   └── bundle-singlefile.js   # Single-file HTML inlining script
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`. In local dev mode, the portal simulates OPNsense REST API authentication and network status.

---

## 📦 Building for OPNsense Deployment

To compile and bundle into a single standalone file for OPNsense:

```bash
npm run build
npm run package
```

This generates the self-contained template at `opnsense-template/index.html`.

---

## 🌐 OPNsense Firewall Deployment

### Step 1: Upload Template
1. Log into your **OPNsense Web GUI**.
2. Navigate to **Services → Captive Portal → Administration**.
3. Select the **Templates** tab.
4. Click the **+** (Create Template) button.
5. Name the template (e.g. `Blackwall-Ghost`).
6. Upload `opnsense-template/index.html`.
7. Click **Save**.

### Step 2: Assign Template to Zone
1. Go to **Services → Captive Portal → Configuration**.
2. Select your active Captive Portal zone.
3. Set **Template** to `Blackwall-Ghost`.
4. Click **Save** and **Apply Changes**.

---

## 🔧 OPNsense API Integration

The portal integrates with standard OPNsense REST API endpoints:
- **Logon**: `POST /api/captiveportal/access/logon/<zoneid>/`
- **Logout**: `POST /api/captiveportal/access/logout/<zoneid>/`
- **Status**: `GET /api/captiveportal/access/status/<zoneid>/`

If JavaScript is disabled on client devices, an HTML fallback form submits directly via POST to `$PORTAL_ACTION$`.
