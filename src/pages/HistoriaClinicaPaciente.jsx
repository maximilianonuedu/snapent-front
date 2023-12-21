// REACT
import { Container, Grid, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Text from "../components/Text/Text";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders';
import * as React from 'react';
import CardProfesional from "../components/CardProfesionales/CardProfesional";

// SERVICES
import * as usuariosService from './../services/usuarios.services';
import * as historiasClinicasService from './../services/historias_clinicas.services';
import * as profesionalesService from './../services/profesionales.services';

// ICONS
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

function HistoriaClinicaPaciente() {
    const {id} = useParams();

    // TRAER DATOS USUARIO
    const [usuario, setUsuario] = useState(null);
    const [historiasArray, setHistorias] = useState([]);

    async function traerDatos() {
        try {
            const data = await usuariosService.traerUsuarioPorId(id);
            setUsuario(data);

            const historias = await historiasClinicasService.traerHistoriasPorID(id);

            for (let i = 0; i < historias.length; i++) {
                const profesional = await profesionalesService.traerProfesionalPorId(historias[i].id_profesional);

                historias[i].profesional = profesional;
                
            }

            setHistorias(historias);

        } catch(err) {
            new Error(err);
        }
    }

    useEffect(() => {
        traerDatos().then(res => {
            console.log('Datos cargados con éxito.');
            console.log(historiasArray[0]);
        })
        .catch(err => {
            new Error(err);
        });
    }, [id])

    return (
        <>
            <TitulosHeaders
                titulo='Historia Clínica'
                icon={<MonitorHeartIcon fontSize='large' color='white'
                />}
            />

            {usuario ? (
                <Container maxWidth='lg'>
                    <Grid columns={12} my={5} display='flex' flexDirection='row' container>
                        <Grid columns={{lg: 12, md: 12, xs: 12}} mb={3} item width={'100%'}>
                            <Paper sx={{ boxShadow: 2,  borderRadius: 2}}>
                                <Grid display='flex' flexDirection='row' justifyContent={'space-between'} alignItems={'center'} p={3}>
                                    <Box mb={0}>
                                        <Text
                                            text = 'Datos médicos'
                                            fontSize="1.3em"
                                            fontFamily="Lato"
                                            marginBottom=".5em"
                                            fontWeight="600"
                                        />
                                    </Box>

                                    <Grid display='flex' flexDirection='row'>
                                        <Grid display='flex' flexDirection='column' justifyContent={'flex-start'} alignItems='center' pt={2} pr={3}>
                                            <Text
                                                text='Obra Social'
                                                fontSize="1.2em"
                                                fontFamily="Lato"
                                                fontWeight="400"
                                                marginBottom=".3em"
                                                color='black'
                                            />

                                            <Text
                                                text={usuario.obra_social}
                                                fontSize="1em"
                                                fontFamily="Lato"
                                                fontWeight="400"
                                                color='grey'
                                            />
                                        </Grid>

                                        <Grid display='flex' flexDirection='column' justifyContent={'flex-start'} alignItems='center' pt={2} pr={3}>
                                            <Text
                                                text='Peso'
                                                fontSize="1.2em"
                                                fontFamily="Lato"
                                                fontWeight="400"
                                                marginBottom=".3em"
                                                color='black'
                                            />

                                            <Text
                                                text={usuario.peso + ' kg'}
                                                fontSize="1em"
                                                fontFamily="Lato"
                                                fontWeight="400"
                                                color='grey'
                                            />
                                        </Grid>

                                        <Grid display='flex' flexDirection='column' justifyContent={'flex-start'} alignItems='center' pt={2} pr={3}>
                                            <Text
                                                text='Altura'
                                                fontSize="1.2em"
                                                fontFamily="Lato"
                                                fontWeight="400"
                                                marginBottom=".5em"
                                                color='black'
                                            />

                                            <Text
                                                text={usuario.altura + ' cm'}
                                                fontSize="1em"
                                                fontFamily="Lato"
                                                fontWeight="400"
                                                color='grey'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid container display='flex' flexDirection='row' flexWrap={'wrap'} justifyContent="space-between" columns={12} width='100%'>
                            {historiasArray.map((historia) => (
                                <Grid columns={6} item width={'100%'} >
                                    <CardProfesional
                                        colorText={'black'}
                                        nombre={historia.profesional.nombre}
                                        apellido={historia.profesional.apellido}
                                        especialidad={historia.profesional.especialidad}
                                        colorEspecialidad={'#21AEC8'}
                                        sizeEspecialidad={'1em'}
                                        subespecialidad={historia.profesional.subespecialidad}
                                        subcolorEspecialidad={'grey'}
                                        subsizeEspecialidad={'1em'}
                                        avatar={historia.profesional.avatar != '' ? './../../avatares/' + historia.profesional.avatar : null}
                                        inicialesProfesional={historia.profesional.nombre.charAt(0).toUpperCase() + ' ' + historia.profesional.apellido.charAt(0).toUpperCase()}
                                        colorAvatar={historia.profesional.color_avatar}
                                        imgs={historia.archivos}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            ) : (
                <Grid container columns={12} display={'flex'} justifyContent={'center'} alignItems={'center'}> 
                    <Box minWidth={100} minHeight={100} justifyContent={'center'} alignItems={'center'}>
                        <CircularProgress disableShrink />
                    </Box>
                </Grid>
            )}
        </>
    )
}

export default HistoriaClinicaPaciente