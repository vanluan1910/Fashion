# 📦 Frontend Architecture Guide

This project follows a **Feature-based + Layered Architecture**, inspired by **Clean Architecture (Backend)**.

---

# 🧱 Folder Structure Overview

```
src/
 ├── features/
 ├── shared/
 ├── app/
```

---

# 🎯 1. `features/` — Business Modules (Core of the App)

Each folder inside `features/` represents a **business domain/module**.

## Example:

```
features/
 ├── auth/
 ├── employee/
 ├── account/
```

## 📌 Purpose

* Contains **all business logic**
* Fully independent modules
* Can scale or split into micro-frontends

---

## 🔹 Inside each feature

```
auth/
 ├── api/
 ├── components/
 ├── hooks/
 ├── services/
 └── types/
```

### 🧩 `api/`

* Handles **HTTP requests (axios/fetch)**
* No business logic
* Acts as Infrastructure layer

---

### ⚙️ `services/`

* Contains **business logic / use cases**
* Calls API layer
* Can transform data

👉 Equivalent to:

* Backend: Application Layer (UseCases)

---

### 🧠 `hooks/`

* Acts as **ViewModel (MVVM pattern)**
* Manages state + UI logic
* Connects UI ↔ services

---

### 🎨 `components/`

* Pure UI components
* No business logic
* Reusable within feature

---

### 📦 `types/`

* Type definitions / models
* Represents domain data

👉 Equivalent to:

* Backend: Domain Entities

---

# 🌍 2. `shared/` — Reusable Resources

```
shared/
 ├── components/
 ├── utils/
 └── constants/
```

## 📌 Purpose

* Used across multiple features
* No business-specific logic

---

### 🧩 `components/`

* Shared UI (Button, Input, Modal…)
* Design system (e.g. shadcn/ui)

---

### 🛠 `utils/`

* Helper functions
* Formatters, validators, etc.

---

### 🔑 `constants/`

* Global constants
* Enums, config values

---

# 🚀 3. `app/` — Application Core (Setup & Wiring)

```
app/
 ├── store/
 ├── router/
 └── providers/
```

## 📌 Purpose

* Initializes and connects the entire app
* Contains global configuration
* No business logic

---

### 🧠 `store/`

* Global state management
* Auth, theme, global settings

---

### 🧭 `router/`

* Route definitions
* Navigation structure
* Route guards (auth protection)

---

### ⚙️ `providers/`

* Global providers (Dependency Injection)
* Examples:

  * React Query
  * Theme provider
  * Auth provider
  * Toast / Notification

---

# 🔥 Data Flow (Important)

```
UI (components)
   ↓
hooks (ViewModel)
   ↓
services (business logic)
   ↓
api (HTTP calls)
   ↓
Backend (Clean Architecture)
```

---

# 🧠 Architecture Mapping (FE ↔ BE)

| Frontend      | Backend               |
| ------------- | --------------------- |
| types         | Domain                |
| services      | Application (UseCase) |
| api           | Infrastructure        |
| components    | Presentation          |
| app/providers | Dependency Injection  |

---

# ❌ Rules (Important)

* DO NOT put business logic in `components/`
* DO NOT call API directly inside UI
* DO NOT put feature logic inside `app/`
* DO NOT duplicate logic across features

---

# ✅ Best Practices

* Keep each feature independent
* Use hooks as ViewModel
* Keep API layer thin
* Use shared/ for reusable code only
* Follow single responsibility principle

---

# 🎯 Goal

This structure ensures:

* Scalability
* Maintainability
* Clear separation of concerns
* Alignment with Clean Architecture (Backend)

---
