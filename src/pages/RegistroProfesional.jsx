// REACT
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonStyle from '../components/Button/Button.jsx';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid, Alert, FormControl } from '@mui/material';
import AlertSnapent from '../components/Alert/Alert';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

// CSS
import './Login.css';

// SERVICES
import * as especialidadesServices from './../services/especialidades.services.js';
import * as profesionalesService from '../services/profesionales.services.js';
import * as consultoriosService from './../services/consultorios.services.js';

// ICONS
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// YUP
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { profesionalScheme } from '../../schemes/profesionales.schemes.js';

// GLOBAL
import { randomColor } from '../../global/randomColor.js';

function RegistroPage() {
    // GENERAL
    const navigate = useNavigate();
    const [errores, setErrores] = useState([])
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    const [validador3, setValidador3] = useState(false);

    // YUP - ONSUBMIT
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver: yupResolver(profesionalScheme)
    });

    function onSubmit(data) {
        event.preventDefault();

        profesionalesService.registro(data.nombre, data.apellido, data.email, data.clave, data.matricula, data.especialidad, data.subespecialidad, data.consultorio, data.avatar, data.color_avatar)
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

    // ESPECIALIDADES
    const [especialidades, setEspecialidades] = useState([]);
    const [consultorios, setConsultorios] = useState([]);

    useEffect(() => {
        especialidadesServices.traerEspecialidades()
            .then(data => {
                setEspecialidades(data);
            })

        consultoriosService.traerConsultorios()
            .then(data => {
                setConsultorios(data);
            })
    }, []);

    const cuerpos_medicos = especialidades.filter(especialidad => {
        return especialidad.seccion === 'Cuerpo Médico';
    });

    const salud_mental = especialidades.filter(especialidad => {
        return especialidad.seccion === 'Salud Mental';
    });

    const estudios = especialidades.filter(especialidad => {
        return especialidad.seccion === 'Estudios de Diagnóstico y Tratamiento';
    });

    // MOSTRAR-OCULTAR CLAVE
    const [mostrarClave, setMostrarClave] = useState(false);

    const mostrarOcultarClave = () => {
        setMostrarClave(!mostrarClave);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    return(
        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <form style={{width:'100%'}}  autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid flexDirection={'row'} justifyContent={'space-between'} container spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="nombre" label="Nombre" variant="outlined" {...register('nombre')}/>
                            {errors.nombre ? 
                                (<Alert severity="error">{errors.nombre?.message}</Alert>)
                            : null}
                    </Grid>

                    <Grid  item lg={6} md={12} xs={12}>
                        <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="apellido" label="Apellido" variant="outlined" {...register('apellido')}/>
                        {errors.apellido ? 
                            (<Alert severity="error">{errors.apellido?.message}</Alert>)
                        : null}
                    </Grid>  
                </Grid>


                <Grid flexDirection={'row'} justifyContent={'space-between'} container spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField autoComplete="off" fullWidth margin='dense' type="email" id="outlined-basic" name="email" label="Email" variant="outlined" {...register('email')}/>
                        
                        {errors.email ? 
                            (<Alert severity="error">{errors.email?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid item lg={6} md={12} xs={12}>
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

                        {errors.clave ? 
                            (<Alert severity="error">{errors.clave?.message}</Alert>)
                        : null}
                    </Grid>
                </Grid>

                <Grid  flexDirection={'row'} justifyContent={'space-between'} container spacing={2}>
                    
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField fullWidth margin='dense' type="number" id="outlined-basic" name="matricula" label="Matricula" variant="outlined" {...register('matricula')}/>

                        {errors.matricula ? 
                            (<Alert severity="error">{errors.matricula?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid item lg={6} md={12} xs={12}>
                        <FormControl margin='dense' spacing={2} style={{ width:'100%' }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Especialidades</InputLabel>

                            <Select
                                placeholder='Especialidad'
                                labelId="select-especialidad"
                                name='especialidad'
                                {...register('especialidad')}
                            >
                                    <MenuItem value="Cuerpo Médico" disabled>Cuerpo Médico</MenuItem>
                                    {cuerpos_medicos.map((cuerpo_medico) => (
                                        <MenuItem value={cuerpo_medico.nombre}>{cuerpo_medico.nombre}</MenuItem>
                                    ))}

                                    <MenuItem value="Salud Mental" disabled>Salud Mental</MenuItem>
                                    {salud_mental.map((salud_mental_opc) => (
                                            <MenuItem value={salud_mental_opc.nombre}>{salud_mental_opc.nombre}</MenuItem>
                                    ))}

                                    <MenuItem value="Estudios de Diagnóstico y Tratamiento" disabled>Estudios de Diagnóstico y Tratamiento</MenuItem>
                                    {estudios.map((estudio) => (
                                            <MenuItem value={estudio.nombre}>{estudio.nombre}</MenuItem>
                                    ))}
                                    
                            </Select>
                        </FormControl>

                        {errors.especialidad ? 
                            (<Alert severity="error">{errors.especialidad?.message}</Alert>)
                        : null}
                    </Grid>
                </Grid>

                <div>
                    <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="subespecialidad" label="Subespecialidad" variant="outlined" {...register('subespecialidad')}/>

                    {errors.subespecialidad ? 
                        (<Alert severity="error">{errors.subespecialidad?.message}</Alert>)
                    : null}
                </div>

                <Grid fullWidth>
                    <FormControl margin='dense' spacing={2} style={{ width:'100%' }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Consultorio</InputLabel>

                        <Select
                            placeholder='Consultorio'
                            labelId="select-consultorio"
                            name='consultorio'
                            {...register('consultorio')}
                        >
                            {consultorios.map((consultorio) => (
                                <MenuItem value={consultorio._id}>{consultorio.nombre}</MenuItem>
                            ))}
                                
                        </Select>
                    </FormControl>

                    {errors.consultorio ? 
                        (<Alert severity="error">{errors.consultorio?.message}</Alert>)
                    : null}
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