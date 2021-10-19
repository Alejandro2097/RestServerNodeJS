const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const {q, nombre = 'No name', apikey, page, limit } = req.query;
    
    res.json({
        "msg": "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit

  });
}
const usuariosPut = (req, res) => {
    const id = req.params.id;

    res.json({
        "msg": "put API - controlador",
        id
    });
}
const usuariosPost = async(req, res = response) => {

   
    const { nombre, correo, password, role} = req.body;
    const usuario = new Usuario({ nombre, correo, password, role});
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo  });
    if(existeEmail){
        return res.status(400).json({
            msg: 'El correo ya esta registrado.'
        });
    }
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB

    await usuario.save();

    res.json({
        'msg': 'post API - controlador',
        usuario
    });
}
const usuariosDelete = (req, res) => {
    res.json({
        "msg": "delete API - controlador"
        
    });
}
const usuariosPatch = (req, res) => {
    res.json({
        "msg": "patch API - controlador"
    });
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}