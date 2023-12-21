// REACT
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PersonIcon from '@mui/icons-material/Person';
import UsuarioSidebar from '../components/UsuarioSidebar/UsuarioSidebar';
import { useParams } from 'react-router';

// PAGES
import CalendarioProfesional from './CalendarioProfesional.jsx';
import PerfilProfesionalPage from './PerfilProfesionalPage.jsx';
import CambiarClave from '../components/CambiarClave/CambiarClave.jsx';
import ObrasSocialesProfesional from './ObrasSocialesProfesional.jsx';
import GestioAgendaProfesional from './GestionAgendaProfesional.jsx';
import HistorialPacientes from './HistorialPacientes.jsx';

// SERVICES
import * as profesionalesServices from './../services/profesionales.services.js';

const styles = {
    tab: {
        display:'flex', 
        justifyContent:"left", 
        backgroundColor:'rgb(243, 246, 249)', 
        borderRadius:15, 
        padding:8,
        marginBottom:15
    },
   
}

function PanelProfesional() {
    const{id} = useParams();
    const[profesional, setProfesional] = useState('');

    useEffect(() => {
        profesionalesServices.traerProfesionalPorId(id)
            .then(res => {
                setProfesional(res);
            })
            .catch(err => {
                new Error(err);
            });
    }, [id])

    // MENU PANEL PROFESIONAL
    const [value, setValue] = useState('Calendario');
    const [isMobile, setIsMobile] = useState(false);

    window.onresize = function handleWidth(){
        if(window.innerWidth <= 900) {
            setIsMobile(true);
        }else{
            setIsMobile(false);
        }
        console.log("WIDTH",window.innerWidth);
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }

    return(
        <>
            <TitulosHeaders
                titulo='Panel'
                icon={<AdminPanelSettingsIcon fontSize='large' color='white'
                />}
            />
            
            <TabContext value={value}>
                <Container maxWidth="xl" padding={{ xs: 0, lg: 2 }}>
                    <Grid container display={'flex'} p={0} flexDirection={'row'} flexWrap={{lg:'nowrap', md:'nowrap', xs:'wrap'}} >
                        <Grid item lg={2} m={0} sm={12} style={{backgroundColor:'#fff', overflow:'hidden'}} mb={{ xs:3, lg:0 }}>
                            <Box pt={0} >
                                <Grid p={3}>
                                    <UsuarioSidebar
                                        usuario={profesional.nombre + ' ' + profesional.apellido}
                                        dni={'MN: ' + profesional.matricula}
                                    />
                                </Grid>
                                
                                <TabList
                                    sx={{
                                        "& button": { borderRadius: 2 },
                                        "& button:hover": { backgroundColor: "blue" },
                                        "& button:focus": { backgroundColor: "yellow" },
                                        "& button:active": { backgroundColor: "green" }
                                    }}
                                    inkBarStyle={{background: 'blue'}}
                                    style={{padding:13}}
                                    centered
                                    position="fixed"
                                    textColor='orange'
                                    variant={ isMobile ? 'scrollable' : 'standard' }
                                    scrollButtons={ isMobile ? true : false }
                                    allowScrollButtonsMobile={ isMobile ? true : false }
                                    onChange={handleChange} orientation={isMobile ? 'horizontal' : 'vertical'}>
                                    <Tab style={styles.tab} icon={<CalendarMonthIcon sx={{fontSize: '1.5em'}} />} iconPosition="start" label="Calendario" value="Calendario" />

                                    <Tab style={styles.tab} icon={<PeopleAltIcon sx={{fontSize: '1.5em'}}/>} iconPosition="start" label="Pacientes" value="Pacientes" />

                                    <Tab style={styles.tab} icon={<CreditCardIcon sx={{fontSize: '1.5em'}}/>} iconPosition="start" label="Obras sociales" value="Obras sociales" />

                                    <Tab style={styles.tab} icon={<EditCalendarIcon sx={{fontSize: '1.5em'}}/>} iconPosition="start" label="Gestión de agenda" value="Gestión de agenda" />

                                    <Tab style={styles.tab}  icon={<PersonIcon sx={{fontSize: '1.5em'}}/>} iconPosition="start" label="Editar perfil" value="Editar perfil" />
                                </TabList>
                            </Box>
                        </Grid>

                        <Grid item lg={10} md={10} sm={12} p={0}>
                            <Box padding={0}>
                                <TabPanel sx={{padding:0}} value="Calendario">
                                    <CalendarioProfesional/>
                                </TabPanel>

                                <TabPanel value="Pacientes">
                                    <HistorialPacientes/>
                                </TabPanel>

                                <TabPanel value="Obras sociales">
                                    <ObrasSocialesProfesional/>
                                </TabPanel>

                                <TabPanel value="Gestión de agenda">
                                    <GestioAgendaProfesional/>
                                </TabPanel>

                                <TabPanel value="Editar perfil">
                                    <Grid display={'flex'} flexDirection={{lg:'row', md:'row', xs:'column'}} container spacing={5}>
                                        <Grid
                                            lg={6} md={6} xs={12}
                                            item
                                        >
                                            <PerfilProfesionalPage/>
                                        </Grid>

                                        <Grid
                                            lg={6} md={6} xs={12}
                                            item
                                        >
                                            <CambiarClave/>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </TabContext>
        </>
    )
}
    
export default PanelProfesional