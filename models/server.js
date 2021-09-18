const express = require('express');
var cors = require('cors');
const app = express()

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Midelwares
        //Funciones que siempre se ejecutan junto con el servidor.
        //CORS
        app.use(cors())
        this.middlewares();
        //Rutas de mi aplicacion.
        this.routes();
    }
    middlewares(){
        //Directorio publico.
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.get('/api', (req, res) => {
            res.status(403).json({
                "ok" : true,
                "msg": "get API"
            });
        });
        this.app.put('/api', (req, res) => {
            res.status(403).json({
                "ok" : true,
                "msg": "put API"
            });
        });
        this.app.post('/api', (req, res) => {
            res.status(201).json({
                "ok" : true,
                "msg": "post API"
            });
        });
        this.app.delete('/api', (req, res) => {
            res.status(403).json({
                "ok" : true,
                "msg": "delete API"
            });
        });
        this.app.patch('/api', (req, res) => {
            res.status(403).json({
                "ok" : true,
                "msg": "patch API"
            });
        });
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
}

module.exports = Server;