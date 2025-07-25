# 🏠🎨 Rexx — Tokenizing Real-World Assets on the Internet Computer

**Rexx** is a decentralized application (dApp) that brings real-world assets (RWA) like real estate, art, and collectibles onto the blockchain by fractionalizing ownership using the Internet Computer Protocol (ICP).  
The goal is to make investing in high-value physical assets accessible, liquid, and borderless — powered by secure smart contracts (Motoko canisters) and an AI agent for portfolio optimization.

---

## 📌 **Key Features**

- **✅ Wallet-Based Auth:** Users authenticate securely using Internet Identity (II) or NFID.
- **🏘️ Asset Listings:** Create detailed listings with title, description, location, valuation, and images.
- **🪙 Marketplace:** Buy and sell fractional shares of real-world assets.
- **📈 Dynamic Pricing:** Share prices adjust based on supply/demand.
- **📊 Ownership Dashboard:** Track portfolio, asset performance, and transaction history.
- **🤖 AI Agent:** Personalized investment recommendations with optional auto-trading (user-controlled).
- **📱 Future Mobile App:** Built with React Native for on-the-go investing.

---

## ⚙️ **Tech Stack**

| Layer            | Tech                                                          |
| ---------------- | ------------------------------------------------------------- |
| Frontend         | React (JavaScript), Tailwind CSS                              |
| Backend          | Motoko smart contracts (ICP Canisters)                        |
| Auth/Wallet      | Internet Identity (II) / NFID                                 |
| Mobile (Planned) | React Native                                                  |
| AI Agent         | Custom logic (off-chain or integrated Motoko + agent service) |

---

## 🗂️ **Project Structure**

````plaintext
realchain/
 ├── src/
 │   ├── backend/         # Motoko canisters (.mo files)
 │   ├── frontend/        # React app (components, pages, assets)
 │   ├── assets/          # Static files (images, etc.)
 │   ├── .env             # Env variables (e.g., local settings)
 ├── dfx.json             # ICP project config
 ├── README.md            # This file
 ├── package.json         # Node dependencies

Install Dependencies

```bash
npm install
mops install
````

### 4. Deployment

Then, in one terminal window, run:

```bash
dfx start --clean
```

Keep this tab open for reading logs.

Then pull the dependency and deploy the canisters in another window:

```bash
dfx deploy # deploys the backend and frontend canisters
```

```bash
dfx deps pull
dfx deps deploy  # deploys the llm canister
```

### 5. Start the Development Server

You can start the frontend development server with:

```bash
# Just the frontend development server
npm start

```

### 6. Run Tests

```bash
npm test
```

You can also run:

```bash
npm test tests/src/backend.test.ts    # individual test
```
