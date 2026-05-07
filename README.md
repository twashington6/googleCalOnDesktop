# Google Calendar Desktop Widget

A lightweight, always-on-top desktop widget that displays Google Calendar in a transparent, frameless overlay — built with Electron.

![Platform](https://img.shields.io/badge/platform-Windows-blue)
![Electron](https://img.shields.io/badge/built%20with-Electron-47848F)

---

## Features

- Transparent, frameless overlay that sits on top of other windows
- Persistent Google login across sessions
- Adjustable opacity via keyboard shortcuts
- Toggle window frame on/off
- Always-on-top positioning

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Up` | Increase opacity |
| `Ctrl + Down` | Decrease opacity |
| `Ctrl + Right` | Toggle window frame on/off |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/twashington6/googleCalOnDesktop.git
   cd googleCalOnDesktop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```

---

## Building a Distributable

To package the app into a standalone executable, use [electron-builder](https://www.electron.build/) or [electron-forge](https://www.electronforge.io/).

### With electron-builder

1. Install electron-builder:
   ```bash
   npm install --save-dev electron-builder
   ```

2. Add a build script to your `package.json`:
   ```json
   "scripts": {
     "start": "electron .",
     "build": "electron-builder"
   },
   "build": {
     "appId": "com.yourname.googlecalendarwidget",
     "win": {
       "target": "nsis"
     }
   }
   ```

3. Build:
   ```bash
   npm run build
   ```

The distributable will appear in the `dist/` folder.

---

## Project Structure

```
GoogleCalendarWidget/
├── main.js          # Main Electron process
├── package.json     # Project config and dependencies
└── README.md
```

---

## Notes

- Your Google account session is saved locally using Electron's `persist:google_calendar` partition, so you won't need to log in every time.
- The app launches frameless and semi-transparent by default. Use `Ctrl+Right` to add a draggable frame if you need to reposition it.
- Default window position is set near the right side of a 1080p display — you can adjust `winBounds` in `main.js` to match your setup.
