import { puerto } from '../../global/puerto.js';

const token = localStorage.getItem('token');

async function traerUsuarioPorId(id) {

    return fetch(`http://localhost:${puerto}/api/usuarios/${id}`, {
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

async function editar(id, nombre, apellido, email, telefono, fecha_de_nacimiento, DNI, obra_social, peso, altura) {
    return fetch(`http://localhost:${puerto}/api/usuarios/${id}`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        },
        body: JSON.stringify({nombre, apellido, email, telefono, fecha_de_nacimiento, DNI, obra_social, peso, altura})
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

async function eliminar(id) {
    return fetch(`http://localhost:${puerto}/api/usuarios/${id}`, {
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

async function registro (nombre, apellido, email, clave, telefono, fecha_de_nacimiento, DNI, obra_social, avatar, color_avatar, peso, altura) {
    return fetch(`http://localhost:${puerto}/api/usuarios`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre, apellido, email, clave, telefono, fecha_de_nacimiento, DNI, obra_social, avatar, color_avatar, peso, altura})
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
    return fetch(`http://localhost:${puerto}/api/usuarios/logout`, {
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

async function editarPesoAltura(id, peso, altura) {
    return fetch(`http://localhost:${puerto}/api/usuarios/historiaClinica/${id}`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        },
        body: JSON.stringify({peso, altura})
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
    registro,
    traerUsuarioPorId,
    editar,
    eliminar,
    logout,
    editarPesoAltura
}