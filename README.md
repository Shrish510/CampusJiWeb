# CampusJi App

A modern React + Capacitor mobile application for the CampusJi portal.

## 📱 Features
*   **Mobile Ready:** Built with Capacitor for Android.
*   **Web Ready:** Compatible with GitHub Pages.
*   **Modern Stack:** React 18, Vite, ESLint, Prettier.
*   **Legacy Support:** Original static site preserved in `_legacy/`.

## 🛠 Project Structure
*   `src/`: Source code (React components, pages, styles).
*   `android/`: Native Android project.
*   `dist/`: Production build artifacts.
*   `_legacy/`: Archived original HTML/CSS/JS files.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Android Studio (for mobile build)

### Web Development
```bash
npm install
npm run dev
```

### Mobile Development
```bash
# Sync web assets to Android project
npm run build
npx cap sync

# Open in Android Studio
npx cap open android
```

### Building for Production
```bash
npm run build
```
