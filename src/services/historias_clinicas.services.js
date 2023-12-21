import { puerto } from '../../global/puerto.js';

const token = localStorage.getItem('token');

async function traerHistoriasPorProfesional(id) {
    return fetch(`https://snapent-back-863yvp5b1-maximilianonuedu.vercel.app/api/historiasClinicas/${id}`, {
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

async function traerHistoriasPorPaciente(id, idProfesional) {
    return fetch(`https://snapent-back-863yvp5b1-maximilianonuedu.vercel.app/api/historiasClinicas/paciente/${id}/${idProfesional}`, {
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

async function crearHistoriaClinica(datos) {
    return fetch(`https://snapent-back-863yvp5b1-maximilianonuedu.vercel.app/api/historiasClinicas`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        },
        body: JSON.stringify(datos)
    })

        .then(response => {
            if(response.ok) {
                return response.json()

            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function traerHistoriasPorID(id) {
    return fetch(`https://snapent-back-863yvp5b1-maximilianonuedu.vercel.app/api/historiasClinicas/paciente/${id}`, {
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
    traerHistoriasPorProfesional,
    traerHistoriasPorPaciente,
    crearHistoriaClinica,
    traerHistoriasPorID
}