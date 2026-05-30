# Amigurumis JGC

Tienda online de amigurumis tejidos a mano. Catálogo dinámico con filtros, pedidos personalizados y contacto directo por WhatsApp.

## Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend:** NestJS + TypeORM + SQLite (better-sqlite3)
- **Tests:** Jest + Supertest (E2E)

## Inicio rápido

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El backend corre en `http://localhost:3000` y el frontend en `http://localhost:5173`.

## API

| Método | Endpoint               | Descripción                     |
| ------ | ---------------------- | ------------------------------- |
| GET    | /api/categories        | Lista de categorías             |
| POST   | /api/categories        | Crear categoría                 |
| GET    | /api/products          | Productos activos (filtro ?categoryId=) |
| GET    | /api/products/:id      | Detalle de producto             |
| POST   | /api/custom-orders     | Crear pedido personalizado      |
| GET    | /api/custom-orders     | Listar pedidos                  |

## Estructura

```
backend/           API REST con NestJS
├── src/
│   ├── categories/   CRUD de categorías
│   ├── products/     CRUD de productos
│   └── custom-orders/ Pedidos personalizados
└── test/             Tests E2E

frontend/          SPA con React + Vite
├── src/
│   ├── pages/       Home, Catálogo, Producto, Pedido
│   ├── components/  Header, Layout, UI components
│   └── services/    Cliente HTTP
└── docs/            Assets de diseño
```
