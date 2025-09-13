# Spy Cats Frontend

This repository contains the frontend for the **Spy Cats** project built with **React / Next.js**. It provides the user interface for managing cats, missions, and targets.

---

## Requirements

- Node.js 18+ (or the version supported by your project)
- npm (comes with Node.js)
- make (for makefile setup of the project)
- Make sure the backend is running to interact with the API.

---

## Setup

Install all dependencies:

```bash
make setup

```

Run the following command to run the project:

```bash
make run
```

Here's a table describing your Makefile commands for the frontend:
| Command | Description |
| ------------- | ------------------------------------------------------------------ |
| `make setup` | Install all npm dependencies for the frontend. |
| `make dev` | Start the development server (`npm run dev`) for live development. |
| `make build` | Build the frontend for production (`npm run build`). |
| `make lint` | Check code formatting using Prettier (`npx prettier --check`). |
| `make format` | Automatically format code using Prettier (`npx prettier --write`). |
