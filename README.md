# PulseMetrics 

**PulseMetrics** is a frontend-only analytics dashboard built with **React**, **Vite**, **Tailwind CSS**, and **React Router DOM**.  
This project is designed to be scalable, maintainable, and production-ready with a clean folder structure and Git workflow.

---

## Table of Contents

- [Demo](#demo)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup--installation)  
- [Folder Structure](#folder-structure)  
- [Routing](#routing)  
- [Git Flow](#git-flow)  
- [Next Steps](#next-steps)  

---

## Demo

*Currently in development – this is the initial setup with routing and Tailwind styling.*

---

## Tech Stack

- **React (JavaScript)** – Frontend framework  
- **Vite** – Build tool & dev server  
- **Tailwind CSS** – Utility-first CSS framework  
- **React Router DOM** – Routing library  

---

## Project Structure

```text
src/
├── app/            # Redux store (future)
├── components/     # Reusable UI components
├── features/       # Redux feature slices (future)
├── pages/          # Route-level pages (Home, Analytics, Settings)
├── services/       # API handling (future)
├── hooks/          # Custom hooks
├── layouts/        # Layout components (MainLayout)
├── utils/          # Helpers & constants
├── styles/         # Global styles
# PulseMetrics

##  Setup & Installation

Follow these steps to run **PulseMetrics** locally:

### Clone the repository
```bash
git clone <your-repo-url>
cd pulsemetrics
```
### Install dependencies

```bash
npm install
```

### Run the development server
```bash
npm run dev
```

### License
This project is MIT licensed.
Feel free to use and contribute!
---
---

## Redux Toolkit Integration

PulseMetrics uses **Redux Toolkit** for predictable and scalable state management.

### Store Setup
- Centralized Redux store using `configureStore`
- Feature-based slices for separation of concerns

### Slices Implemented

#### Dashboard Slice
Manages analytics data fetched from GitHub APIs.

```js
dashboard: {
  metrics: null,
  popularRepos: {
    data: [],
    status: "idle",
    error: null
  },
  status: "idle",
  error: null
}
```
