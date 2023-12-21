import * as yup from 'yup';

const usuarioScheme = yup.object({
    nombre: yup.string().required("Nombre es obligatorio"),
    apellido: yup.string().required("Apellido es obligatorio"),
    email: yup.string().email("El email ingresado no es válido").required("Email es obligatorio"),
    clave:yup.string().min(5, "Clave debe contener al menos 5 caracteres").required("Clave es obligatorio"),
    telefono:yup.string().required("Teléfono es obligatorio"),
    fecha_de_nacimiento:yup.string().required("Fecha de nacimiento es obligatorio"),
    DNI:yup.string().max(8, "DNI debe contener como máximo 8 caracteres").required("DNI es obligatorio"),
    obra_social:yup.string().required("Obra social es obligatorio"),
    peso: yup.number().typeError("Peso deber ser un número").positive("Peso deber ser un número positivo").min(1, "Peso debe ser mayor o igual a 1").required("Peso es obligatorio"),
    altura: yup.number().typeError("Altura debe ser un número").positive("Altura debe ser un número positivo").min(1, "Altura debe ser igual o mayor a 1").required("Altura es obligatorio").test('len', "Altura debe tener como máximo 3 dígitos", (val) => val.toString().length <= 3),
    avatar: yup.string(),
    color_avatar: yup.string()
}).noUnknown()

const editarUsuarioScheme = yup.object({
    nombre: yup.string().required("Nombre es obligatorio"),
    apellido: yup.string().required("Apellido es obligatorio"),
    email: yup.string().email("El email ingresado no es válido").required("Email es obligatorio"),
    telefono:yup.string().required("Teléfono es obligatorio"),
    fecha_de_nacimiento:yup.string(),
    DNI:yup.string(),
    obra_social:yup.string().required("Obra social es obligatorio"),
    peso: yup.number().typeError("Peso deber ser un número").positive("Peso deber ser un número positivo").min(1, "Peso debe ser mayor o igual a 1").required("Peso es obligatorio"),
    altura: yup.number().typeError("Altura debe ser un número").positive("Altura debe ser un número positivo").min(1, "Altura debe ser igual o mayor a 1").required("Altura es obligatorio").test('len', "Altura debe tener como máximo 3 dígitos", (val) => val.toString().length <= 3),
}).noUnknown()

const editarPesoAltura = yup.object({
    peso: yup.number().typeError("Peso deber ser un número").positive("Peso deber ser un número positivo").min(1, "Peso debe ser mayor o igual a 1").required("Peso es obligatorio"),
    altura: yup.number().typeError("Altura debe ser un número").positive("Altura debe ser un número positivo").min(1, "Altura debe ser igual o mayor a 1").required("Altura es obligatorio").test('len', "Altura debe tener como máximo 3 dígitos", (val) => val.toString().length <= 3),
}).noUnknown()

export {
    usuarioScheme,
    editarUsuarioScheme,
    editarPesoAltura
}