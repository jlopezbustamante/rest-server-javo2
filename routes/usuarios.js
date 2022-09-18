

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios')

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators')
const router = Router();

router.get('/', usuariosGet)

router.put('/:id', [check('id', 'No es un id valido').isMongoId(),
check('id').custom(existeUsuarioPorId),
check('rol').custom(esRolValido),
    validarCampos], usuariosPut)

router.post('/', [check('correo', 'El correo no es valido').isEmail(),
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
//check('rol', 'El role debe ser valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
check('rol').custom(esRolValido),
check('correo').custom(existeEmail), validarCampos], usuariosPost)

router.delete('/:id', [check('id', 'No es un id valido').isMongoId(),
check('id').custom(existeUsuarioPorId),
    validarCampos], usuariosDelete)









module.exports = router;