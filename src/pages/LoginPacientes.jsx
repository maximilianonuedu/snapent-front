// REACT
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonStyle from '../components/Button/Button.jsx';
import { Grid, Alert, FormControl } from '@mui/material';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom';
import AlertSnapent from '../components/Alert/Alert';
import Carga from '../components/Carga/Carga';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

// SERVICES
import * as authService from '../services/auth.services.js';

// CSS
import './Login.css';

// ICONS
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// YUP
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { loginScheme } from '../../schemes/auth.schemes.js';

function LoginPage({onLogin}) {
    // GENERAL
    const navigate = useNavigate();
    const [errores, setErrores] = useState([])
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    const [validador3, setValidador3] = useState(false);

    const ButtonLogin = { 
        backgroundColor: '#21AEC8',
        color:'#fff',
        borderRadius: '10px'
    }

    const ButtonRegister = { 
        backgroundColor: '#fff',
        color:'#21AEC8',
        borderRadius: '10px',
        textDecoration: 'none !important'
    }

    // YUP - ONSUBMIT
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver: yupResolver(loginScheme)
    });

    function onSubmit(data) {
        event.preventDefault();

        authService.login(data.email, data.clave)
            .then(({usuario, token}) => {

                if(usuario === null && token === null) {
                    setValidador3(true);

                } else {

                    setValidador(true);
    
                    setTimeout(() => {
                        localStorage.setItem('usuario_id', usuario._id);
    
                        onLogin(usuario, token);
    
                        navigate('/');
                    }, 1800);
                }

            })
            .catch((err) => {
                setErrores(err.errors);
                setValidador2(true);
            })
    }

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
            <form  style={{width:'100%'}} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="Email" label="Email" variant="outlined" {...register('email')}/>

                    {errors.email ? 
                        (<Alert severity="error">{errors.email?.message}</Alert>)
                    : null}
                </div>

                <div>
                    <Grid 
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={12}>
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
                </div>

                <Box mt={3}>
                    <ButtonStyle 
                        type='submit'
                        text="Ingresar"
                        variant="contained"
                        size="large"
                        spacing={10}
                        fullwidth
                        mt="10px"
                        styles={ButtonLogin}          
                    />
                </Box>
            </form>

            <Divider />

            <Box mt={2}>
                <Link style={{paddingLeft: 13, textDecoration: 'none'}} to="/registro">
                    <ButtonStyle 
                        type='submit'
                        text="Registrarse"
                        variant="outline"
                        size="large"
                        spacing={10}
                        fullwidth
                        styles={ButtonRegister}
                    />
                </Link>       
            </Box>  

            <Grid>
                <AlertSnapent
                    estado={validador}
                    cerrar={() =>{{setValidador(!validador)}}}
                    color="success"
                    closeIcon={false}
                    mensaje="¡Bienvenido/a a Snapent!"
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador2}
                    cerrar={() =>{{setValidador2(!validador2)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="Error al iniciar sesión. Recuerda seleccionar si eres Paciente o Profesional."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador3}
                    cerrar={() =>{{setValidador3(!validador3)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="La clave ingresada es incorrecta."
                />
            </Grid>

            <Carga estado={validador}/>
        </Grid>
    )
}

export default LoginPage