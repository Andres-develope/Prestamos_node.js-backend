import pool from '../config/db.js';

// Obtener todos los préstamos
export const listarPrestamos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM prestamos ORDER BY fecha_creacion DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un préstamo por ID
export const obtenerPrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM prestamos WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo préstamo
export const crearPrestamo = async (req, res) => {
  try {
    const { cliente, monto, tasa_interes, plazo_meses, estado } = req.body;
    
    // Validaciones básicas
    if (!cliente || !monto || !tasa_interes || !plazo_meses) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const [result] = await pool.query(
      'INSERT INTO prestamos (cliente, monto, tasa_interes, plazo_meses, estado) VALUES (?, ?, ?, ?, ?)',
      [cliente, monto, tasa_interes, plazo_meses, estado || 'Pendiente']
    );

    res.status(201).json({
      id: result.insertId,
      cliente,
      monto,
      tasa_interes,
      plazo_meses,
      estado: estado || 'Pendiente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar préstamo
export const actualizarPrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente, monto, tasa_interes, plazo_meses, estado } = req.body;

    if (!cliente || !monto || !tasa_interes || !plazo_meses || !estado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const [result] = await pool.query(
      'UPDATE prestamos SET cliente = ?, monto = ?, tasa_interes = ?, plazo_meses = ?, estado = ? WHERE id = ?',
      [cliente, monto, tasa_interes, plazo_meses, estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    res.json({ message: 'Préstamo actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar préstamo
export const eliminarPrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM prestamos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    res.json({ message: 'Préstamo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
