import { puerto } from '../../global/puerto.js';

const token = localStorage.getItem('token');

async function login(email, clave) {
    return fetch(`https://snapent-back-863yvp5b1-maximilianonuedu.vercel.app/api/usuarios/login`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, clave})
    })

        .then(response => {
            if(response.ok) {
                return response.json()

            } else if (response.status === 400) {
                return response.json()

            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function loginProfesional(email, clave) {
    return fetch(`https://snapent-back-863yvp5b1-maximilianonuedu.vercel.app/api/profesionales/login`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, clave})
    })

        .then(response => {
            if(response.ok) {
                return response.json()
                
            } else if (response.status === 400) {
                return response.json()

            } else {
                throw new Error('Error en la llamada')
            }  
        })
}

async function actualizarClave(coleccion, id, claveActual, claveNueva, claveNuevaRep) {
    
    return fetch(`https://snapent-back-863yvp5b1-maximilianonuedu.vercel.app/api/auth/clave/${id}`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        },
        body: JSON.stringify({coleccion, claveActual, claveNueva, claveNuevaRep})
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

export {
    login,
    loginProfesional,
    actualizarClave
}