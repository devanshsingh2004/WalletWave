
# WalletWave 💸
*Keep every rupee in view.*

WalletWave is a lightweight, mobile‑first personal‑finance web app that lets you **load cash, pay friends, and track every transaction in real time**.

[Live demo](https://walletwave-74a65903685b.herokuapp.com/) · MIT License

---

## ✨ Features
- **Instant card top‑ups** via Stripe  
- **Peer‑to‑peer transfers**—send money to any verified account in one click  
- **Fund requests**—ask for money; recipients can accept or reject in‑app  
- **Unified ledger**—every entry is labelled *Deposit*, *Credit*, or *Debit* with reference details  
- **Real‑time dashboard**—balance and charts update the moment a transaction posts  
- **Clean, responsive UI**—works great on mobile & desktop  

---

## 🏗 Tech Stack

| Layer        | Stack                                                                                           |
|--------------|-------------------------------------------------------------------------------------------------|
| Front‑end    | React 18 · Redux Toolkit · Ant Design                                                           |
| Back‑end     | Node 20 · Express · REST API · JWT                                                               |
| Database     | MongoDB Atlas                                                                                   |
| Payments     | Stripe (webhooks)                                                                               |
| DevOps       | Docker & Docker Compose · GitHub Actions CI (Node build + container build)                      |
| Deployment   | Heroku (legacy buildpack) or Container Registry · Vercel (preview)                               |

---

## 🚀 Quick Start (Docker Compose)

```bash
# 1. Clone the repo
git clone https://github.com/devanshsingh2004/WalletWave.git
cd WalletWave

# 2. Create environment variables
cp .env.example .env        # then fill MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY

# 3. Start dev stack (hot‑reload)
docker compose up --build

#   Front‑end: http://localhost:3000
#   API      : http://localhost:5000
```

### Production build

```bash
docker compose --profile prod up --build -d
# React served by Nginx at http://localhost:8080
```

---

## 🔑 Environment Variables

| Key                     | Description                        |
|-------------------------|------------------------------------|
| `MONGO_URI`             | MongoDB connection string          |
| `JWT_SECRET`            | Secret used for JWT signing        |
| `STRIPE_SECRET_KEY`     | Stripe secret used for payments    |

Example template: **`.env.example`** (committed).

---

## 📂 Project Structure

```
WalletWave/
├─ client/           # React SPA
│  └─ src/
│     ├─ components/
│     ├─ pages/
│     └─ styles/
├─ server/           # Node / Express API
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ utils/
├─ Dockerfile.api
├─ client/Dockerfile
├─ docker-compose.yml
└─ package.json      # Workspace root
```

---

## 🤖 Continuous Integration

GitHub Actions workflow `.github/workflows/ci.yml` runs on every push / PR:

1. Installs dependencies with `npm ci` (root + client)  
2. Builds the React bundle (`npm run build --prefix client`)  
3. Runs backend tests (if present)  
4. (Prod only) builds Docker images with `docker compose --profile prod build`

---

## 🤝 Contributing

1. **Fork** the repository  
2. Create a feature branch: `git checkout -b feature/YourFeature`  
3. Commit your changes with clear messages  
4. Open a **Pull Request** against `main`

---

## 📝 License

WalletWave is released under the MIT License — see `LICENSE` for details.
