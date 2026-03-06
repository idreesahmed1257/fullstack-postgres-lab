# Fullstack Postgres Lab

This repository is for **junior developers** to learn full-stack development and practice by building sample projects.

## Purpose

- **Learn** — Explore different tech stacks (Node.js, React, Django, MongoDB, PostgreSQL, TypeScript) through hands-on examples.
- **Practice** — Run, modify, and extend the sample projects to reinforce concepts and build confidence.
- **Reference** — Use the code and structure as a reference when building your own applications.

Each project in this repo is a self-contained sample you can run locally. Check the README inside each project folder for setup and run instructions.

---

## Projects Overview

### BookBazar
Django REST API for a book store. Covers **Django**, **Django REST Framework**, and **Python**: books catalog, orders, reviews, and user accounts. Good for learning REST APIs, models, serializers, and admin.

**Location:** `BookBazar/backend`

---

### MiniStore
Full-stack e-commerce sample (mini store / gift shop).

- **Backend** — Node.js, Express, **Prisma**, **PostgreSQL**. Products, orders, credits, gifts, and auth.
- **Frontend** — **React**, TypeScript, MUI, React Query, Zustand. Browse products, cart, profile, wallet, and auth flows.

**Location:** `MiniStore/backend` and `MiniStore/frontend`

---

### Mongo DB Node API Server
REST API with **Node.js**, **Express**, and **MongoDB** (Mongoose). Simple product CRUD: create, read, update, delete. Includes a Postman collection for testing. Good for learning NoSQL and basic Express APIs.

**Location:** `Mongo DB Node API Server`

---

### Weatherman
**TypeScript** CLI that reads weather data files and generates reports:

- **Extreme values** — Min/max for a given year
- **Average values** — Averages for a given month
- **Chart report** — Comparison/chart data for a given month

Uses the Commander CLI and file parsing. Good for learning CLI tools and TypeScript.

**Location:** `weatherman`

---

### Socket.io Fullstack Setup
Full-stack example of **real-time** communication with **Socket.io**.

- **Backend** — Node.js, Express, **Socket.io** (WebSockets). Handles connections, messages, and broadcast notifications.
- **Frontend** — **React** with **socket.io-client**. Connects to the server and sends/receives real-time messages.

Good for learning WebSockets, real-time events, and client–server bidirectional communication.

**Location:** `socket-io-fullstack-setup/Backend` and `socket-io-fullstack-setup/Frontend`
