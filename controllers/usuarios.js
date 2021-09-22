const { response } = require('express');
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
    const body = req.body;

    const usuario = new Usuario(body);

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