import express from 'express';
import { initDB } from './app/config/db.js';
import routeAuth from './app/routes/routes.auth.js';
import routePrestamo from './app/routes/routes.prestamo.js';

const app = express();
const PORT = 3000;

// Inicializar base de datos y tablas antes de levantar el servidor
await initDB();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

// Registrar rutas de autenticación PRIMERO
app.use('/api', routeAuth);

// Luego las rutas del CRUD de Préstamos
app.use('/api', routePrestamo);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});