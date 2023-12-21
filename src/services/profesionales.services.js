import { puerto } from '../../global/puerto.js';

const token = localStorage.getItem('token');

async function traerProfesionales(nombre, especialidad, obras_sociales) {

    return fetch(`http://localhost:${puerto}/api/profesionales?nombre=${nombre}&especialidad=${especialidad}&obras_sociales=${obras_sociales}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })

        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function traerProfesionalPorId(id) {
    return fetch(`http://localhost:${puerto}/api/profesionales/${id}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error('Error en la llamada')
        }
    })
}

async function editar(id, nombre, apellido, matricula, email, especialidad, subespecialidad, consultorio) {
    return fetch(`http://localhost:${puerto}/api/profesionales/${id}`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        },
        body: JSON.stringify({nombre, apellido, matricula, email, especialidad, subespecialidad, consultorio})
    })

        .then(response => {
            if(response.ok) {
                return response.json()
                
            } else if (response.status === 400) {
                return null

            } else {
                return response.json().then(error => {
                    throw error
                })
            }  
        })
}

async function eliminar(id) {
    return fetch(`http://localhost:${puerto}/api/profesionales/${id}`, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
    })

        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function registro(nombre, apellido, email, clave, matricula, especialidad, subespecialidad, consultorio, avatar, color_avatar) {
    return fetch(`http://localhost:${puerto}/api/profesionales`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre, apellido, email, clave, matricula, especialidad, subespecialidad, consultorio, avatar, color_avatar})
    })

        .then(response => {
            if(response.ok) {
                return response.json()

            } else if (response.status === 400) {
                return null

            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function logout(token) {
    return fetch(`http://localhost:${puerto}/api/profesionales/logout`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
    })

        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function eliminarObraSocial(nombre, id) {
    return fetch(`http://localhost:${puerto}/api/profesionales/obrasocial/${id}`, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`,
            'nombre': `${nombre}`
        }
    })

        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function agregarObraSocial(nombre, id) {
    return fetch(`http://localhost:${puerto}/api/profesionales/obrasocial/${id}`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`,
            'nombre': `${nombre}`
        }
    })

        .then(response => {
            if(response.ok) {
                return response.json()

            } else if (response.status === 400) {
                return null

            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function traerDisponibilidadHorariaPorID(id) {
    return fetch(`http://localhost:${puerto}/api/profesionales/disponibilidad/${id}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
    })
    .then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error('Error en la llamada')
        }
    })
}

async function editarDisponibilidadHoraria(id, dia, horaInicio, horaFin, deshabilitado) {
    return fetch(`http://localhost:${puerto}/api/profesionales/disponibilidad/${id}`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        },
        body: JSON.stringify({dia, horaInicio, horaFin, deshabilitado})
    })

        .then(response => {
            if(response.ok) {
                return response.json()
                
            } else {
                return response.json().then(error => {
                    throw error
                })
            }  
        })
}

export {
    traerProfesionales,
    traerProfesionalPorId,
    editar,
    eliminar,
    registro,
    logout,
    eliminarObraSocial,
    agregarObraSocial,
    traerDisponibilidadHorariaPorID,
    editarDisponibilidadHoraria
}