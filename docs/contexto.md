# Documento de Contexto de Proyecto: Tienda de Amigurumis (Versión Final)

Este documento es la **fuente de verdad y contexto definitivo** para el desarrollo del sistema de producción. Evolucionó de un prototipo visual en Figma a una plataforma web robusta full-stack con base de datos.

---

## 1. Visión General & Arquitectura
El proyecto consiste en una aplicación web *mobile-first* para un negocio artesanal de amigurumis y pedidos personalizados. El sistema permite gestionar un catálogo dinámico y registrar solicitudes de diseño mediante una arquitectura desacoplada (Frontend / Backend), manteniendo la conversión final centralizada en **WhatsApp**.

### Stack Tecnológico Definitivo
*   **Frontend:** React.js con **TypeScript** (construido sobre Vite) + Tailwind CSS (para el estilizado ágil).
*   **Backend:** **NestJS** con **TypeScript** (arquitectura empresarial basada en módulos, controladores y servicios).
*   **Base de Datos & ORM:** Base de datos relacional (PostgreSQL o MySQL) gestionada a través de **Prisma ORM**.

---

## 2. Identidad Visual y UI/UX (Directrices de Producción)
La interfaz debe ser limpia, minimalista y transmitir calidez artesanal (*cozy*).
*   **Regla de Bordes:** Todos los componentes interactivos (tarjetas, botones, inputs) deben implementar bordes redondeados estrictos de **8px a 12px** (`rounded-lg` o `rounded-xl` en Tailwind).
*   **Espaciado:** Diseño aireado con amplio padding para evitar la saturación visual en dispositivos móviles.

---

## 3. Modelo de Datos (Estructura de Base de Datos - Prisma)

El sistema requiere tres entidades principales interconectadas para alimentar los filtros de la pantalla de inicio y persistir las solicitudes del formulario:

### Entidad: Category (Categorías)
Administra los filtros dinámicos del catálogo (ej: "Todos", "Animales", "Personajes", "Llaveros").
*   `id`: String / Int (Primary Key)
*   `name`: String (Único - ej: "Animales")
*   `slug`: String (Para URLs o búsquedas limpias)

### Entidad: Product (Catálogo de Amigurumis)
*   `id`: String / Int (Primary Key)
*   `title`: String (Nombre del amigurumi)
*   `description`: String (Detalle de materiales, ej: "Hilo de algodón 100% hipoalergénico")
*   `price`: Decimal / Float (Almacenado en pesos argentinos `$ ARS`)
*   `images`: String[] (Array de URLs de las fotos del producto)
*   `isAvailable`: Boolean (Default: true. Permite pausar la venta si falta material)
*   `categoryId`: ForeignKey -> relaciona con `Category`

### Entidad: CustomOrder (Pedidos Personalizados)
Registra en la base de datos cada formulario enviado antes de redirigir al usuario, sirviendo como respaldo y métrica de negocio.
*   `id`: String / Int (Primary Key)
*   `customerName`: String (Nombre del cliente)
*   `customerPhone`: String (WhatsApp de contacto)
*   `description`: String (Idea detallada de colores, tamaño y personajes)
*   `referenceImageUrl`: String (Opcional - URL de la foto subida a un storage como Cloudinary o S3)
*   `createdAt`: DateTime (Fecha de creación automática)

---

## 4. Endpoints Requeridos (API REST en NestJS)

El backend debe exponer los siguientes servicios ordenados por módulos:

*   **`GET /categories`**: Retorna la lista de categorías para renderizar la barra de filtros del frontend.
*   **`GET /products`**: Retorna los amigurumis activos. Debe permitir filtrar por `categoryId` (Query params) para la navegación dinámica.
*   **`GET /products/:id`**: Retorna el detalle de un amigurumi específico.
*   **`POST /custom-orders`**: Recibe el formulario de pedidos personalizados, procesa la imagen de referencia (Multipart/form-data) y guarda el registro en la base de datos.

---

## 5. Integración y Flujo de WhatsApp
La conversión final se realiza mediante redirección web (Deep Linking) usando la API de WhatsApp (`https://wa.me/`). El Frontend debe formatear el string de forma automática:

*   **Compra Directa:** `https://wa.me/NUMERO?text=Hola!%20Me%20interesa%20encargar%20el%20amigurumi%20[Product.title]%20por%20un%20valor%20de%20$[Product.price]%20ARS.`
*   **Pedido Personalizado:** Al resolverse con éxito el `POST /custom-orders`, el cliente es redirigido con un texto que incluya su nombre y el resumen de su idea para continuar la cotización por chat.

---

## 6. Instrucciones para la Inteligencia Artificial (Prompt de Sistema)
Cuando trabajes en este proyecto, actúa como un **Arquitecto Full Stack Senior experto en NestJS, TypeScript y React**. 
1.  **Tipado Estricto:** Todo el código debe estar fuertemente tipado con interfaces y DTOs (`Data Transfer Objects`) tanto en NestJS como en React.
2.  **Estructura Limpia:** Respetá la arquitectura modular de NestJS (`products.module.ts`, `products.controller.ts`, `products.service.ts`).
3.  **Foco en UI/UX:** Al generar componentes de React, recordá aplicar estrictamente la paleta pastel, tipografía sans-serif y bordes redondeados (8px-12px). El proyecto está localizado para Argentina (`$ ARS`).