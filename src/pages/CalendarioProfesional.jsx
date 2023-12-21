// REACT
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Text from '../components/Text/Text';
import { Grid, Paper } from '@mui/material';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AlertSnapent from '../components/Alert/Alert.jsx';
import { useParams } from 'react-router-dom';
import ModalInput from '../components/modal/ModalInput.jsx';
import fondoPopup from'../assets/imgs/fondo-popup.png';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Publicidad from '../components/Publicidad/Publicidad';
// IMGS
import fondo from '../../src/assets/imgs/fondo-principal2.jpg';
import farmacity from '../../src/assets/imgs/publicidad/farmacity.jpg';
import osde from '../../src/assets/imgs/publicidad/osde.png';
import swiss from '../../src/assets/imgs/publicidad/swiss.png';

// ICONS
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// FULLCALENDAR
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';

// SERVICES
import * as turnosService from './../services/turnos.services.js';
import * as usuariosService from './../services/usuarios.services.js';
import * as profesionalesService from './../services/profesionales.services.js';
import * as consultoriosService from './../services/consultorios.services.js';

// CSS
import './CalendarioProfesional.css';

// GLOBAL
import * as formatoHora from '../../global/formatoHora';
import * as formatoFecha from '../../global/formatoFecha.js';
import { date } from 'yup';

function CalendarioProfesional() {
    
    // CREAMOS ARRAY EVENTOS
    const {id} = useParams();
    const [turnos, setTurnos] = useState([]);
    let eventosArray = [];
    const [turnosCalendario, setTurnosCalendario] = useState([]);

    // PROXIMO TURNO + OBTENGO DATOS DIA DE HOY
    const [proximoTurno, setProximoTurno] = useState('');

    // GUARDO LOS DATOS PARA EL CALENDARIO + GUARDO DATA PROXIMO TURNO
    const [proxTurnoDatos, setProxTurnoDatos] = useState(null);
    const [proxTurnoDatosVacio, setProxTurnoDatosVacio] = useState(false);
    const [proxTurnoDatosVacioListo, setProxTurnoDatosVacioListo] = useState(false);
    const [cuando, setCuando] = useState('');

    async function traerDatos() {
        try{
            // DATA TURNOS
            const dataTurnos = await turnosService.traerTurnos(id);

            // PROXIMO TURNO
            let fechaHoy = formatoFecha.traerFechaHoy();
            let horaHoy = formatoHora.traerHoraHoy();
            let fechaMañana = formatoFecha.sumarDias(new Date(), 1);

            // FILTRO POR TURNOS DE HOY Y MAÑANA
            const turnosProx = dataTurnos.filter(turno => {
                return turno.fecha == fechaHoy || turno.fecha == formatoFecha.formatoFechaFullCalendar(fechaMañana);
            });

            for(let i=0; i<turnosProx.length; i++) {
                const usuario = await usuariosService.traerUsuarioPorId(turnosProx[i].id_paciente);
                const profesional = await profesionalesService.traerProfesionalPorId(turnosProx[i].id_profesional);
                const consultorio = await consultoriosService.traerConsultorioPorId(profesional.id_consultorio);

                turnosProx[i].hora = formatoHora.formatoHoraTimePicker(turnosProx[i].hora);

                turnosProx[i].paciente = usuario.nombre + ' ' + usuario.apellido;

                turnosProx[i].obraSocial = usuario.obra_social;

                turnosProx[i].ubicacion = consultorio.nombre;
            }

            // ORDENO TURNOS DEL MÁS CERCANO AL MÁS LEJANO
            const turnosProxOrdenados = turnosProx.slice().sort((a,b) => a.hora - b.hora);

            // CONDICIONALES
            const turnosMañana = [];
            const turnosHoy = [];

            for(let i=0; i<turnosProxOrdenados.length; i++) {
                // FORMATO HORA STRING
                turnosProxOrdenados[i].hora = formatoHora.formatoHoraString(turnosProxOrdenados[i].hora);
                
                // PREGUNTO SI TIENE FECHA DE HOY Y EL HORARIO ES > O = AL ACTUAL
                if(turnosProxOrdenados[i].fecha == fechaHoy) {

                    if(parseInt(turnosProxOrdenados[i].hora.split(":")[0]) == parseInt(horaHoy.split(":")[0]) && (parseInt(turnosProxOrdenados[i].hora.split(":")[1]) >= parseInt(horaHoy.split(":")[1]))) {
                        setCuando('Hoy');
    
                        setProxTurnoDatos(turnosProxOrdenados[i]);

                    } else if(parseInt(turnosProxOrdenados[i].hora.split(":")[0]) > parseInt(horaHoy.split(":")[0])) {
                        setCuando('Hoy');

                        setProxTurnoDatos(turnosProxOrdenados[i]);
                    }

                } else if(turnosProxOrdenados[i].fecha == formatoFecha.formatoFechaFullCalendar(fechaMañana)) {
                    setCuando('Mañana');

                    turnosMañana.push(turnosProxOrdenados[i]);

                    setProxTurnoDatos(turnosMañana[0]);

                } else {
                    setProxTurnoDatos(null);
                    setProxTurnoDatosVacio(true);
                }
            }

            // CREO ARRAY EVENTOS
            for(let i=0; i<dataTurnos.length; i++) {
            
                const usuario = await usuariosService.traerUsuarioPorId(dataTurnos[i].id_paciente);
                    
                dataTurnos[i] = {title: dataTurnos[i].hora + ' - ' + usuario.nombre + ' ' + usuario.apellido, hora: dataTurnos[i].hora, date: dataTurnos[i].fecha.replace("'", ""), className: 'info', paciente: usuario, idTurno: dataTurnos[i]._id};
                
                eventosArray.push(dataTurnos[i]);     
            }

        } catch(err) {
            new Error(err);
        }
    }
    
    useEffect(() => {
        traerDatos().then(res => {
            setTurnos(eventosArray);
        })
        .catch(err => {
            new Error(err);
        });
    }, [id]);

    useEffect(() => {
        setTurnosCalendario(turnos);
    }, [turnos]);

    useEffect(() => {
        setProxTurnoDatosVacioListo(true);
    }, [proxTurnoDatosVacio]);

    // EVENTOS CLICKEABLES
    const style = {
        box:{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            border: '0p',
            boxShadow: 24,
            p: 4,
            backgroundColor:'white!important',
            borderRadius:2,
            backgroundImage: 'url(' + fondoPopup + ')',
            backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            padding:7,
            width: '60%',
        }
     };

   const [open, setOpen] = useState(false);
   const handleClose = () => setOpen(false);

   let eventosFechaSeleccionada = [];
   const[turnosListos, setTurnosListos] = useState([]);
   const[eventosFechaSeleccionada2, setEventosFechaSeleccionada2] = useState(null);
   
   function handleOpen(fecha){ 
       for(let i=0; i<turnosCalendario.length; i++) {
           if(turnosCalendario[i].date === fecha) {
                turnos[i].idProfesional = id;
                eventosFechaSeleccionada.push(turnosCalendario[i]);
            }
        }

        if(eventosFechaSeleccionada.length > 0) {
            setTurnosListos(eventosFechaSeleccionada);
            setOpen(true);

        } else {
            setTurnosListos(null);
            setOpen(true);
        }
    };

    useEffect(() => {
        setEventosFechaSeleccionada2(turnosListos);
    }, [turnosListos]);

    // CANCELAR CITA
    const [openModalCancelar, setOpenModalCancelar] = useState(false);
    const handleCloseCancelar = () => setOpenModalCancelar(false);
    const [infoEvento, setInfoEvento] = useState(null);

    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    
    return(
        <>
            <Grid mt={{lg: 3}} display={'flex'} container flexDirection={'row'} flexWrap={'nowrap'} lg={12} width={'100%'} padding={0} paddingLeft={{ xs: "none", lg: 3 }}>
            
                <Grid item lg={10} width={'100%'}>
                   
                   <Grid container>
                    <Box sx={{ boxShadow: 2,  borderRadius: 2, backgroundColor:'#fff', padding:3, width:'100%', mb:3}}>
                            <Text
                                text="Próximo turno:"
                                fontSize="1em"
                                fontFamily="Lato"
                                fontWeight="bold"
                                margin="1em"
                            />
                            {proxTurnoDatos ? (
                                <Paper sx={{ boxShadow: 2,  borderRadius: 2,  padding:0, marginTop:2, marginBottom:0}} width={'20%'}>
                                    <CardMedia                   
                                        sx={{ padding:3, marginBottom:0 }}
                                        image={fondo}
                                        container display={'flex'} flexDirection={'row'} alignItems={'center'}
                                    >
                                        <Grid container display={'flex'} justifyContent={'space-between'} columns={3}>
                                            <Text
                                                text={cuando}
                                                fontSize="1em"
                                                fontFamily="Lato"
                                                fontWeight="bold"
                                                color="white"
                                            /> 

                                            <Text 
                                                text={proxTurnoDatos.hora + ' ' + formatoFecha.formatoFecha(proxTurnoDatos.fecha)}
                                                fontSize="1em"
                                                fontFamily="Lato"
                                                fontWeight="Regular"
                                                color="white"
                                            /> 

                                            <Grid container mt={2} display={'flex'} flexDirection={'column'}>
                                                <Grid display={'flex'} flexDirection={'row'}>
                                                        <Box mr={1}>
                                                            <Text 
                                                                text={'Obra social:'}
                                                                fontSize="1em"
                                                                fontFamily="Lato"
                                                                fontWeight="bold"
                                                                color="white"
                                                            /> 
                                                        </Box>
                                                        
                                                        <Text 
                                                            text={proxTurnoDatos.obraSocial}
                                                            fontSize="1em"
                                                            fontFamily="Lato"
                                                            fontWeight="Regular"
                                                            color="white"
                                                        /> 
                                                </Grid>

                                                <Grid display={'flex'} flexDirection={'row'}> 
                                                    <Box mr={1}>
                                                        <Text
                                                            text={'Paciente:'}
                                                            fontSize="1em"
                                                            fontFamily="Lato"
                                                            fontWeight="bold"
                                                            color="white"
                                                        />
                                                    </Box>

                                                    <Text 
                                                        text={proxTurnoDatos.paciente}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="Regular"
                                                        color="white"
                                                    /> 
                                                </Grid>

                                                <Grid display={'flex'} flexDirection={'row'}> 
                                                    <Box mr={1}>
                                                        <Text
                                                            text={'Ubicación:'}
                                                            fontSize="1em"
                                                            fontFamily="Lato"
                                                            fontWeight="bold"
                                                            color="white"
                                                        />
                                                    </Box>

                                                    <Text 
                                                        text={proxTurnoDatos.ubicacion}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="Regular"
                                                        color="white"
                                                    /> 
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardMedia>
                                </Paper>
                            ) : (
                                <Paper sx={{ boxShadow: 2,  borderRadius: 2, marginBottom:0, padding:0, marginTop:2}} width={'20%'}>
                                    <CardMedia                   
                                        sx={{ padding:3, marginBottom:0 }}
                                        image={fondo}
                                        container display={'flex'} flexDirection={'row'} alignItems={'center'}
                                    >
                                        <Text
                                                text={'No cuentas con turnos reservados para el día de hoy o mañana.'}
                                                fontSize="1em"
                                                fontFamily="Lato"
                                                fontWeight="bold"
                                                color="white"
                                        />

                                        {proxTurnoDatosVacioListo == false && <CircularProgress disableShrink/>}
                                    </CardMedia>
                                </Paper>
                            )}
                        </Box>
                   </Grid>

                    <Grid  columns={12} width={'100%'}>
                        <Box sx={{ boxShadow: 2,  borderRadius: 2, backgroundColor:'#fff', padding:3 }}>
                            <div className='fc fc-unthemd fc-ltr'>
                                <FullCalendar
                                    editable={true}
                                    plugins={[ dayGridPlugin, interactionPlugin ]}
                                    initialView="dayGridMonth"
                                    events={turnosCalendario ? turnosCalendario : []}
                                    locale={esLocale}
                                    selectable={true}
                                    selectHelper={true}
                                    dateClick={(info) => {handleOpen(info.dateStr)}}
                                    dayMaxEvents={3}
                                    handleWindowResize={true}
                                    titleFormat={{month: 'long', year: 'numeric'}}
                                />
                            </div>
                        </Box>
                    </Grid>

                </Grid>

                <Grid item lg={2} ml={3} xs={0} mr={3} display={'flex'} flexDirection={'column'} display={{ xs: "none", lg: "flex" }}>
                    <Publicidad/>
                </Grid>
                
            </Grid>
       
        <Modal
        style={style.modal}
        open={open}
        onClose={handleClose}
    >
        <Box sx={style.box}>
            <Box my={3}>
                {
                    eventosFechaSeleccionada2 && (
                        <Text
                            text={"Turnos del día:"}
                            fontFamily="Lato"
                            fontWeight="bold"
                            fontSize="1.5em"
                        />
                    ) 
                }
            </Box>
            {eventosFechaSeleccionada2 ?
                    eventosFechaSeleccionada2.map((evento) => (
                    <Accordion>
                        <AccordionSummary
                        style={{borderradius:3, marginBottom:3}}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                <AccessTimeIcon />
                                <Box mx={1} fontWeight={'bold'}>{evento.title}
                                    <Button onClick={()=>{setOpenModalCancelar(true), setInfoEvento(evento)}}>Eliminar</Button>
                                </Box>
                                
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Text text="Datos de contacto:" fontFamily="Lato" fontWeight="600" fontSize="1.3em"/>
                           <Box p={3}>
                                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                    <Box display={'flex'} alignItems={'center'}><EmailIcon/><Text fontFamily="Lato" text={evento.paciente.email}/></Box>
                                    <Box display={'flex'} alignItems={'center'}><CallIcon/><Text fontFamily="Lato" text={evento.paciente.telefono}/></Box>
                                    <Box display={'flex'} alignItems={'center'}><CreditCardIcon/><Text fontFamily="Lato" text={evento.paciente.obra_social}/></Box>
                                    <Box display={'flex'} alignItems={'center'}><FingerprintIcon/><Text fontFamily="Lato" text={evento.paciente.DNI}/></Box>
                                </Box>
                                
                           </Box>
                        </AccordionDetails>
                    </Accordion>
                ))

            : 
                <Box>
                    <Box my={3}>
                        <Text
                            text="No hay citas agendadas"
                            fontSize="2em"
                            fontFamily="Lato"
                            fontWeight="bold"
                            color={"#43B2BD"}
                        />
                    </Box>
                    <Box my={3}>
                        <Text
                            text="Por el momento no se registran citas para la fecha seleccionada."
                            fontSize="1.3em"
                            fontFamily="Lato"
                            fontWeight="normal"
                        />
                    </Box>

                </Box>
            }

            <Box width={'100%'} display={'flex'} justifyContent={'end'} mt={3}>
                <Button variant='contained' onClick={handleClose}>Cerrar</Button>
            </Box>
        </Box>
    </Modal>

    <ModalInput 
        open={openModalCancelar}
        close={() => {handleCloseCancelar()}}
        titleModal='¿Estás seguro que quieres cancelar este turno?'
        textCuerpo='Al confirmar se cancelará el turno de forma inmediata.'
        button1='Confirmar'
        button2='Cancelar'
        infoEvento={infoEvento}
    />

    <Grid>
        <AlertSnapent
            estado={validador}
            cerrar={() =>{{setValidador(!validador)}}}
            color="success"
            closeIcon={false}
            mensaje="El turno se canceló con éxito."
        />

    </Grid>

    <Grid>
        <AlertSnapent
            estado={validador2}
            cerrar={() =>{{setValidador2(!validador2)}}}
            color="error"
            closeIcon={false}
            mensaje="Error al cancelar el turno. Intente nuevamente."
        />
    </Grid>
        </>
    )
}

export default CalendarioProfesional