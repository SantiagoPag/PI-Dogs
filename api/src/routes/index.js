const { Router } = require('express');
const routerDogs = require('./dogs');
const routerTemps = require('./temperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', routerDogs)
router.use('/temperaments', routerTemps)

module.exports = router;
