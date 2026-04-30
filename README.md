# David Cuevas - Personal Portfolio

This repository contains the source code for my personal portfolio website, hosted at [https://dcuevasa.github.io](https://dcuevasa.github.io).

The website is built with **React**.

## 🛠️ Local Development

To run this project locally on your machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dcuevasa/dcuevasa.github.io.git
   cd dcuevasa.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## 📦 Deployment

This project is configured to be deployed to **GitHub Pages**. To update the live website with your latest changes, follow these steps:

1. **Commit changes:**
   Ensure all changes are committed to the `main` (or `master`) branch.
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```

2. **Deploy to GitHub Pages:**
   Run the deployment script:
   ```bash
   npm run deploy
   ```
   This command will automatically:
   - Create a production build of the app (in the `build/` folder).
   - Push the build contents to the `gh-pages` branch of your repository.

Once the script finishes, changes should be live at [https://dcuevasa.github.io](https://dcuevasa.github.io) within a few minutes.
