// REACT
import * as React from 'react';
import { useState } from 'react';
import { Container, Grid, Divider, Switch, Stack, TextField, Chip,OutlinedInput, InputAdornment ,FormHelperText, FormControl } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { esES } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import Text from "./../Text/Text";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import AlertSnapent from './../Alert/Alert';
import { useParams } from 'react-router-dom';

// SERVICES
import * as profesionalesServices from './../../services/profesionales.services';

// GLOBAL
import { formatoHoraTimePicker } from '../../../global/formatoHora';
import { useEffect } from 'react';

// CSS
import './../../index.css';

function ItemsAgenda(props){
    // GENERAL
    const {id} = useParams();

    // INICIO
    let horaInicio = formatoHoraTimePicker(props.horaInicio);

    // FIN
    let horaFin = formatoHoraTimePicker(props.horaFin);

    const [value, setValue] = useState(horaInicio.getTime());
    const [value2, setValue2] = useState(horaFin.getTime());

    // SET DE HORARIOS MAX Y MIN
    const sevenAM = dayjs().set('hour', 7).startOf('hour');
    const tenPM = dayjs().set('hour', 22).startOf('hour');

    // SWITCH CHECKED
    const [checked, setChecked] = useState(props.deshabilitado);

    const styles ={
        habilitado:{
            boxShadow: 2,  
            borderRadius: 2, 
            marginBottom:3
        },
        deshabilitado:{
            boxShadow: 0,  
            backgroundColor:'rgb(243, 246, 249)',
            borderRadius: 2, 
            marginBottom:3
        }
    }

    // ACTUALIZAR DISPONIBLIDAD
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    const [validador3, setValidador3] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    function compararHorarios(inicio, fin) {
        let horaInicio = new Date(inicio).getHours();
        let horaFin = new Date(fin).getHours();

        if(horaFin <= horaInicio && checked) {
            setValidador3(true);
            setBtnDisabled(true);
        } else {
            setValidador3(false);
            setBtnDisabled(false);
        }
    }

    useEffect(() => {
        compararHorarios(value, value2);
        
    }, [value, value2]);

    function actualizarDisponibilidad(dia, inicio, fin) {
        // INICIO
        let horaInicio = new Date(inicio).toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'});

        let horaFin = new Date(fin).toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'});

        profesionalesServices.editarDisponibilidadHoraria(id, dia, horaInicio, horaFin, checked)
            .then((rta) => {
                setValidador(true);

                setTimeout(() => {
                    location.reload();
                }, 1800);
            })
            .catch((err) => {
                setValidador2(true);
            })
    }

    return(
        <Paper sx={ checked ? styles.habilitado : styles.deshabilitado }>
            <Grid display={'flex'} justifyContent={'space-between'} flexDirection={{lg:'row', md:'column', xs:'column'}} p={2}>
                <Grid display={{xs: 'flex'}} width={{lg:'34%', xs:'100%'}} justifyContent={{xs: 'space-between'}} flexDirection={{xs:'row'}}>
                    <Grid item display={'flex'}  alignItems={'center'} mr={{lg: 4}}>
                            {checked ? (
                            <Grid item>
                                    <Switch size='medium' color='warning' defaultChecked checked={checked} onClick={() => {setChecked(!checked)}}/>
                            </Grid>
                                
                            ) : (
                                <Grid item>
                                    <Switch size='medium' color='warning' checked={checked} onClick={() => {setChecked(!checked)}}/>    
                                </Grid>
                            )}

                            <Grid>
                                <Text color={checked ? 'black' : 'grey' } text={props.dia} fontFamily='Lato' fontWeight='600' margin={0}/>
                            </Grid>
                    </Grid>

                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            {checked  ? (

                                    <Chip color="primary" icon={<CheckCircleIcon />} label="Diponible" />
                                ):(
                                    <Chip disabled color="primary" icon={<CancelIcon />} variant="outlined" label="Ocupado" />
                                )
                            }
                    </Grid>
                </Grid>

                <Grid item>
                    <LocalizationProvider localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs} adapterLocale="es">
                        <Grid display='flex' flexDirection='row' style={{width: '100%'}} alignItems='center' jutifyContent='space-between'>
                           
                            <MobileTimePicker
                                minutesStep={15}
                                locale={esES}
                                value={value}
                                minTime={sevenAM}
                                maxTime={tenPM}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <FormControl sx={{ mr: 1, my: 1 }} variant="outlined" className='inputGestion'>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  startAdornment={<InputAdornment position="start">De</InputAdornment>}
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    'aria-label': 'De',
                                  }}
                                  {...params}
                                />
                              </FormControl>}
                                disabled={checked ? false : true}
                                style={{width: '100%'}}
                            />


                            <MobileTimePicker
                                minutesStep={15}
                                locale={esES}
                                value={value2}
                                minTime={sevenAM}
                                maxTime={tenPM}
                                onChange={(newValue) => {
                                    setValue2(newValue);
                                }}
                                renderInput={(params) => 
                                <FormControl className='inputGestion' sx={{ my: 1 }} variant="outlined">
                                    <OutlinedInput
                                    id="outlined-adornment-weight"
                                    startAdornment={<InputAdornment position="start">A</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{'aria-label': 'A',}}
                                    {...params}
                                    />
                                </FormControl>}
                                disabled={checked ? false : true}
                            />      
                        </Grid>
                    </LocalizationProvider>
                </Grid>
                <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} >
                    {checked || props.deshabilitado ? (
                        <Button onClick={() => {actualizarDisponibilidad(props.dia, value, value2)}} fullWidth variant="outlined" startIcon={<SaveIcon />}>
                        Guardar
                        </Button>

                    ):(
                        <Button onClick={() => {actualizarDisponibilidad(props.dia, value, value2)}} fullWidth variant="outlined" startIcon={<SaveIcon />} disabled='true'>
                        Guardar
                        </Button>

                    )} 
                </Grid>
            </Grid>
            <Grid>
                    <AlertSnapent
                        estado={validador}
                        cerrar={() =>{{setValidador(!validador)}}}
                        color="success"
                        closeIcon={false}
                        mensaje={"Horarios del día " + props.dia + " actualizados con éxito."}
                    />
                </Grid>

                <Grid>
                    <AlertSnapent
                        estado={validador2}
                        cerrar={() =>{{setValidador2(!validador2)}}}
                        color="error"
                        closeIcon={false}
                        mensaje={"Error al actualizar horarios del día " + props.dia + ". Intente nuevamente."}
                    />
                </Grid>

                <Grid>
                    <AlertSnapent
                        estado={validador3}
                        cerrar={() =>{{setValidador3(!validador3)}}}
                        color="error"
                        closeIcon={false}
                        mensaje={"El horario de inicio debe ser menor al de fin."}
                    />
                </Grid>
        </Paper>
    )
}

export default ItemsAgenda