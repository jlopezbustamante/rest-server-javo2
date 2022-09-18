const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    //const usuarios = await Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde));
    //const totalUsuarios = await Usuario.countDocuments({ estado: true });
    const [totalUsuarios, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde))
    ]
    )
    res.json({ totalUsuarios, usuarios });
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //todo contra la base de datos
    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({ usuario });
};

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //Verificar si existe el mail

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    usuario.save();
    res.json({
        ok: true,
        usuario
    });
};
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    //Borrado fisico no recomendado
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({ ok: true, msg: 'Delete - Controller', usuario });
};

module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete };