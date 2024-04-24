const { verIndice, verInterpretes, verAddInterprete, crearInterprete, verInterprete, verEditInterprete, editInterprete, eliminarInterprete, buscarInterprete } = require('../controllers/interprete_controlador');

const Router = require('express');
const router = Router();

router.get('/', verIndice);
router.get('/interpretes', verInterpretes);
router.get('/interpretes/:id', verInterprete);
router.get('/addInterprete', verAddInterprete);
router.post('/addInterprete', crearInterprete);
router.get('/editInterprete/:id', verEditInterprete);
router.put('/editInterprete/:id', editInterprete);
router.delete('/deleteInterprete/:id', eliminarInterprete);
router.get('/buscando', buscarInterprete);

module.exports = router;