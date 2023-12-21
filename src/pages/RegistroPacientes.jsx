// REACT
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonStyle from '../components/Button/Button.jsx';
import { Grid, Alert, FormControl } from '@mui/material';
import AlertSnapent from '../components/Alert/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

// SERVICES
import * as usuariosService from '../services/usuarios.services.js';
import * as obrasSocialesServices from '../services/obras_sociales.services';

// CSS
import './Login.css';

// ICONS
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// YUP
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usuarioScheme } from '../../schemes/usuarios.schemes.js';

// MUI TEL
import { MuiTelInput } from 'mui-tel-input';

// DATE PICKER
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { esES } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';

// GLOBAL
import { randomColor } from '../../global/randomColor.js';

function RegistroPage() {
    // GENERAL
    const navigate = useNavigate();
    const [errores, setErrores] = useState([])
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    const [validador3, setValidador3] = useState(false);

    // FECHA - DATEPICKER
    const fecha = new Date();
    const [fechaseleccionada, setFechaSeleccionada] = useState(dayjs(fecha));
    
    // YUP - ONSUBMIT
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver: yupResolver(usuarioScheme)
    });

    function onSubmit(data) {
        event.preventDefault();

        usuariosService.registro(data.nombre, data.apellido, data.email, data.clave, data.telefono, data.fecha_de_nacimiento, data.DNI, data.obra_social, data.avatar, data.color_avatar, data.peso, data.altura)
            .then((rta) => {
                if (rta === null) {
                    setValidador3(true);
    
                } else {
                    setValidador(true);

                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
            })
            .catch((err) => {
                setErrores(err.errors);
                setValidador2(true);
            })
    }

    const ButtonRegister = { 
        backgroundColor: '#fff',
        color:'#21AEC8',
        borderRadius: '10px',
        textDecoration: 'none'
    }

    // MOSTRAR-OCULTAR CLAVE
    const [mostrarClave, setMostrarClave] = useState(false);

    const mostrarOcultarClave = () => {
        setMostrarClave(!mostrarClave);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    // SELECT OBRAS SOCIALES
    const [obras_sociales, setObrasSociales] = useState([]);

    useEffect(() => {
        obrasSocialesServices.traerObrasSociales()
            .then(data => {
                setObrasSociales(data);
            })
    }, []);

    // MUI TEL INPUT
    const [phone, setPhone] = useState('')

    const handleChange = (newPhone) => {
        setPhone(newPhone)
    }

    return(
        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <form style={{width:'100%'}} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                
                <Grid flexDirection={'row'} justifyContent={'space-between'} container spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="nombre" label="Nombre" variant="outlined" {...register('nombre')}/>

                        {errors.nombre ? 
                            (<Alert severity="error">{errors.nombre?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid item lg={6} md={12} xs={12}>
                        <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="apellido" label="Apellido" variant="outlined" {...register('apellido')}/>

                        {errors.apellido ? 
                            (<Alert className='responsive' severity="error">{errors.apellido?.message}</Alert>)
                        : null}
                    </Grid>
                </Grid>

                <Grid flexDirection={'row'} justifyContent={'space-between'} container spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField autoComplete="off" fullWidth margin='dense' type="email" id="outlined-basic" name="mail" label="Email" variant="outlined" {...register('email')}/>

                        {errors.email ? 
                            (<Alert severity="error">{errors.email?.message}</Alert>)
                        : null}
                    </Grid>
                    
                    <Grid item lg={6} md={12} xs={12}>
                        <Grid 
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item xs={12} >
                                <FormControl fullWidth variant="outlined" margin='dense' spacing={2}>
                                    <InputLabel htmlFor="outlined-adornment-password">Clave</InputLabel>

                                    <OutlinedInput
                                        fullWidth  margin='dense' type={mostrarClave ? "text" : "password"} id="outlined-basic" name="clave" variant="outlined" {...register('clave')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={mostrarOcultarClave}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {mostrarClave ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Clave"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        {errors.clave ? 
                            (<Alert severity="error">{errors.clave?.message}</Alert>)
                        : null}
                    </Grid>
                
                </Grid>

                <Grid flexDirection={'row'} justifyContent={'space-between'} container spacing={2}>

                    <Grid item lg={6} md={12} xs={12}>
                        <FormControl fullWidth>
                            <MuiTelInput {...register('telefono')}  fullwidth margin='dense' id="outlined-basic" defaultCountry="AR" value={phone} onChange={handleChange} name='telefono' label='Teléfono' />  
                        </FormControl>
                       
                        {errors.telefono ? 
                            (<Alert severity="error">{errors.telefono?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid item lg={6} md={12} xs={12}>
                        <LocalizationProvider localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs} adapterLocale="es">
                            <DatePicker
                                {...register('fecha_de_nacimiento')}
                                label='Fecha de nacimiento'
                                value={fechaseleccionada}
                                onChange={(newValue) => {
                                    setFechaSeleccionada(newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth margin='dense' name='fecha_de_nacimiento'
                                variant='outlined' {...params} />}
                            />
                        </LocalizationProvider>

                        {errors.fecha_de_nacimiento ? 
                            (<Alert severity="error">{errors.fecha_de_nacimiento?.message}</Alert>)
                        : null}
                    </Grid>
                </Grid>

                <Grid flexDirection={'row'} justifyContent={'space-between'} container spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="DNI" label="DNI" variant="outlined" {...register('DNI')}/>
                        
                        {errors.DNI ? 
                            (<Alert severity="error">{errors.DNI?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid item lg={6} md={12} xs={12}>
                        <FormControl margin='dense' spacing={2} style={{ width:'100%' }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Obra Social</InputLabel>

                            <Select
                            fullWidth
                            label="Obra Social"
                            name="obra_social"
                            {...register('obra_social')}
                            >
                                {obras_sociales.map((obra_social) => (
                                    <MenuItem value={obra_social.nombre}>{obra_social.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                                    
                        {errors.obra_social ? 
                            (<Alert severity="error">{errors.obra_social?.message}</Alert>)
                        : null}
                    </Grid>
                </Grid>

                <Grid flexDirection={'row'} justifyContent={'space-between'} container spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField autoComplete="off" fullWidth margin='dense' type="number" id="outlined-basic" name="peso" label="Peso" variant="outlined" {...register('peso')} InputProps={{endAdornment: <InputAdornment position="end">kg</InputAdornment>}}/>

                        {errors.peso ? 
                            (<Alert severity="error">{errors.peso?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid item lg={6} md={12} xs={12}>
                        <TextField autoComplete="off" fullWidth margin='dense' type="number" id="outlined-basic" name="altura" label="Altura" variant="outlined" {...register('altura')} InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}/>

                        {errors.altura ? 
                            (<Alert severity="error">{errors.altura?.message}</Alert>)
                        : null}
                    </Grid>
                </Grid>

                <input type="hidden" name="color_avatar" value='' {...register('avatar')}/>

                <input type="hidden" name="color_avatar" value={randomColor()} {...register('color_avatar')}/>

                <Box mt={2}>
                    <ButtonStyle 
                        type='submit'
                        text="Registrarse"
                        variant="contained"
                        size="large"
                        spacing={10}
                        fullwidth
                        mt="10px" 
                        style={ButtonRegister}         
                    />
                </Box>
            </form>

            <Grid>
                <AlertSnapent
                    estado={validador}
                    cerrar={() =>{{setValidador(!validador)}}}
                    color="success"
                    closeIcon={false}
                    mensaje="Registro realizado con éxito."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador2}
                    cerrar={() =>{{setValidador2(!validador2)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="Error al realizar el registro. Intente nuevamente."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador3}
                    cerrar={() =>{{setValidador3(!validador3)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="El email ingresado ya se encuentra registrado."
                />
            </Grid>               
        </Grid>
    )
}

export default RegistroPage