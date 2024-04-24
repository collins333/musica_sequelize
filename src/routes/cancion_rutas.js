const { verCanciones, verCancion, verAddCancion, crearCancion, verEditCancion, editCancion, eliminarCancion } = require('../controllers/cancion_controlador');

const Router = require('express');
const router = Router();

router.get('/canciones', verCanciones);
router.get('/canciones/:id', verCancion);
router.get('/addCancion', verAddCancion);
router.post('/addCancion', crearCancion);
router.get('/editCancion/:id', verEditCancion);
router.put('/editCancion/:id', editCancion);
router.delete('/deleteCancion/:id', eliminarCancion);

module.exports = router;