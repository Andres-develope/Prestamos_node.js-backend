import { Router } from 'express';
import {
  listarPrestamos,
  obtenerPrestamo,
  crearPrestamo,
  actualizarPrestamo,
  eliminarPrestamo
} from '../controllers/controller.prestamo.js';
import { verificarToken } from '../middleware/auth.middleware.js';

const router = Router();

// Todas las rutas de préstamos protegidas con verificarToken
router.get('/prestamos', verificarToken, listarPrestamos);
router.get('/prestamos/:id', verificarToken, obtenerPrestamo);
router.post('/prestamos', verificarToken, crearPrestamo);
router.put('/prestamos/:id', verificarToken, actualizarPrestamo);
router.delete('/prestamos/:id', verificarToken, eliminarPrestamo);

export default router;
