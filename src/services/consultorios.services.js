import { puerto } from '../../global/puerto.js';

const token = localStorage.getItem('token');

async function traerConsultorios() {
    return fetch(`http://localhost:${puerto}/api/consultorios`, {
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

async function traerConsultorioPorId(id) {

    return fetch(`http://localhost:${puerto}/api/consultorios/${id}`, {
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
    traerConsultorioPorId,
    traerConsultorios
}