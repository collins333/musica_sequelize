const { verDiscos, verDisco, verAddDisco, crearDisco, verEditDisco, editDisco, eliminarDisco } = require('../controllers/disco_controlador');

const Router = require('express');
const router = Router();

router.get('/discos', verDiscos);
router.get('/discos/:id', verDisco);
router.get('/addDisco', verAddDisco);
router.post('/addDisco', crearDisco);
router.get('/editDisco/:id', verEditDisco);
router.put('/editDisco/:id', editDisco);
router.delete('/deleteDisco/:id', eliminarDisco);

module.exports = router;