const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const { Producto } = require('../models');
const { response } = require('express');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


//Validador personalizado de categorias 
const existeCategoria = async( id ) =>{
    //Verificar que la categoria existe UwU
    const existeCate = await Categoria.findById(id);
    if(!existeCate) {
        throw new Error(`El id no existe ${id}`);
    }
}
const existeProductoporID = async(id) =>{
    //Verificar que el producto existe
    const existeProducto = await Producto.findById(id);
    if(!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProductoporID
}

