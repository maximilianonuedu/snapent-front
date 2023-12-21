import { puerto } from '../../global/puerto.js';

async function traerEspecialidades() {
    return fetch(`http://localhost:${puerto}/api/especialidades`, {
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

async function traerSubespecialidades(especialidad) {
    return fetch(`http://localhost:2023/api/especialidades?nombre=${especialidad}`, {
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

export {
    traerEspecialidades,
    traerSubespecialidades
}