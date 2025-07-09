# Hierarchical Table React App

A hierarchical table built with React, Vite, and Tailwind CSS.

## 🚀 Live Demo

View the deployed app here: [https://haidarali751.github.io/hierarchical-table-react-app/](https://haidarali751.github.io/hierarchical-table-react-app/)

## 🛠️ Development

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```

## 📦 Build for production
```bash
npm run build
```

## 🌐 Deploy to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

### 1. Update config files
- In `package.json`, set:
  ```json
  "homepage": "https://haidarali751.github.io/hierarchical-table-react-app/"
  ```
- In `vite.config.ts`, set:
  ```js
  base: '/hierarchical-table-react-app/',
  ```

### 2. Deploy
```bash
npm run deploy
```
This will build the app and publish it to the `gh-pages` branch.

### 3. GitHub Pages Settings
- Go to your repository on GitHub
- Settings → Pages
- Set source to `gh-pages` branch and `/root` folder (if prompted)

Your site will be available at the URL above.

## 🧰 Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jotai](https://jotai.org/) (state management)

---

Feel free to fork, contribute, or open issues!
