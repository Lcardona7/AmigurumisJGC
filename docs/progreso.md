# Progreso del Proyecto - Amigurumis JGC

## Backend (NestJS + TypeORM + SQLite)

### Infraestructura
- Proyecto NestJS con TypeScript, compilación y build funcionando
- Base de datos SQLite con better-sqlite3 via TypeORM (synchronize: true)
- CORS habilitado para localhost:5173
- Prefijo global `/api`
- ValidationPipe global con transform y whitelist
- Servicio de archivos estáticos para uploads

### Módulo Categories
- CRUD completo (GET, POST, GET/:id, PATCH/:id, DELETE/:id)
- Entidad: id, name (unique), slug (unique), createdAt, updatedAt
- DTOs de creación y actualización con class-validator

### Módulo Products
- CRUD completo (GET, POST, GET/:id, PATCH/:id, DELETE/:id)
- Filtro por categoryId vía query param en GET
- Filtro `isAvailable: true` en GET público
- Relación ManyToOne con Category
- Entidad: id, title, description, price, images (JSON array), isAvailable, categoryId, createdAt, updatedAt
- DTOs con validación (title obligatorio, price >= 0, etc.)

### Módulo CustomOrders
- POST con file upload (FileInterceptor, multer, límite 5MB, solo imágenes)
- GET para listar todos los pedidos
- Entidad: id, customerName, customerPhone, description, referenceImageUrl (nullable), createdAt

### Tests E2E
- Supertest configurado con Jest
- Tests para categories, products y custom-orders

## Frontend (React + Vite + Tailwind CSS + shadcn/ui)

### Páginas
- **HomeScreen** (`/`) Hero con logo + Instagram + Diseño Personalizado → sección "Trabajos Destacados" con 5 productos → sección "¿Tenés una idea especial?" → sección Contacto con WhatsApp/Instagram/Email
- **Catalogo** (`/catalogo`) Búsqueda por nombre + filtro por categoría + grid completo de productos (1-4 columnas responsive)
- **ProductDetail** (`/producto/:id`) Detalle completo del producto con imagen, descripción, precio y botón de WhatsApp
- **CustomOrder** (`/personalizado`) Formulario de pedido personalizado con nombre, teléfono, descripción y carga de imagen

### Componentes
- **Header** Nav con Inicio → Catálogo → Personalizado + botón Contacto. Menú hamburguesa en mobile
- **Layout** Wrapper con Header + Footer
- **ImageWithFallback** Imagen con fallback en caso de error
- **ui/** Componentes shadcn/ui (button, card, dialog, form, input, select, etc.)

### Servicios y tipos
- `api.ts` Funciones: getCategories, getProducts, getProduct, createCustomOrder
- `types.ts` Interfaces: Category, Product, CustomOrder

## Pendiente
- Autenticación JWT para admin
- Página de administración en el frontend
- Seed de productos en base de datos
