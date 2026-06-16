import { Router } from 'express';
import { registrar, login } from '../controladores/authCtrl.js';

const router = Router();

// Ruta de prueba
router.get('/', (req, res) => {
    res.json({
        mensaje: 'API AppTienda funcionando correctamente'
    });
});

// Registro
router.post('/registro', registrar);

// Login (aquí es donde generamos el token)
router.post('/login', login);

export default router;