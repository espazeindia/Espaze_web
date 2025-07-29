# Espaze Web Frontend

Welcome to the **Espaze Web** frontend repository – the client-side application for **Espaze**, a modern e-commerce platform that simplifies fulfillment for small sellers through virtual warehousing and smart logistics.

This project is built using **React.js** with a focus on modular design, responsive UI, and smooth integration with the Espaze backend.

---

## 🛠️ Tech Stack

- **React.js**
- **React Router**
- **Axios**
- **Tailwind CSS** / CSS Modules (depending on your setup)
- **Context API / Redux** (if state management is used)

---

## 🧑‍💻 Local Setup Guide

Follow these steps to run the frontend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/espazeindia/Espaze_web.git
cd Espaze_web
```

### 2. Install Dependencies

```bash
npm install
```

or if you're using yarn:

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

> Replace the base URL if your backend is hosted elsewhere.

### 4. Run the App

```bash
npm start
```

or

```bash
yarn start
```

The application will run on `http://localhost:3000` by default.

---

## 📁 Project Structure

```
Espaze_web/
│
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Page-level components
│   ├── services/           # API calls (Axios)
│   ├── context/            # Global state (if applicable)
│   ├── App.js              # App entry point
│   ├── index.js            # Main render
│   └── assets/             # Images, icons, etc.
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

## 🔌 API Integration

Make sure your backend is running on the URL specified in `.env` under `REACT_APP_API_BASE_URL`. This is used by Axios to send requests to your server.

---

## 📦 Deployment

To build the app for production:

```bash
npm run build
```

This will create an optimized production build in the `build/` folder.

---
