const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

mongoose.connect("mongodb+srv://alex:melany16@testciclo4.kuyttg2.mongodb.net/db_ciclo4?retryWrites=true&w=majority");

const userEsquema = new mongoose.Schema({
    nombre: String,
    cedula: String,
    edad: Number
});

const UsuarioModelo = new mongoose.model('usuarios', userEsquema);

const vehiculoEsquema = new mongoose.Schema({
    marca: String,
    placa: String,
    modelo: Number
});

const VehiculoModelo = new mongoose.model('vehiculos', vehiculoEsquema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/* Obtener todos los usuarios */
app.get('/usuarios', (req, res) => {
    const filtro = {}
    UsuarioModelo.find(
        filtro,
        (error, documentos) => {
            if(error) {
                res.send('Hubo error al obtener los usuario');
            } else {
                res.send(documentos);
            }
        }
    )
})

/* Obtener un solo usuario por su cedula */
app.get('/usuario-id', (req, res) => {
    const filtro = { cedula: req.query.cedula }
    UsuarioModelo.find(
        filtro,
        (error, documento) => {
            if(error) {
                res.send('Hubo error al obtener el usuario');
            } else {
                res.send(documento);
            }
        }
    )
})

/* Agregar usuario */
app.post('/agregar-usuario', (req, res) => {

    const usuario = new UsuarioModelo({
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        edad: req.body.cedula
    });

    usuario.save((error, datos) => {
        if(error) {
            res.send('Hubo error al crear el usuario');
        } else {
            res.send('Usuario creado');
        }
    })
})

/* Editar usuario por cedula */
app.put('/editar-usuario-id', (req, res) => {
    const datoNuevo = {
        nombre: req.body.nombre,
        edad: req.body.edad
    }
    const filtro = {cedula: req.query.cedula}
    UsuarioModelo.findOneAndUpdate(filtro, datoNuevo, (error, documento) => {
        if(error) {
            res.send('Error al editar el usuario');
        } else {
            UsuarioModelo.find(
                filtro,
                (error, documento) => {
                    if(error) {
                        res.send('Hubo error al obtener el usuario');
                    } else {
                        res.send(documento);
                    }
                }
            )
        }
    } )
})

/* Eliminar usuario */
app.delete('/eliminar-usuario', (req, res) => {
    const filtro = { cedula: req.body.cedula }
    UsuarioModelo.deleteOne(
        filtro,
        (error, documento) => {
            if(error){
                res.send('Ocurrio un error');
            } else {
                res.send('Usuario Eliminado')
            }
        }
    )
})

/* Obtener todos los vehiculos */
app.get('/vehiculos', (req, res) => {
    const filtro = {}
    VehiculoModelo.find(
        filtro,
        (error, documentos) => {
            if(error) {
                res.send('Hubo error al obtener los vehiculos');
            } else {
                res.send(documentos);
            }
        }
    )
})

/* Obtener un solo vehiculo por su placa */
app.get('/vehiculo-placa', (req, res) => {
    const filtro = { placa: req.query.placa }
    VehiculoModelo.find(
        filtro,
        (error, documento) => {
            if(error) {
                res.send('Hubo error al obtener el vehiculo');
            } else {
                res.send(documento);
            }
        }
    )
})

/* Agregar vehiculo */
app.post('/agregar-vehiculo', (req, res) => {

    const vehiculo = new VehiculoModelo({
        marca: req.body.marca,
        placa: req.body.placa,
        modelo: req.body.modelo
    });

    vehiculo.save((error, datos) => {
        if(error) {
            res.send('Hubo error al crear el vehiculo');
        } else {
            res.send('Vehiculo creado');
        }
    })
})

/* Editar vehiculo por placa */
app.put('/editar-vehiculo-placa', (req, res) => {
    const datoNuevo = {
        marca: req.body.marca,
        modelo: req.body.modelo
    }
    const filtro = {placa: req.query.placa}
    VehiculoModelo.findOneAndUpdate(filtro, datoNuevo, (error, documento) => {
        if(error) {
            res.send('Error al editar el vehiculo');
        } else {
            VehiculoModelo.find(
                filtro,
                (error, documento) => {
                    if(error) {
                        res.send('Hubo error al obtener el vehiculo');
                    } else {
                        res.send(documento);
                    }
                }
            )
        }
    } )
})

/* Eliminar vehiculo */
app.delete('/eliminar-vehiculo', (req, res) => {
    const filtro = { placa: req.body.placa }
    VehiculoModelo.deleteOne(
        filtro,
        (error, documento) => {
            if(error){
                res.send('Ocurrio un error');
            } else {
                res.send('Vehiculo Eliminado')
            }
        }
    )
})

app.listen(3000, () => {
    console.log("Servidor encendido");
})