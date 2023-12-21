// REACT
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders';
import { Button, Container, Grid, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Text from   '../components/Text/Text';
import Paper from '@mui/material/Paper';

// ICONS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// SERVICES
import * as usuariosService from './../services/usuarios.services.js';

// GLOBAL
import { formatoFecha } from '../../global/formatoFecha.js';

function PerfilUsuarioDatos() {
    const {id} = useParams();

    // TRAER DATOS USUARIO
    const [usuario, setUsuario] = useState(null);
    const [user, setUser] = useState(null);

    async function traerDatos() {
        try {
            const data = await usuariosService.traerUsuarioPorId(id);

            setUsuario(data);

            setUser(data.nombre + ' ' + data.apellido);

        } catch(err) {
            new Error(err);
        }
    }

    useEffect(() => {
        traerDatos().then(res => {
            console.log('Datos de perfil cargados con éxito.');
        })
        .catch(err => {
            new Error(err);
        });
    }, [id])

    return(
        <>
            <TitulosHeaders
                titulo="Perfil"
                icon={<AccountCircleIcon fontSize='large' color='white'
                />}
            />

            <Container maxWidth='sm'>
                {usuario ? (
                    <Grid columns={12} my={5}>
                        <Box my={2} display='flex' alignItems={'center'} flexDirection='row' justifyContent='space-between'>
                            <Text
                                text = 'Datos de la cuenta'
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="600"
                            />

                            <Button href={'/perfil/editar/' + id}>Editar</Button>
                        </Box>

                        <Box mb={5} padding={'.7rem 1.7rem'} sx={{ boxShadow: 2,  borderRadius: 2, display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff' }}>

                            {usuario.avatar != '' ? ( 

                                <Avatar sx={{ width: 56, height: 56, fontSize:25, backgroundColor: usuario.color_avatar }} src={'./../../avatares/' + usuario.avatar}>{usuario.nombre.charAt(0).toUpperCase()} {usuario.apellido.charAt(0).toUpperCase()}</Avatar>

                            ) : (
            
                                <Avatar sx={{ width: 56, height: 56, fontSize:25, backgroundColor: usuario.color_avatar }}>{usuario.nombre.charAt(0).toUpperCase()} {usuario.apellido.charAt(0).toUpperCase()}</Avatar>
                                
                            )}

                            <Box sx={{ml:2}}>
                                <Text
                                    text={user}
                                    fontSize="2em"
                                    fontFamily="Lato"
                                    fontWeight="900"
                                    margin="10px"
                                />
                                </Box>
                        </Box>

                        <Grid columns={12} display='flex' flexDirection='column' justifyContent='space-around'>
                                <Paper sx={{ boxShadow: 2,  borderRadius: 2, marginBottom:3}}>
                                    <Grid display='flex' flexDirection='column' p={3}>
                                        
                                        <Box sx={{mb:2}}>
                                            <Text
                                                text = 'Datos personales'
                                                fontSize="1.3em"
                                                fontFamily="Lato"
                                                margin="0px"
                                                fontWeight="600"
                                                marginBottom=".5em"
                                            />
                                        </Box>

                                        <Grid display='flex' flexDirection='row' justifyContent={'space-between'}>
                                            <Grid display='flex' flexDirection='column' mr={3}>
                                                <Text
                                                    text='Nombre'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='grey'
                                                    marginBottom=".3em"
                                                />

                                                <Text
                                                    text={usuario.nombre}
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='black'
                                                />
                                            </Grid>

                                            <Grid display='flex' flexDirection='column' mr={3}>
                                                <Text
                                                    text='Apellido'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    marginBottom=".3em"
                                                    color='grey'
                                                />

                                                <Text
                                                    text={usuario.apellido}
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='black'
                                                />
                                            </Grid>

                                            <Grid display='flex' flexDirection='column'>
                                                <Text
                                                    text='Fecha de nacimiento'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    marginBottom=".3em"
                                                    color='grey'
                                                />

                                                <Text
                                                    text={formatoFecha(usuario.fecha_de_nacimiento)}
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='black'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                
                                <Paper sx={{ boxShadow: 2,  borderRadius: 2, marginBottom: 3}}>

                                    <Grid display='flex' flexDirection='column' p={3}>
                                        
                                        <Box sx={{mb:2}}>
                                            <Text
                                                text = 'Datos de contacto'
                                                fontSize="1.3em"
                                                fontFamily="Lato"
                                                marginBottom=".5em"
                                                fontWeight="600"
                                            />
                                        </Box>

                                        <Grid display='flex' flexDirection='row' justifyContent={'space-between'}>
                                            <Grid display='flex' flexDirection='column' mr={3}>
                                                <Text
                                                    text='Email'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    marginBottom=".5em"
                                                    color='grey'
                                                />

                                                <Text
                                                    text={usuario.email}
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='black'
                                                />
                                            </Grid>

                                            <Grid display='flex' flexDirection='column'>
                                                <Text
                                                    text='Teléfono'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    marginBottom=".5em"
                                                    color='grey'
                                                />

                                                <Text
                                                    text={usuario.telefono}
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='black'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>

                                <Paper sx={{ boxShadow: 2,  borderRadius: 2}}>
                                    <Grid display='flex' flexDirection='column' p={3}>
                                        
                                        <Box sx={{mb:2}}>
                                            <Text
                                                text = 'Datos médicos'
                                                fontSize="1.3em"
                                                fontFamily="Lato"
                                                marginBottom=".5em"
                                                fontWeight="600"
                                            />
                                        </Box>

                                        <Grid display='flex' flexDirection='row' justifyContent={'space-between'}>
                                            <Grid display='flex' flexDirection='column' mr={3}>
                                                <Text
                                                    text='Obra Social'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    marginBottom=".3em"
                                                    color='grey'
                                                />

                                                <Text
                                                    text={usuario.obra_social}
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='black'
                                                />
                                            </Grid>

                                            <Grid display='flex' flexDirection='column' mr={3}>
                                                <Text
                                                    text='Peso'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    marginBottom=".3em"
                                                    color='grey'
                                                />

                                                <Text
                                                    text={usuario.peso + ' kg'}
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='black'
                                                />
                                            </Grid>

                                            <Grid display='flex' flexDirection='column'>
                                                <Text
                                                    text='Altura'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    marginBottom=".5em"
                                                    color='grey'
                                                />

                                                <Text
                                                    text={usuario.altura + ' cm'}
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    color='black'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>

                        </Grid>
                    </Grid>

                ) : (
                    <Grid columns={12} my={5} display={'flex'} justifyContent={'center'} alignItems={'center'}> 
                        <Box minWidth={100} minHeight={100} justifyContent={'center'} alignItems={'center'}>
                            <CircularProgress disableShrink />
                        </Box>
                    </Grid>
                )}
            </Container>
        </>
    )
}

export default PerfilUsuarioDatos
