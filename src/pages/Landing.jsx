// REACT
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders';

import backgroundTextura from './../assets/imgs/backgroundTextura.svg';
import { useParams } from 'react-router';
import { useState, useEffect } from "react";

import { Grid, Typography, Box, Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Buscador from './../components/Buscador/Buscador';
import Text from '../components/Text/Text';
import backgroundSidebar from '../assets/imgs/sidebar-background.svg';
import Link from '@mui/material/Link';
import ScrollDown from '../components/ScrollDown/Scrolldown';

// CSS
import './Login.css';
import imagenApartado1 from './../assets/imgs/img-apart1.png';
import imagenApartado2 from './../assets/imgs/img-apart2.png';
import imagenApartado3 from './../assets/imgs/img-apart3.png';

// ICONS
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';




const styles ={
   uno:{
        fontFamily:'Lato',
        fontSize:'1.5em',
        fontWeight:'300',
        color:'#555555'
   },
   salud:{
    color:'#ee7411',
    fontWeight:'600',
   },
   confidencialidad:{
    color:'#2c70b7',
    fontWeight:'600',
   },
   rapidez:{
    color:'#30bad2',
    fontWeight:'600',
   }
}

function Landing() {

    return(
        <Grid container justifyContent={'center'}  style={{height:'100%'}}>
            
        <Grid
            width={'100%'}
            container 
            columns={12}
            className='landing' 
            flexDirection={'row'}
            flexWrap={'nowrap'}
            display={'flex'}
            alignItems='center'
            >


               
               <Container style={{height:'100vh', display:'flex'}} maxWidth="lg">
                    <Grid item display={'flex'} style={{ width:'100%'}} alignItems={'start'} justifyContent={'space-around'} mt={{lg:5,md:5,sm:10}} m={{lg:5,md:5,sm:2}} flexDirection={'column'}>
                           <Grid display={'flex'} flexDirection={'column'} mt={{lg:20,md:15,sm:'100px'}}>
                                 <Text
                                    text="Tu salud"
                                    fontFamily="Lato"
                                    fontSize="3.5em"
                                    color="#fff"
                                    fontWeight="bold"
                                    textAlign="left"
                                    margin="20px"
                                />
                                <Text
                                    text="EN UNA SOLA PLATAFORMA"
                                    fontFamily="Lato"
                                    fontSize="2.6em"
                                    color="#fff"
                                    fontWeight="300"
                                    textAlign="left"
                                    margin="20px"
                                />

                            <Grid columns={12}>
                                <Grid width={'100%'}
                                    columns={{
                                        lg: 10,
                                        md: 10,
                                        xs: 12
                                    }}
                                        flexWrap={'nowrap'}
                                    container pt={3} pb={0} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                    <Grid spacing={1}>
                                        <Paper elevation={2} style={{padding:10, display:'flex',flexShrink:4 ,backgroundColor:'#ee7411', color:'white', textAlign:'center', borderRadius:"10px", flexDirection:'column', minWidth:'10%'}}>
                                            <Typography variant='h4'>+ 250</Typography>
                                            <Typography variant='subtitle2'>Profesionales</Typography>
                                        </Paper>
                                    </Grid>

                                    <Grid spacing={1}>
                                        <Paper elevation={2} style={{padding:10, display:'flex' ,flexShrink:4 ,backgroundColor:'#2c70b7', color:'white', textAlign:'center', borderRadius:"10px", flexDirection:'column',  minWidth:'10%'}}>
                                            <Typography variant='h4'>+ 75</Typography>
                                            <Typography variant='subtitle2'>Especialidades</Typography>
                                        </Paper>
                                    </Grid>

                                    <Grid spacing={1}>
                                        <Paper elevation={2} style={{padding:10, display:'flex' ,flexShrink:4 ,backgroundColor:'#30bad2', color:'white', textAlign:'center', borderRadius:"10px", flexDirection:'column',  minWidth:'10%'}}>
                                            <Typography variant='h4'>+ 500</Typography>
                                            <Typography variant='subtitle2'>Obras sociales</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid my={4} columns={12} display={'flex'} justifyContent={'center'} width={'100%'}>
                            <ScrollDown/>
                        </Grid>
                        
                    </Grid>
               </Container>
           
        </Grid>

        <Grid
            width={'100%'}
            container 
            columns={12}
            className='apartado1' 
            flexDirection={'row'}
            flexWrap={'nowrap'}
            display={'flex'}
            alignItems='center'
        >
            <Container style={{height:'100vh'}} maxWidth="xl">
                <Grid columns={{lg:12}} display={'flex'} flexWrap={'wrap'} flexDirection={'row'} container p={4}>
                    <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} lg={7} md={7} xs={12}>
                        <img style={{maxWidth:'70%',height: 'auto', padding: 0,margin: 0,}}  src={imagenApartado1} />
                    </Grid>

                    <Grid item display={'flex'} justifyContent={'center'} flexDirection={'column'} lg={5} md={5} xs={12}>
                       <Box mt={3}>
                            <Text
                                    text="¿Qué ofrecemos?"
                                    fontFamily="Lato"
                                    fontSize="2.4em"
                                    color="#555555"
                                    fontWeight="bold"
                                    textAlign="left"
                                    margin="20px"
                                />
                       </Box>
                        <Text
                            text="En Snapent, estamos comprometidos con la transformación digital del cuidado de la salud. Nuestra aplicación no solo simplifica la reserva de turnos médicos, sino que también ofrece a los pacientes acceso inmediato a su historial clínico en un formato digital fácil de usar."
                            fontFamily="Lato"
                            fontSize="1.5em"
                            color="#555555"
                            fontWeight="300"
                            textAlign="left"
                            margin="20px"
                        />
                    </Grid>

                </Grid>
            </Container>
        </Grid>

        <Grid
            width={'100%'}
            container 
            columns={12}
            className='apartado2' 
            flexDirection={'row'}
            flexWrap={'wrap'}
            display={'flex'}
            alignItems='center'
        >
            <Container  maxWidth="lg">
                <Grid columns={{lg:12}} display={'flex'} flexWrap={'wrap'} flexDirection={'row'} container p={4}>
                    <Grid item display={'flex'} justifyContent={'center'} flexDirection={'column'}  lg={5} md={5} xs={12}>
                       <Box mb={3}>
                            <Text
                                    text="Valores"
                                    fontFamily="Lato"
                                    fontSize="3em"
                                    color="#555555"
                                    fontWeight="bold"
                                    textAlign="left"
                                    margin="20px"
                                />
                       </Box>

                        <Box mb={3}>
                            <p style={styles.uno}>
                                Nuestros <b>3 valores principales</b> como marca son: <span style={styles.salud}>Salud</span>, <span style={styles.confidencialidad}>Confidencialidad</span> y <span style={styles.rapidez}>Rapidez</span>.
                            </p>
                        </Box>

                        <Box mb={3}>
                            <p style={styles.uno}>
                                 Cada función de Snapent se diseña en la mejora y el mantenimiento de la salud de nuestros usuarios.
                            </p>
                        </Box>
                       
                        <Box mb={3}>
                            <p style={styles.uno}>
                                En Snapent, implementamos rigurosas medidas de seguridad para garantizar la confidencialidad de la información médica de nuestros usuarios.
                            </p>
                        </Box>
                       
                        <Box mb={3}>
                            <p style={styles.uno}>
                                Nuestra plataforma está diseñada para ofrecer un proceso de reserva de citas médicas rápido y eficiente.
                            </p>
                        </Box>

                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} lg={7} md={7} xs={12}>
                        <img style={{maxWidth:'90%',height: 'auto', padding: 0,margin: 0,}}  src={imagenApartado2} />
                    </Grid>
                </Grid>
            </Container>
        </Grid>

        <Grid
            width={'100%'}
            container 
            columns={12}
            className='apartado3' 
            flexDirection={'row'}
            flexWrap={'wrap'}
            display={'flex'}
            alignItems='center'
        >
            <Container style={{ display:'flex', alignItems:'center'}} maxWidth="xl">
                <Grid columns={{lg:12}} display={'flex'} justifyContent={'center'} xs={{flexWrap:'nowrap'}} lg={{flexWrap:'wrap'}}  flexDirection={'row'} container p={4}>
                    <Grid  display={'flex'} justifyContent={'center'} width={'100%'} alignItems={'center'} flexDirection={'column'} lg={6} md={6} xs={12}>
                        <Grid sx={{mb:4}} display={'flex'} justifyContent={'flex-start'}>
                            <Text
                                text="Registra tu turno donde y cuando quieras"
                                fontFamily="Lato"
                                fontSize="1.8em"
                                color="#fff"
                                fontWeight="bold"
                                textAlign="left"
                                
                            />
                        </Grid>
                        <Grid justifyContent={'center'} alignItems={'center'} width={'100%'} flexDirection={'column'} p={0}>
                            <Box sx={{ boxShadow: 2,  borderRadius: 2, backgroundColor:'#fff', padding:2, width:'225px', mb:3}} lg={{marginLeft:0}}>
                                <Text
                                    text="01"
                                    fontFamily="Lato"
                                    fontSize="1em"
                                    color="#555555"
                                    fontWeight="300"
                                    textAlign="left"
                                    margin="20px"
                                />
                                <Text
                                    text="Registro rápido"
                                    fontFamily="Lato"
                                    fontSize="1.5em"
                                    color="#555555"
                                    fontWeight="500"
                                    textAlign="left"
                                    margin="20px"
                                />
                            </Box>
                            <Box sx={{ boxShadow: 2,  borderRadius: 2, backgroundColor:'#fff', padding:2, width:'225px', mb:3, marginLeft:5}} lg={{marginLeft:0}}>
                                <Text
                                    text="02"
                                    fontFamily="Lato"
                                    fontSize="1em"
                                    color="#555555"
                                    fontWeight="300"
                                    textAlign="left"
                                    margin="20px"
                                />
                                <Text
                                    text="Fácil de usar"
                                    fontFamily="Lato"
                                    fontSize="1.5em"
                                    color="#555555"
                                    fontWeight="500"
                                    textAlign="left"
                                    margin="20px"
                                />
                            </Box>
                            <Box sx={{ boxShadow: 2,  borderRadius: 2, backgroundColor:'#fff', padding:2, width:'240px', mb:3, marginLeft:10}} lg={{marginLeft:10}}>
                                <Text
                                    text="03"
                                    fontFamily="Lato"
                                    fontSize="1em"
                                    color="#555555"
                                    fontWeight="300"
                                    textAlign="left"
                                    margin="20px"
                                />
                                <Text
                                    text="Datos protegidos"
                                    fontFamily="Lato"
                                    fontSize="1.5em"
                                    color="#555555"
                                    fontWeight="500"
                                    textAlign="left"
                                    margin="20px"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'end'} alignItems={'end'} flexDirection={'column'}  lg={6} md={6} xs={12}>
                        <img style={{maxWidth:'100%',height: 'auto', padding: 0,margin: 0}}  src={imagenApartado3} />
                    </Grid>
                </Grid>
            </Container>
        </Grid>
           
           
    
            
        </Grid>
        
    )
}

export default Landing