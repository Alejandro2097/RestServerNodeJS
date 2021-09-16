const express = require('express')
const app = express()

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Midelwares
        //Funciones que siempre se ejecutan junto con el servidor.
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
            res.send('Hello World')
        });
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
}

module.exports = Server;