// REACT
import React from "react";
import { Container, Grid, Paper, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Text from "../components/Text/Text";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

// SERVICES
import * as historiasClinicasServices from './../services/historias_clinicas.services';
import * as usuariosServices from './../services/usuarios.services';

function HistorialPacientes() {
    const {id} = useParams();
    const[historiasClinicas, setHistoriasClinicas] = useState(null);

    async function traerHistorias() {
        try{
            const historias = await historiasClinicasServices.traerHistoriasPorProfesional(id);

            for (let i = 0; i < historias.length; i++) {
                const usuario = await usuariosServices.traerUsuarioPorId(historias[i].id_paciente);

                historias[i].usuario = usuario;
                
            }

            setHistoriasClinicas(historias);

        } catch(err) {
            new Error(err);
        }
    }

    useEffect(() => {
        traerHistorias();
    }, [id]);

    return(
        <Container>
            <Grid pt={3}>
            {historiasClinicas ? (
                <>
                   {historiasClinicas.map((historiaClinica) => (
                     <Grid columns={12} display='flex' flexDirection='column' justifyContent='space-around'>
                        
                            <Grid display='flex' flexDirection='column' width={'100%'}>
                                <Grid display={'flex'} width={'100%'} flexDirection={'row'} alignItems={'center'} mb={2}>
                                    <Grid width={'100%'} mr={0} p={0}>
                                    
                                         {
                                            historiasClinicas ? (
                                                <Grid columns={12} m={0} p={0} width={'100%'} display='flex' flexDirection='column' justifyContent='space-around'>
                                                            <Paper sx={{ boxShadow: 2,  borderRadius: 2, marginBottom:0}}>
                                                                <Grid display='flex' flexDirection='column' width={'100%'}  p={3}>
                                                            
                                                                    <Grid display='flex' flexDirection={{ xs: "column", lg: "row" }} justifyContent={'space-between'}>
                                                                        <Grid display={'flex'} flexDirection={{ xs: "column", lg: "row" }} alignItems={'center'} mb={0} marginBottom={{ xs:3, lg: 0 }}>
                                                                            <Grid mr={2}>
                                                                                {historiaClinica.usuario.avatar != '' ? ( 
                                            
                                                                                <Avatar sx={{ width: 40, height: 40, fontSize:15, backgroundColor: historiaClinica.usuario.color_avatar }} src={'./../../avatares/' + historiaClinica.usuario.avatar}>{historiaClinica.usuario.nombre.charAt(0).toUpperCase()} {historiaClinica.usuario.apellido.charAt(0).toUpperCase()}</Avatar>
                                            
                                                                                ) : (
                                            
                                                                                <Avatar sx={{ width: 40, height: 40, fontSize:15, backgroundColor: historiaClinica.usuario.color_avatar }}>{historiaClinica.usuario.nombre.charAt(0).toUpperCase()} {historiaClinica.usuario.apellido.charAt(0).toUpperCase()}</Avatar>
                                            
                                                                                )} 
                                                                            </Grid>
                                                                            <Text
                                                                            text ={historiaClinica.usuario.nombre + ' ' + historiaClinica.usuario.apellido}
                                                                            fontSize="1.3em"
                                                                            fontFamily="Lato"
                                                                            margin="3px"
                                                                            fontWeight="600"
                                                                            marginBottom=".5em"
                                                                            />
                                                                        </Grid>
                                        
                                        
                                                                        <Grid display='flex' columns={12}  flexDirection={{ xs: "column", lg: "row" }} justifyContent={'space-between'}>
                                                                            <Grid columns={{lg:4}} display='flex' flexDirection={{ xs: "row", lg: "column" }} justifyContent={{ xs: "space-between", lg: "start" }} mr={3}>
                                                                                <Text
                                                                                    text='Email'
                                                                                    fontSize="1em"
                                                                                    fontFamily="Lato"
                                                                                    fontWeight="400"
                                                                                    color='black'
                                                                                    marginBottom=".3em"
                                                                                />
                                            
                                                                                <Text
                                                                                    text={historiaClinica.usuario.email}
                                                                                    fontSize="1em"
                                                                                    fontFamily="Lato"
                                                                                    fontWeight="400"
                                                                                    color='grey'
                                                                                />
                                                                            </Grid>
                                        
                                                                            <Grid columns={{lg:4}} display='flex' flexDirection={{ xs: "row", lg: "column" }} mr={3}>
                                                                                <Text
                                                                                    text='Teléfono'
                                                                                    fontSize="1em"
                                                                                    fontFamily="Lato"
                                                                                    fontWeight="400"
                                                                                    marginBottom=".3em"
                                                                                    color='black'
                                                                                />
                                            
                                                                                <Text
                                                                                    text={historiaClinica.usuario.telefono}
                                                                                    fontSize="1em"
                                                                                    fontFamily="Lato"
                                                                                    fontWeight="400"
                                                                                    color='grey'
                                                                                />
                                                                            </Grid>
                                        
                    
                                                                        
                                                                            <Grid  display='flex' flexDirection={{ xs: "row", lg: "column" }}>
                                                                                <Text
                                                                                    text='Obra Social'
                                                                                    fontSize="1em"
                                                                                    fontFamily="Lato"
                                                                                    fontWeight="400"
                                                                                    marginBottom=".3em"
                                                                                    color='black'
                                                                                />
                                            
                                                                                <Text
                                                                                    text={historiaClinica.usuario.obra_social}
                                                                                    fontSize="1em"
                                                                                    fontFamily="Lato"
                                                                                    fontWeight="400"
                                                                                    color='grey'
                                                                                />
                                                                            </Grid>
                                        
                                                                           
                                                                        </Grid>
                                                                            <Link to={'/panel/historiaClinica/'+historiaClinica.id_paciente}><Button>Historia clínica</Button></Link>
                                                                    </Grid>
                                                                </Grid>
                                                            </Paper>
                                                        </Grid>
                                            ) : 
                                            (
                                                <Text
                                                    text='No cuentas con historiales clínicos.'
                                                    fontSize="1em"
                                                    fontFamily="Lato"
                                                    fontWeight="400"
                                                    marginBottom=".3em"
                                                    color='black'
                                                />
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                       
                     </Grid>
                   ))
                   }
                </>

            ):(
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} height={'80vh'}>
                    <Grid item>
                        <CircularProgress disableShrink/>
                    </Grid>  
                </Grid>
            )
            }
            </Grid>
        </Container>
    );
}

export default HistorialPacientes