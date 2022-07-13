const { response } = require('express');

const usuariosGet = (req, res = response) => {
    const { query, nombre, id } = req.query
    res.json({
        ok: true,
        msg: 'Get - Controller',
        nombre
    });
};

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        msg: 'Put - Controller',
        id
    });
};

const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.json({
        ok: true,
        msg: 'Post - Controller',
        body
    });
};
const usuariosDelete = (req, res = response) => {
    res.json({ ok: true, msg: 'Delete - Controller' });
};

module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete };