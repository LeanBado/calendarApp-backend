//CRUD
//
//  RUTAS DE EVENTOS --> host + '/api/events'
//

const {Router} = require("express");
const router = Router()
const {validarJWT} = require('../middlewares/validar-jwt')
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos');
const isDate = require("../helpers/isDate");



router.use(validarJWT) //sirve para proteger todas las rutas que se pongan abajo con una validacion, en este caso 'validarJWT'
//en el caso que una ruta se ponga arriba de esta linea, queda publica.-


//Obtener eventos:
router.get('/', getEventos)

//Crear un evento:
router.post('/', [
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'fecha de inicio obligatoria').custom(isDate),
    check('end', 'fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
],crearEvento)

//Actualizar evento:
router.put('/:id', [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

//Borrar evento:
router.delete('/:id', eliminarEvento)

module.exports = router