import { conmyslq } from '../db.js';

export const listarClientes = async (req, res) => {
    const [rows] = await conmyslq.query(
        'SELECT * FROM clientes'
    );

    res.json(rows);
};

export const crearCliente = async (req, res) => {

    const {
  cli_identificacion,
  cli_nombre,
  cli_telefono,
  cli_correo,
  cli_direccion,
  cli_pais,
  cli_ciudad
} = req.body;

const [result] = await conmyslq.query(
  `INSERT INTO clientes
  (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad)
  VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    cli_identificacion,
    cli_nombre,
    cli_telefono,
    cli_correo,
    cli_direccion,
    cli_pais,
    cli_ciudad
  ]
);

    res.json({
        mensaje: 'Cliente creado',
        id: result.insertId
    });
};

export const actualizarCliente = async (req, res) => {

    const { id } = req.params;
    const { nombre, correo, telefono } = req.body;

    await conmyslq.query(
        'UPDATE clientes SET nombre=?, correo=?, telefono=? WHERE id=?',
        [nombre, correo, telefono, id]
    );

    res.json({
        mensaje: 'Cliente actualizado'
    });
};

export const eliminarCliente = async (req, res) => {

    const { id } = req.params;

    await conmyslq.query(
        'DELETE FROM clientes WHERE id=?',
        [id]
    );

    res.json({
        mensaje: 'Cliente eliminado'
    });
};