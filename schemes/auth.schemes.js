import * as yup from 'yup';

const loginScheme = yup.object({
    email: yup.string().email("El email ingresado no es válido").required("El campo email es obligatorio"),
    clave:yup.string().min(5, "El campo clave debe contener al menos 5 caracteres").required("El campo clave es obligatorio")
}).noUnknown()

const actualizarClaveScheme = yup.object({
    claveActual: yup.string().required("El campo clave es obligatorio").min(5, "El campo clave debe contener al menos 5 caracteres"),
    claveNueva: yup.string().required("El campo clave es obligatorio").min(5, "El campo clave debe contener al menos 5 caracteres"),
    claveNuevaRep: yup.string().required("El campo clave es obligatorio").oneOf([yup.ref('claveNueva'), null], 'Las claves no coinciden.')
}).noUnknown()

export {
    loginScheme,
    actualizarClaveScheme
}