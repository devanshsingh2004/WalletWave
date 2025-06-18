# WalletWave

> **Keep every rupee in view.**  
> WalletWave is a lightweight personal‑finance web app that lets you load cash, pay friends, and track every transaction in real time.

**Live demo:** <https://walletwave-74a65903685b.herokuapp.com/>  
**License:** MIT

---

## ✨ Features

- **Card top‑ups via Stripe** – deposit money instantly with any debit/credit card.  
- **Peer‑to‑peer transfers** – send funds to any verified WalletWave account in one click.  
- **Fund requests** – ask for money; recipients can accept or reject in‑app.  
- **Unified ledger** – every entry is labelled *Deposit*, *Credit*, or *Debit* and shows the reference account/ID.  
- **Real‑time balance & charts** – dashboard updates the moment a transaction posts.  
- **Clean, responsive UI** – React front‑end that works great on mobile and desktop.  

---

## 🏗  Tech stack

| Layer      | Stack                                   |
|------------|-----------------------------------------|
| Front‑end  | React · Context API · CSS Modules       |
| Back‑end   | Node.js · Express · REST API            |
| Payments   | Stripe                                  |
| Auth       | JSON Web Tokens                         |
| Deployment | Heroku                                  |

---

## 🚀 Quick start

```bash
# Clone the repo
git clone https://github.com/devanshsingh2004/WalletWave.git
cd WalletWave

# Install dependencies (root + workspaces)
npm install && npm run bootstrap

# Create environment variables
cp server/.env.example server/.env    # then edit DB_URL, JWT_SECRET, STRIPE_SECRET

# Run client & server together
npm run dev

# The app will be available at http://localhost:3000
```

---

## 📂 Project structure

```
WalletWave/
├── client/          # React SPA
│   └── src/
│       ├── components/
│       ├── pages/
│       └── styles/
├── server/          # Node / Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
└── package.json     # Workspace root
```

---

## 🤝 Contributing

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feature/YourFeature`).  
3. Commit your changes with clear commit messages.  
4. Open a Pull Request against **main**.  

---

## 📜 License

WalletWave is released under the MIT License – see `LICENSE` for details.
