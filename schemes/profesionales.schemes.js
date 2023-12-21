import * as yup from 'yup';

const profesionalScheme = yup.object({
    nombre: yup.string().required("Nombre es obligatorio"),
    apellido: yup.string().required("Apellido es obligatorio"),
    email: yup.string().email("El email ingresado no es válido").required("Email es obligatorio"),
    clave: yup.string().required("Clave es obligatorio"),
    matricula:yup.string().max(5, "Matrícula puede contener como máximo 5 caracteres").required("Matrícula es obligatorio"),
    especialidad:yup.string().required("Especialidad es obligatorio"),
    subespecialidad:yup.string().required("Subespecialidad es obligatorio"),
    consultorio:yup.string().required("Consultorio es obligatorio"),
    avatar: yup.string(),
    color_avatar: yup.string()
}).noUnknown()

const editarProfesionalScheme = yup.object({
    nombre: yup.string().required("Nombre es obligatorio"),
    apellido: yup.string().required("Apellido es obligatorio"),
    email: yup.string().email("El email ingresado no es válido").required("Email es obligatorio"),
    matricula:yup.string().max(5, "Matrícula puede contener como máximo 5 caracteres").required("Matrícula es obligatorio"),
    especialidad:yup.string().required("Especialidad es obligatorio"),
    subespecialidad:yup.string().required("Subespecialidad es obligatorio"),
    consultorio:yup.string().required("Consultorio es obligatorio")
}).noUnknown()

export {
    profesionalScheme,
    editarProfesionalScheme
}