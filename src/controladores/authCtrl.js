import { conmyslq } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registrar = async (req, res) => {

    const { usuario, clave } = req.body;

    const claveHash = await bcrypt.hash(clave, 10);

    await conmyslq.query(
    'INSERT INTO usuarios(usr_usuario, usr_clave) VALUES (?,?)',
    [usuario, claveHash]
);

    res.json({
        mensaje: 'Usuario registrado'
    });
};

export const login = async (req, res) => {

    const { usuario, clave } = req.body;

    const [result] = await conmyslq.query(
    'SELECT * FROM usuarios WHERE usr_usuario=?',
    [usuario]
);

    if (result.length <= 0) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    const usuarioBD = result[0];

    const validaClave = await bcrypt.compare(
    clave,
    usuarioBD.usr_clave
);

    if (!validaClave) {
        return res.status(401).json({
            message: 'Clave incorrecta'
        });
    }

    const token = jwt.sign(
        {
            id: usuarioBD.usr_id,
            usuario: usuarioBD.usr_usuario
        },
        'base2026',
        {
            expiresIn: '1h'
        }
    );

    res.json({
        auth: true,
        token
    });
};