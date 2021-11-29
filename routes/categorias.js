const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        categoriasGet, 
        obtenerCategoria, 
        categoriasPut, 
        categoriasDelete} = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();
// 
// {{url}}/api/categorias



//Obtener todas las categorias.
router.get('/',  categoriasGet);

//Obtener una categoria en particular
router.get('/:id', [
    check('id' , 'No es un id valido de Mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
    ], obtenerCategoria);
//Crear categoria - privado cualquier persona con un token valido 
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria);


//Actualizar cualquiera con token valido 
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],categoriasPut);

//Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id' , 'No es un id valido de Mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
] ,categoriasDelete);



module.exports = router;