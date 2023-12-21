import { puerto } from '../../global/puerto.js';

const token = localStorage.getItem('token');

async function reservar(turno) {
    return fetch(`http://localhost:${puerto}/api/turnos`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        },
        body: JSON.stringify(turno)
    })
    
        .then(response => {
            if(response.ok) {
                return response.json()
                    
            } else if(response.status === 400) {
    
                return response.json().then(error => {
                    throw error
                })
    
            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function traerTurnos(id_profesional) {
    let idProfesional = '';
    let parametro = '';

    if(id_profesional) {
        idProfesional = id_profesional;
        parametro = 'id_profesional';
    }

    return fetch(`http://localhost:${puerto}/api/turnos?${parametro}=${idProfesional}`, {
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

async function cancelarTurno(id) {
    return fetch(`http://localhost:${puerto}/api/turnos/${id}`, {
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

async function traerTurnosPorID(id) {

    return fetch(`http://localhost:${puerto}/api/turnos/${id}`, {
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

async function guardarTurno(turno) {
    return fetch(`http://localhost:${puerto}/api/turnos/cancelarTurno`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        },
        body: JSON.stringify(turno)
    })
    
        .then(response => {
            if(response.ok) {
                return response.json()
                    
            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function traerTurnosCanceladosPorID(id) {

    return fetch(`http://localhost:${puerto}/api/turnos/cancelarTurno/${id}`, {
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

export {
    reservar,
    traerTurnos,
    cancelarTurno,
    traerTurnosPorID,
    guardarTurno,
    traerTurnosCanceladosPorID
}