# 🧠 Pricer — Web App for Option Pricing & Financial Engineering Portfolio

![ESLint](https://github.com/lehazare/Pricer/actions/workflows/lint.yml/badge.svg)
![MarketData CI](https://github.com/lehazare/Pricer/actions/workflows/marketdata-ci.yml/badge.svg)
![Pricer CI](https://github.com/lehazare/Pricer/actions/workflows/pricer.yml/badge.svg)
![Scheduler CI](https://github.com/lehazare/Pricer/actions/workflows/scheduler-ci.yml/badge.svg)
![Deploy VPS CI](https://github.com/lehazare/Pricer/actions/workflows/deploy.yml/badge.svg)

Welcome to **Pricer**, a full-stack web application built to showcase my skills as a **Functional Developer / IT Quant**, specializing in **financial engineering**, **option pricing**, and **algorithmic trading**.

This project is both a **technical portfolio** and a **live pricer** for various financial derivatives, combining clean software design with cutting-edge pricing models and microservice architecture.

---

## 🔍 Overview

The application provides real-time pricing for several types of options, such as:

- Vanilla Options
- Digital Options
- Call Spread Options
- Autocallables
- Asian Options

Each product will be documented with **graphical explanations of the payoffs** and **underlying pricing models**, allowing users to dive into the world of **quantitative finance**.

---

## 🏗️ Architecture

### 🖥️ Frontend
- **React.js** for SPA architecture
- **Chakra UI** for consistent and modern design components

### ⚙️ Backend
- **C# Microservices** hosted in **Docker containers**
- Deployed on a Virtual Private Server (VPS) hosted on OVH
- Pricing logic may later be rewritten in **C++** for performance

### 🔁 Microservices
- Pricing Services per payoff type
- Market Data Service
- Scheduling Service

---

## 📈 Quantitative Finance & Documentation

Each pricing model will be accompanied by:

- 📄 **Dedicated documentation pages** per payoff
- 📊 Graphs illustrating pricing behavior and sensitivities
- 🧠 Theoretical background (BSM, Monte Carlo, Variance Reduction, LSV Buehler, etc.)

---

## 🔧 Infrastructure

| Component         | Tech                                      |
|------------------|-------------------------------------------|
| CI/CD            | GitHub Actions                            |
| Hosting          | Netlify (Frontend)                        |
| DNS + VPS             | OVH                                 |
| Backend Infra    | Docker                        |

---

## 📜 Tech Stack

- **Frontend:** React, Chakra UI
- **Backend:** C#, Docker, Kubernetes
- **CI/CD:** GitHub Actions
- **Deployment:** Netlify, Cloudflare
- **Future Performance Enhancements:** C++ pricing modules

---

## 🎯 Project Goals

- Demonstrate **clean code** and **microservice architecture**
- Showcase **quantitative finance** knowledge through functional documentation and pricing logic
- Provide a live and interactive **pricing application**
- Present my **CV and past projects** as part of the same portfolio

---

## ✅ TODO List

### 🧩 Services to Develop
- [x] **Scheduling** service
- [x] **MarketData** service

### 🚀 CI/CD & Deployment
- [x] Automatic build pipeline
- [x] Push codebase to GitHub
- [ ] Write GitHub-flavored Markdown documentation
- [ ] Trigger deployment according to what directory was pushed in

### ☁️ Infrastructure
- [x] Netlify for static site hosting
- [x] Docker for backend services
- [x] GitHub Actions for CI/CD
- [x] OVH for Cloud (VPS & DNS)

### Features
- [x] Nginx for Reverse Proxy
- [x] Certbot (Let's Encrypt) for https

### 💸 Payoffs to Implement
- [ ] Autocall
- [ ] Asian Option
- [ ] Vanilla Option
- [ ] Digital Option
- [ ] Call Spread
- [ ] Bonds

### 🧠 Pricer Logic
- [ ] One dedicated **document** per pricing type
- [ ] One **switch/router** for payoff logic and rendering

### 📚 Documentation Features
- [ ] Visual illustrations and interactive graphs from APIs
- [ ] Follow reference PDF: BSM, Monte Carlo, Variance Reduction, LSV Buehler, etc.

### 🎨 React UI Design
- [ ] Apply black, pink, and white theme (Visual Studio-style)
- [ ] Use Chakra UI for components (tables, buttons, inputs)
- [ ] Parameter ESLint

### ⚙️ Backend Optimization
- [ ] Port critical pricing logic from C# to **C++** for performance and compare it.

### Testing
- [ ] Unit Testing thanks to NUnit
- [ ] Comparing Results to MarketPriced Options (especially the greeks)

### Notions to introduce
- [ ] Implied Volatility + Smile / Skew
- [ ] Historical Volatility
- [ ] Local Volatility
- [ ] Stochastic Volatility

- [ ] Réduction de Variance
- [ ] Variable Antithétique


---

## 👤 About Me

I'm a **Functional Developer / Quant** passionate about designing robust, clean, and performant financial software. This repository is a reflection of my daily work, combining **finance**, **algorithms**, and **modern development practices**.

Let's price some options 🚀
