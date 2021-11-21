const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
// 
// {{url}}/api/categorias



//Obtener todas las categorias.
router.get('/', (req, res) => {
    res.json('get');
});

//Obtener una categoria en particular
router.get('/:id', (req, res) => {
    res.json('get - id');
});
//Crear categoria - privado cualquier persona con un token valido 
router.post('/:id', (req, res) => {
    res.json('post');
});

//Actualizar cualquiera con token valido 
router.put('/:id', (req, res) => {
    res.json('put');
});



module.exports = router;