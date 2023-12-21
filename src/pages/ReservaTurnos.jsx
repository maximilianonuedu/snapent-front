// REACT
import {useEffect, useState}from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

// DATETIME PICKER
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { esES } from '@mui/x-date-pickers/locales';
import "dayjs/locale/es";
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

// SERVICES
import * as profesionalesServices from './../services/profesionales.services';

// GLOBAL
import * as dias from './../../global/dias';

function ReservaTurnos({fechas}) {
    // GENERAL
    const {id} = useParams();

    // DATETIME PICKER
    const [horaFechaSeleccionada, setHoraFechaSeleccionada] = useState(dayjs(new Date()));

    // MUESTRO FECHA Y HORA SELECCIONADA
    let pasarFechasPadre = () => {
    let turno = 
        {
        dia: horaFechaSeleccionada.$d,
        horarioHoras: horaFechaSeleccionada.$d.getHours(),
        horarioMinutos: horaFechaSeleccionada.$d.getMinutes(),
        };

        fechas(turno);
    }

    // UNA VEZ QUE TENGO FECHA Y HORA SELECCIONADA LO PASO A FECHAS PADRE PARA MOSTRARLO
    useEffect(() => {
        pasarFechasPadre();
    },[horaFechaSeleccionada])

    // ARRAY DIAS DESHABILITADOS + ARRAY HORARIOS PROFESIONAL
    const arrayDiasDeshabilitados = [];
    const[diasDeshabilitadosListos, setDiasDeshabilitadosListos] = useState([]);
    const[horarios, setHorarios] = useState([]);

    useEffect(() => {
        profesionalesServices.traerProfesionalPorId(id)
          .then((data) => {
                setHorarios(data.disponibilidad_horaria);

                for(let i=0; i<data.disponibilidad_horaria.length; i++) {
                    if(data.disponibilidad_horaria[i].deshabilitado != true) {
                        arrayDiasDeshabilitados.push(data.disponibilidad_horaria[i].dia);
                    }
                }
            
                setDiasDeshabilitadosListos(arrayDiasDeshabilitados);
          })
          .catch((err) => {
            new Error(err);
          })
    },[id])

    // FUNCION DISABLED DATE PARA PASAR AL DATETIME PICKER
    function disabledDate(time) {
        let rta = dias.diasPorNumero(diasDeshabilitadosListos);

        if(rta.length === 1) {
            return new Date(time).getDay() === rta[0];
        } else {
            return new Date(time).getDay() === rta[0] || new Date(time).getDay() === rta[1] || new Date(time).getDay() === rta[2] || new Date(time).getDay() === rta[3] || new Date(time).getDay() === rta[4] || new Date(time).getDay() === rta[5] || new Date(time).getDay() === rta[6];
        }
    }

    // TRAIGO HORA INICIO Y FIN DEL DIA SELECCIONADO
    const[horaInicioTurnos, setHoraInicioTurnos] = useState('');
    const[horaFinTurnos, setHoraFinTurnos] = useState('');

    function traerHorariosDia(){
        let horaInicio;
        let horaFin;

        for(let i=0; i<horarios.length; i++) {
           if(horaFechaSeleccionada.$d.getDay() == dias.numeroSegunDia(horarios[i].dia)){
                horaInicio = horarios[i].horaInicio.split(':');
                horaFin = horarios[i].horaFin.split(':');
                
                setHoraInicioTurnos(dayjs().set('hour', horaInicio[0]).startOf('hour'));
                setHoraFinTurnos(dayjs().set('hour', horaFin[0]).startOf('hour'));
            }
        }
    }

    useEffect(() => {
        traerHorariosDia();
    },[horaFechaSeleccionada, horarios]) 

    return (
        <Grid container maxWidth style={{ padding:0, margin:0, backgroundColor:'#F2F2F2' }} spacing={0}>
            <Grid item >
                <Box display={'flex'} justifyContent={'center'} flexDirection={'row'} mt={0}> 
                    <LocalizationProvider localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs} adapterLocale="es">
                        <StaticDateTimePicker 
                            defaultValue={new Date()} 
                            renderInput={(params) => <TextField {...params} />}
                            locale={esES}
                            showToolbar={true}
                            minDate={new Date()}
                            shouldDisableDate={disabledDate}
                            minTime={horaInicioTurnos}
                            maxTime={horaFinTurnos}
                            minutesStep={15}
                            value={horaFechaSeleccionada}
                            onChange = {
                                (newValue)=>{
                                    setHoraFechaSeleccionada(newValue)
                                }
                            }
                        
                        />
                    </LocalizationProvider>
                </Box>
            </Grid>

            <Grid item lg={6} md={6}></Grid>
        </Grid>
    );
}

export default ReservaTurnos;