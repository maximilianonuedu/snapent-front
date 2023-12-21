// REACT
import {useEffect, useState} from 'react';
import CardProfesional from '../components/CardProfesionales/CardProfesional.jsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Text from '../components/Text/Text.jsx';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders.jsx';
import Publicidad from '../components/Publicidad/Publicidad.jsx';

// SERVICES
import * as ProfesionalesServices from './../services/profesionales.services.js';

function InicioPage() {
    // GENERAL
    const {state} = useLocation();
    const { nombre, especialidad, obras_sociales } = state;

    // LISTADO PROFESIONALES
    const [profesionales, setProfesionales] = useState(null);

    useEffect(() => {
        profesionalesList();
    }, []);

    async function profesionalesList() {
        try{
            const profesionalesData = await ProfesionalesServices.traerProfesionales(nombre, especialidad, obras_sociales);

            setProfesionales(profesionalesData);

        } catch(err) {
            new Error(err);
        }
    }
    
    return(
        <>
        <TitulosHeaders/>
        <Container style={{backgroundColor:'#F2F2F2'}} maxWidth="lg">
            <Box marginTop={5} marginBottom={3}>
                <Text
                    text='Profesionales'
                    fontSize="2em"
                    color="Black"
                    fontFamily="Lato"
                    fontWeight="bold"
                    textAlign="Left"
                />

                <Text
                    text='Listado'
                    fontSize="1em"
                    color="grey"
                    fontFamily="Lato"
                    fontWeight="700"
                    textAlign="Left"
                />

               <Box my={2}>
                    <Divider />
               </Box>
               <Grid>
               <p>Resultado de la búsqueda: <b>{nombre && nombre + ' '} {especialidad && especialidad + ' '} {obras_sociales && obras_sociales}</b></p>
               </Grid>
                
                <Grid display={'flex'} container flexDirection={'row'} flexWrap={'nowrap'} lg={12} width={'100%'}>
                    
                    <Grid item lg={10} md={10} sx={12} width={'100%'}>
                        <Box marginTop={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={{ xs: "center", lg: "start" }}>
                        {
                            profesionales && profesionales.length > 0 ? (
                                profesionales.map((profesional) => (
                                    <CardProfesional
                                        colorText={'black'}
                                        nombre={profesional.nombre}
                                        apellido={profesional.apellido}
                                        especialidad={profesional.especialidad}
                                        colorEspecialidad={'#21AEC8'}
                                        sizeEspecialidad={'1em'}
                                        textButton="Agendar cita"
                                        url={`/profesionales/${profesional._id}`}
                                        subespecialidad={profesional.subespecialidad}
                                        subcolorEspecialidad={'grey'}
                                        subsizeEspecialidad={'1em'}
                                        avatar={profesional.avatar != '' ? './../../avatares/' + profesional.avatar : null}
                                        inicialesProfesional={profesional.nombre.charAt(0).toUpperCase() + ' ' + profesional.apellido.charAt(0).toUpperCase()}
                                        colorAvatar={profesional.color_avatar}
                                        lugarNombre={profesional.nombre_consultorio}
                                    />
                                ))
                            ) : (
                                <Text
                                    text={'No se han encontrado resultados para esta búsqueda. Intente nuevamente.'}
                                    fontSize={'1.1em'}
                                    fontFamily="Lato"
                                    fontWeight="400"
                                    color={'black'}
                                />
                            )
                        }
                        
                        </Box>
                    </Grid>
                    <Grid item lg={2} md={3} sx={12} ml={2} mr={0} display={{ xs: "none", lg: "flex" }}>
                        <Publicidad/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </>
    )
}

export default InicioPage