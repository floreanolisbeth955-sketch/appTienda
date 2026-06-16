import { Router } from 'express';

import {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from '../controladores/clientesCtrl.js';

const router = Router();

router.get('/clientes', listarClientes);
router.post('/clientes', crearCliente);
router.put('/clientes/:id', actualizarCliente);
router.delete('/clientes/:id', eliminarCliente);

export default router;