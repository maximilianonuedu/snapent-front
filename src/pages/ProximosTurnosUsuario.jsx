// REACT
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CardTurnos from '../components/CardTurnos/CardTurnos';
import { Grid } from '@mui/material';
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AlertSnapent from '../components/Alert/Alert';
import ModalInput from '../components/modal/ModalInput';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// SERVICES
import * as turnosServices from './../services/turnos.services';
import * as profesionalesServices from './../services/profesionales.services';
import * as consultoriosServices from './../services/consultorios.services';

function ProximosTurnosUsuario() {
    // SET VALUE
    const [value, setValue] = useState('Turnos');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      }

    // TRAIGO LISTADO TURNOS
    const {id} = useParams();
    const [turnosFinal, setTurnosFinal] = useState([]);
    let turnosArray = [];
    const [turnosCancelados, setTurnosCancelados] = useState([]);
    let turnosCanceladosArray = [];

    async function proximosTurnos() {
        try{
            const turnos = await turnosServices.traerTurnosPorID(id);
        
            for (let i = 0; i < turnos.length; i++) {
                const profesional = await profesionalesServices.traerProfesionalPorId(turnos[i].id_profesional);

                const consultorio = await consultoriosServices.traerConsultorioPorId(profesional.id_consultorio);
            
                turnos[i] = {idTurno: turnos[i]._id, fecha: turnos[i].fecha, hora: turnos[i].hora, idPaciente: turnos[i].id_paciente, profesional: profesional, consultorio: consultorio};
        
                turnosArray.push(turnos[i]);
            }

        } catch(err) {
            new Error(err);
        }
    }
    
    // TRAER TURNOS POR ID
    useEffect(() => {
        proximosTurnos().then(res => {
            setTurnosFinal(turnosArray);
        })
        .catch(err => {
            new Error(err);
        });

        // TRAER TURNOS CANCELADOS
        turnosServices.traerTurnosCanceladosPorID(id)
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    profesionalesServices.traerProfesionalPorId(data[i].id_profesional)
                    .then((infoProfesional) => {
                        data[i].profesional = infoProfesional;
                        turnosCanceladosArray.push(data[i]);
                    })
                    
                }

                setTurnosCancelados(turnosCanceladosArray);
            })
            .catch((err) => {
                new Error(err)
            })
    }, [id])

    // CANCELAR TURNO MODAL
    const [abrirModalCancelar, setAbrirModalCancelar] = useState(false);
    const [infoTurno, setInfoTurno] = useState(null);

    return(
        <>
            <TitulosHeaders
                titulo="Mis turnos"
                icon={<ListAltIcon fontSize='large' color='white'/>}
            />

            <Box sx={{width:'100%',backgroundColor:'#fff', mb:4}}>

                <Container>
                    <TabContext value={value}>
                    
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width:'100%' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Próximos turnos" value="Turnos" />
                            <Tab label="Turnos cancelados" value="Cancelaciones" />
                        </TabList>
                    </Box>

                    <Container maxWidth="lg" style={{padding:0}}>
                        <Box sx={{width:'100%'}}>
                            <TabPanel style={{padding:'20px 0px 0px 0px '}} value="Turnos">
                                <Grid  mt={5} mb={5} display='flex' lg={{justifyContent:'start'}} md={{justifyContent:'start'}} xs={{justifyContent:'center'}}  flexDirection='row' flexWrap={'wrap'}>
                                    {turnosFinal && (
                                        turnosFinal.map((turno) => (
                                            <CardTurnos
                                                especialidad={turno.profesional.especialidad}
                                                profesional={turno.profesional.nombre + ' ' + turno.profesional.apellido}
                                                fecha={turno.fecha}
                                                horario={turno.hora}
                                                lugarNombre={turno.consultorio.nombre}
                                                lugarDireccion={turno.consultorio.direccion}
                                                idConsultorio= {turno.consultorio._id}
                                                avatar={turno.profesional.avatar != '' ? './../../../avatares/' + turno.profesional.avatar : null}
                                                colorAvatar={turno.profesional.color_avatar}
                                                inicialesProfesional={turno.profesional.nombre.charAt(0).toUpperCase() + ' ' + turno.profesional.apellido.charAt(0).toUpperCase()}
                                                btnText='Cancelar turno'
                                                onClickCancelar={() => {setAbrirModalCancelar(!abrirModalCancelar), setInfoTurno(turno)}}
                                            />
                                        ))
                                    )}

                                    <ModalInput 
                                        open={abrirModalCancelar}
                                        close={() => {setAbrirModalCancelar(!abrirModalCancelar)}}
                                        titleModal='¿Estás seguro que quieres cancelar tu turno?'
                                        textCuerpo='Al confirmar se cancelará el turno de forma inmediata.'
                                        button1='Confirmar'
                                        button2='Cancelar'
                                        infoTurno={infoTurno}
                                    />
                                    
                                    {
                                        turnosFinal.length === 0 && (
                                            <Grid container columns={12} display={'flex'} justifyContent={'center'} alignItems={'center'}> 
                                                <Box minWidth={100} minHeight={100} justifyContent={'center'} alignItems={'center'}>
                                                    <CircularProgress disableShrink />
                                                </Box>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </TabPanel>
                        </Box>
                    </Container>

                    <TabPanel style={{padding:'20px 0px 0px 0px '}} value="Cancelaciones">
                        <Grid mt={5} mb={5} display='flex' lg={{justifyContent:'start'}} md={{justifyContent:'start'}} xs={{justifyContent:'center'}}  flexDirection='row' flexWrap={'wrap'}>
                            {turnosCancelados && (
                                turnosCancelados.map((turno) => (
                                    <CardTurnos
                                        especialidad={turno.profesional.especialidad}
                                        profesional={turno.profesional.nombre + ' ' + turno.profesional.apellido}
                                        avatar={turno.profesional.avatar != '' ? './../../../avatares/' + turno.profesional.avatar : null}
                                        inicialesProfesional={turno.profesional.nombre.charAt(0).toUpperCase() + ' ' + turno.profesional.apellido.charAt(0).toUpperCase()}
                                        colorAvatar={turno.profesional.color_avatar}
                                        fecha={turno.fecha}
                                        horario={turno.hora}
                                        motivo={turno.motivo}
                                    />
                                ))
                            )}

                            {turnosCancelados.length === 0 && (
                                    <Grid container columns={12} display={'flex'} justifyContent={'center'} alignItems={'center'}> 
                                        <Box minWidth={100} minHeight={100} justifyContent={'center'} alignItems={'center'}>
                                            <CircularProgress disableShrink />
                                        </Box>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </TabPanel>
                    
                </TabContext>
                </Container>
            </Box>

        </>
    )
}

export default ProximosTurnosUsuario