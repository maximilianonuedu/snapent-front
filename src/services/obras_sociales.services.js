import { puerto } from '../../global/puerto.js';

async function traerObrasSociales() {
    return fetch(`http://localhost:${puerto}/api/obrassociales`, {
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
    traerObrasSociales
}