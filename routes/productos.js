const { Router } = require('express');
const { check } = require('express-validator');
const { productosGet, crearProducto, obtenerProducto, productosPut, productosDelete } = require('../controllers/productos');
const { existeCategoria, existeProductoporID } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todos los productos.
router.get('/', productosGet);
//Obtener un producto en especifico.
router.get('/:id', [
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom(existeProductoporID),
    validarCampos
], obtenerProducto);
//Crear un nuevo producto XD
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],crearProducto);
//Actualizar cualquiera con token valido.
router.put('/:id', [
    validarJWT,
     // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoporID),
    validarCampos
],productosPut);
//Eliminar un producto
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom(existeProductoporID),
    validarCampos
],productosDelete);
module.exports = router;