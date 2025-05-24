
# 📘 Payloans – Aplicación Web de Gestión de Préstamos

Payloans es una aplicación web fullstack que permite registrar, consultar y actualizar préstamos y deudas personales.  
Este proyecto está compuesto por un **frontend en React + Vite + Tailwind** y un **backend en Node.js con almacenamiento en archivo JSON**.

---

## 🧩 Tecnologías Usadas

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router DOM
- Heroicons, Remix Icons
- Tremor UI (para dashboards y estadísticas)

### Backend
- Node.js
- Express.js
- Archivo JSON como base de datos

---

## 📦 Requisitos Previos

- Node.js v18 o superior → https://nodejs.org/

---

## 🚀 Instalación del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://tu-repo.git
cd apploan
```

---

## 🖥️ Frontend – React + Vite

### 📂 Ir al directorio del frontend

```bash
cd frontend
```

### 🔧 Instalar dependencias

```bash
npm install
```

### 🧪 Ejecutar en modo desarrollo

```bash
npm run dev
```

Esto abrirá la app en tu navegador en `http://localhost:5173`

### 📜 Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila la app para producción
- `npm run preview`: Visualiza la versión de producción local
- `npm run lint`: Ejecuta ESLint

### 📁 Estructura del frontend

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

---

## 🔙 Backend – Node.js + Express + JSON

### 📂 Ir al directorio del backend

```bash
cd backend
```

### 🔧 Instalar dependencias

```bash
npm install
```

### ▶️ Ejecutar servidor backend

```bash
node index.js
```

Esto levantará el backend en `http://localhost:3000`


> Nota: El backend usa un archivo `data/db.json` como almacenamiento. Asegúrate de que este archivo exista y tenga permisos de escritura.

---

## ⚙️ Conexión Frontend ↔ Backend

El frontend realiza llamadas `fetch` a `http://localhost:3000`.  
Si cambias el puerto o dominio del backend, actualiza esas URLs en tu código React.

---

## 🧑‍💻 Autor

**Tu Nombre**  
[GitHub](https://github.com/JoseCarmona17)

---

## ✅ Estado del Proyecto

- [x] Registro y actualización de préstamos
- [x] Enrutamiento de vistas
- [x] Almacenamiento persistente con archivo JSON
- [ ] Validaciones avanzadas
- [ ] Autenticación de usuarios
- [ ] Dashboard financiero con estadísticas

