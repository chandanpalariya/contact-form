# Contact Manager

**A simple full‑stack contact manager** built with Node.js, Express, MongoDB (Mongoose) for the backend and React + Vite + Tailwind for the frontend.

---

live link:https://contact-form-u2xv.onrender.com/

## 🚀 Features

- Create, list and delete contacts
- Backend REST API: POST /api/contacts, GET /api/contacts, DELETE /api/contacts/:id
- Simple React UI to add and view contacts
- Uses MongoDB for persistent storage

---

## 📁 Project structure

- `backend/` — Express server and Mongoose models
  - `server.js` — app entry
  - `config/db.js` — MongoDB connection
  - `routes/contactRoutes.js` — API routes
  - `controllers/contactController.js` — CRUD logic
  - `models/Contact.js` — Mongoose schema

- `frontent/` — React + Vite frontend (note the folder name in this project)
  - `src/config/api.js` — base API URL (reads `VITE_API_URL`)
  - `src/components` — UI components for adding / listing contacts

---

## 🛠️ Requirements

- Node.js 18+ (for `node --watch` dev script)
- npm
- MongoDB (local or a hosted MongoDB URI)

---

## ⚙️ Setup & Run (local)

1. Clone the repo and open it:

```bash
git clone url
cd contact
```

2. Backend

```bash
cd backend
npm install
# Create a .env file with your MongoDB URI
# Example: MONGO_URL="mongodb+srv://<user>:<pass>@cluster0.mongodb.net/<db>?retryWrites=true&w=majority"
# Optional: PORT=5000
npm run dev    # run in watch mode
# or: npm start
```

3. Frontend

```bash
cd ../frontent
npm install
# Create a .env with VITE_API_URL if backend runs on a non-default host, e.g. VITE_API_URL=http://localhost:5000
npm run dev    # starts vite dev server
```

Open the site at the URL printed by Vite (usually http://localhost:5173).

---

## 🔌 API

Base: `http://localhost:5000` (or `VITE_API_URL` from frontent `.env`)

- Create contact
  - POST /api/contacts
  - Body (JSON): `{ "name": "...", "phone": "...", "email": "...", "message": "..." }`

- Get contacts
  - GET /api/contacts

- Delete contact
  - DELETE /api/contacts/:id

Example curl:

```bash
# Create
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","phone":"+123456","email":"jane@example.com"}'

# List
curl http://localhost:5000/api/contacts

# Delete
curl -X DELETE http://localhost:5000/api/contacts/<id>
```

---

## ⚠️ Troubleshooting

- "MongoDB connection error" — check `MONGO_URL` in `backend/.env` and network access (Atlas IP whitelist).
- CORS errors — backend already uses `cors()`; ensure frontend `VITE_API_URL` points to backend host and port.
- Port conflicts — change `PORT` in `backend/.env` and update `VITE_API_URL` accordingly.

---

## ✅ Notes & Tips

- Frontend reads the API base from `import.meta.env.VITE_API_URL` (see `frontent/src/config/api.js`).
- Use `npm run build` inside `frontent` for production build and serve static files from any static hosting provider.
- For production, set `MONGO_URL` and `PORT` as environment variables on your server.

---



