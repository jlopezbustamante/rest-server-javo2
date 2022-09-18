const Role = require('../models/role');
const Usuario = require('../models/usuario');
const { Schema, model, default: mongoose } = require('mongoose');

const esRolValido = async (rol = '') => {
    const existRole = await Role.findOne({ rol });
    if (!existRole) {
        throw new Error(`El rol: ${rol} no existe en DB`);
    }
}

const existeEmail = async (correo = '') => {
    hayEmail = await Usuario.findOne({ correo })
    if (hayEmail) {
        throw new Error(`El email: ${correo} ya exste`);
    }
}
const existeUsuarioPorId = async (_id) => {
    hayId = await Usuario.findById(_id);
    if (hayId == null) {
        throw new Error(`El id: ${_id} no exste en db`);
    }

}
/*     console.log(existeEmail)
    return res.status(400).json({
        msg: "El correo ya existe"
    }) */



module.exports = { esRolValido, existeEmail, existeUsuarioPorId }