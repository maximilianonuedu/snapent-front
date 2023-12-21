// REACT
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {useNavigate}  from 'react-router-dom';
import Button from '@mui/material/Button';
import ReservaTurnos from './ReservaTurnos.jsx';
import { Grid,Container } from '@mui/material';
import AlertSnapent from '../components/Alert/Alert.jsx';
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders.jsx';
import Text from '../components/Text/Text.jsx';
import Publicidad from '../components/Publicidad/Publicidad.jsx';
import Avatar from '@mui/material/Avatar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// SERVICES
import * as ProfesionalesServices from './../services/profesionales.services.js';
import * as TurnosServices from './../services/turnos.services.js';
import * as historiasClinicasServices from './../services/historias_clinicas.services.js';
import * as consultoriosService from './../services/consultorios.services.js';

// GLOBAL
import * as formatoFecha from '../../global/formatoFecha.js';

// ICONS
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function DetalleProfesionalPage() {
    // GENERAL
    const navigate = useNavigate()
    const {id} = useParams();
    const [profesional, setProfesional] = useState(null);

    // TRAER INFO PROFESIONAL
    useEffect(() => {
        ProfesionalesServices.traerProfesionalPorId(id)
            .then(data => { 
                if(data){
                    consultoriosService.traerConsultorioPorId(data.id_consultorio)
                        .then((rta) => {
                            data.consultorio = rta;
                            setProfesional(data);
                        })

                }
            })
            .catch(err => {
                navigate('/404')
            })
            
    }, [])

    // RESERVA DE TURNOS

    // DATO FECHA
    const [fechaRecibida, setFechaRecibida] = useState(false);
    const [fechaRecibidaLectura, setFechaRecibidaLectura] = useState(null);
    const [fechaDatoEnviar, setFechaDatoEnviar] = useState(null);

    // DATO HORA
    const [HoraRecibida, setHoraFechaRecibida] = useState(false);
    const [HoraRecibidaLectura, setHoraFechaRecibidaLectura] = useState(null);

    useEffect(() => {
        setFechaRecibidaLectura(fechaRecibida);
        setHoraFechaRecibidaLectura(HoraRecibida);
    },[fechaRecibida,HoraRecibida])
    
    let fechas = (fechas) =>{ 
        if (fechas) {
            setFechaRecibidaLectura(fechas.dia.toLocaleDateString('es', { weekday:"long", year:"numeric", month:"short", day:"numeric"}));
            setFechaRecibida(true); 
            setFechaDatoEnviar(formatoFecha.formatoFechaFullCalendar(fechas.dia));

            let horario2Digitos = (fechas.horarioMinutos < 10 ? '0' : '') + fechas.horarioMinutos;

            setHoraFechaRecibidaLectura(fechas.horarioHoras + ':' + horario2Digitos);
            setHoraFechaRecibida(true);

        } else {
            setFechaRecibida(false);
            setHoraFechaRecibida(false);
        }
    };

    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);

    function reservarTurno() {
        let idProfesional = profesional._id;
        let idPaciente = localStorage.getItem('usuario_id');
        let especialidad = profesional.especialidad;
        let archivos = ["ejemplo_receta.jpg", "ejemplo_estudio.png"];

        let idUser = localStorage.getItem('usuario_id');
    
        TurnosServices.reservar({fechaDatoEnviar, HoraRecibidaLectura, idProfesional, idPaciente})
            .then(() => {
                historiasClinicasServices.crearHistoriaClinica({idProfesional, idPaciente, especialidad, archivos})
                    .then(() => {
                        setValidador(true);

                        setTimeout(() => {
                            navigate('/turnos/' + idUser);              
                        }, 1000);
                    })
            })
            .catch (() => {
                setValidador2(true);
            })
    }

    // COMPARO DIA Y HORARIO SELECCIONADO CON TURNOS RESERVADOS
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [validador3, setValidador3] = useState(false);
    const [validador4, setValidador4] = useState(false);

    useEffect(() => {
        horariosDisponibles();
    },[fechaDatoEnviar, HoraRecibidaLectura])

    function horariosDisponibles() {
        setBtnDisabled(false);

        TurnosServices.traerTurnos()
            .then((data) => {
                if(localStorage.getItem('usuario_id')) {
                    for (let i = 0; i < data.length; i++) {      
                        if(fechaDatoEnviar == data[i].fecha && HoraRecibidaLectura == data[i].hora) {
                            setBtnDisabled(true);
                            setValidador3(true);
                        }
                    }
                } else {
                    setBtnDisabled(true);
                    setValidador4(true);
                }
            })
            .catch((err) => {
                new Error(err)
            })
    }

    const style = {
        btnConfirm:{
            color:'#ffff'
        }
     };

    return(
        <Grid style={{ padding:0}} mt={0}>
            <TitulosHeaders
                titulo="Rerserva de turnos"
                icon={<AccessTimeIcon fontSize='large' color='white'/>}
            />

            <Container maxWidth="lg" style={{mt:3}}>
                <Grid mt={3}>
                    <Box sx={{ boxShadow:2, backgroundColor:'#fff', borderRadius:2, padding:3}}>
                    {
                            profesional && ((
                                <Grid display={'flex'} flexDirection={{ xs: "column", lg: "row" }} >
                                    <Grid display='flex' flexDirection='row' justifyContent={'start'} alignItems='center' width={'100%'} columns={{lg:6, md:6, xs:12}}>
                                        {profesional.avatar != '' ? ( 

                                            <Avatar sx={{ width: 55, height: 55, fontSize:20, backgroundColor: profesional.color_avatar, marginRight: '.3em' }} src={'./../../avatares/' + profesional.avatar}>{profesional.nombre.charAt(0).toUpperCase()} {profesional.apellido.charAt(0).toUpperCase()}</Avatar>

                                        ) : (

                                            <Avatar sx={{ width: 55, height: 55, fontSize:20, backgroundColor: profesional.color_avatar, marginRight: '.3em' }}>{profesional.nombre.charAt(0).toUpperCase()} {profesional.apellido.charAt(0).toUpperCase()}</Avatar>

                                        )}

                                       <Grid display={'flex'} flexDirection={'column'}>
                                            <Text
                                                text={profesional.nombre + ' ' + profesional.apellido}
                                                color="#4D4D4D"
                                                fontfamily="Lato"
                                                fontWeight="400"
                                                fontSize="1.5em"
                                            />
                                            <Text
                                                text={profesional.especialidad  + ' (MN: ' + profesional.matricula + ')'}
                                                color="#4D4D4D"
                                                fontfamily="Lato"
                                                fontWeight="300"
                                                fontSize="1em"
                                            />
                                       </Grid>
                                    </Grid>

                                   

                                   <Grid display={'flex'} columns={{lg:6, md:6, xs:12}} alignItems={{ xs: "start", lg: "center" }} 
                                   flexDirection={{ xs: "column", lg: "row" }} mt={{ xs: 3, lg: 0 }} width="100%">
                                        <Box display='flex' alignItems='center'>
                                            <LocationOnIcon color='orange' fontSize='large'/><b>Ubicación: </b>
                                        </Box>
                                        <Box ml={1}>
                                            {profesional.consultorio.nombre} - {profesional.consultorio.direccion}
                                        </Box>
                                   </Grid>
                                </Grid>
                            ))
                        }
                    </Box>
                </Grid>

                <Grid container  my={3} display={'flex'} justifyContent={'space-between'} flexDirection={'row'}> 
                    
                    <Grid item lg={4} md={4} xs={12} my={0}>
                        <Box mb={3}>
                            <Text
                                text="Horarios diponibles:"
                                color="#21AEC8"
                                fontfamily="Lato"
                                fontWeight="bold"
                                fontSize="2.5em"
                            />
                        </Box>
                        <Box sx={{ boxShadow:2, backgroundColor:'#fff', borderRadius:2, padding:3}}>
                            <Text
                                text={'Selecciona fecha y hora para su turno:'}
                                color="#21AEC8"
                                fontfamily="Lato"
                                fontWeight="500"
                                fontSize="1.3em"
                            />
                            <Box display={'flex'} justifyContent={'start'} width={'100%'}>
                                <ReservaTurnos fechas={fechas}/>
                            </Box>
                        </Box>
                    </Grid>
                    
                    <Grid item lg={4} md={4} xs={12} ml={{ xs: 0, lg:3 }} mt={{ xs: 4, lg:0 }}>
                        
                        {
                            fechaRecibida && HoraRecibida ?
                            (
                                <Box sx={{ boxShadow:2, backgroundColor:'#fff', borderRadius:2, padding:3}}>
                                <Box mb={2}>
                                    <Text
                                        text={'Fecha y hora seleccionados:'}
                                        color="#21AEC8"
                                        fontfamily="Lato"
                                        fontWeight="300"
                                        fontSize="1.3em"
                                    />
                                </Box>
                            {fechaRecibida ?
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2}>
                                        <CalendarMonthIcon sx={{ fontSize: 40 }}/> 
                                        <Text
                                            text={fechaRecibidaLectura}
                                            color="#005EAA"
                                            fontfamily="Lato"
                                            fontWeight="900"
                                            fontSize="1.5em"
                                        />
                                    </Box>
                             : 
                                <p>Seleccionar hora</p>
                             }

                            {fechaRecibida ?
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                        <AccessAlarmIcon sx={{ fontSize: 40 }}/>
                                        <Text
                                            text={HoraRecibidaLectura}
                                            color="#005EAA"
                                            fontfamily="Lato"
                                            fontWeight="900"
                                            fontSize="1.5em"
                                        />
                                    </Box> 
                                    
                             : 
                                <p>Seleccionar hora</p>
                             }
                            
                           
                            
                            </Box>
                            ):
                            null
                        }

                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} pt={3}>
                            <Button sx={style.btnConfirm} onClick={reservarTurno} variant="contained" fullWidth color="orange" disabled={btnDisabled ? true : false}>
                                CONFIRMAR
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item width={'100%'} lg={2} ml={{ xs:0, lg:0 }} display={{ xs: "none", lg: "flex" }}>
                        <Publicidad/>
                    </Grid>
                    
                </Grid>
            </Container>
        
            

            <Grid>
                <AlertSnapent
                    estado={validador}
                    cerrar={() =>{{setValidador(!validador)}}}
                    color="success"
                    closeIcon={false}
                    mensaje="Turno reservado con éxito."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador2}
                    cerrar={() =>{{setValidador2(!validador2)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="Error al reservar el turno. Intente nuevamente."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador3}
                    cerrar={() =>{{setValidador3(!validador3)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="El horario seleccionado ya se encuentra reservado."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador4}
                    cerrar={() =>{{setValidador4(!validador4)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="Debes iniciar sesión para reservar un turno."
                />
            </Grid>
        </Grid>
        
    )
}

export default DetalleProfesionalPage