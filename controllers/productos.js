const { response, request } = require("express");
const { body } = require("express-validator");
const { Producto } = require('../models');
const { aggregate } = require("../models/categoria");


//Obtener los productos - paginado - total
const productosGet = async(req = request, res = response) =>{
    const { limite =  5, desde = 0} = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos

    })
}
//Obtener categoria - populate {}
const obtenerProducto = async(req = request, res = response) =>{
    const { id } = req.params;

    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json(producto);
}
//Crear un nuevo producto
const crearProducto = async(req, res = response) =>{
    const { estado, usuario, ...body } = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre});
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }
    //Generar la data al guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = new Producto(data);

    //Guardar en DB
    await producto.save();
    res.status(200).json(producto);
}
const productosPut = async
module.exports = {
    productosGet,
    crearProducto,
    obtenerProducto
}