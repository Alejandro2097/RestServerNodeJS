const { response, request } = require("express");
const { Categoria } = require('../models');
const { aggregate } = require("../models/categoria");


// obtener Categorias  -paginado - total  - populate 
const categoriasGet = async(req = request, res = response) => {
    const  { limite = 5, desde = 0} = req.query;
    const query = { estado:true };

    const [ total , categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
             .skip(Number(desde))
             .limit(Number(limite))
    ]); 

    res.json({
        total,
        categorias
    });
}
// Obtener categoria - populate {}
const obtenerCategoria = async( req = request, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
}


//Crear una nueva categoria 
const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return  res.status(400).json({
            msg: `La categoria  ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar DB
    await categoria.save();
    res.json(201).json(categoria);
}

//Actualizar categorias 
const categoriasPut = async(req, res = response) =>{
    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data);

    res.json(categoria);
}

//Borrar categoria
const categoriasDelete = async(req, res = response ) => {
    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id ,{estado : false});

    res.json(categoriaBorrada);
}


module.exports = {
    crearCategoria,
    categoriasGet,
    obtenerCategoria,
    categoriasPut,
    categoriasDelete
}