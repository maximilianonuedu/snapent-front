import { puerto } from '../../global/puerto.js';

async function traerObrasSociales() {
    return fetch(`https://snapent-back-863yvp5b1-maximilianonuedu.vercel.app/api/obrassociales`, {
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