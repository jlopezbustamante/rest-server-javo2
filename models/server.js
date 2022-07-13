const express = require('express')
var cors = require('cors')



//console.log(process.env.PORT) // remove this after you've confirmed it working



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosRutas = '/api/usuarios';
        //MIDDLEWARES

        this.middlewares();
        //RUTAS DE LA APLICACION
        this.routes();
    }
    routes() {
        this.app.use(this.usuariosRutas, require('../routes/usuarios'));
    }
    middlewares() {
        //parseo del body
        this.app.use(express.json());
        this.app.use(cors())
        this.app.use(express.static('public'));

    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor escuchando puerto ' + this.port);
        })
    }

}

module.exports = Server;