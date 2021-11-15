const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const login = async(req, res = response) =>{

    const {correo , password} = req.body;
    
    try{

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado : false'
            });
        }
        //verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -  : Password'
            });
        }
        //generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            msj: 'Login ok',
    
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador.'
        });
    }
}

module.exports = {
    login
}