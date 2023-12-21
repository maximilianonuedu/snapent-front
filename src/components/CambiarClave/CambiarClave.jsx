// REACT
import { Grid, Alert, FormControl } from '@mui/material';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import ButtonStyle from './../Button/Button';
import AlertSnapent from '../Alert/Alert';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Text from   './../Text/Text';
import Box from '@mui/material/Box';

// ICONS
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// SERVICES
import * as authService from './../../services/auth.services';

// YUP
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { actualizarClaveScheme } from '../../../schemes/auth.schemes';

function CambiarClave() {
    // GENERAL
    const {id} = useParams();
    const [errores, setErrores] = useState([])
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);

    // YUP - ONSUBMIT
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver: yupResolver(actualizarClaveScheme)
    });

    function onSubmit(data) {
        let coleccion;

        if(localStorage.getItem('profesional_id')) {
            coleccion = 'Profesionales';

        } else if(localStorage.getItem('usuario_id')) {

            coleccion = 'Usuarios';
        }

        authService.actualizarClave(coleccion, id, data.claveActual, data.claveNueva, data.claveNuevaRep)
            .then((rta) => {
                if (rta === null) {
                    setValidador2(true);
    
                } else {
                    setValidador(true);
                    location.reload();
                }

            })
            .catch((err) => {
    
                setErrores(err.errors)

            })
    }

    // MOSTRAR-OCULTAR CLAVE
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    // CAMPO CLAVE ACTUAL
    const [mostrarClave, setMostrarClave] = useState(false);

    const mostrarOcultarClave = () => {
        setMostrarClave(!mostrarClave);
    };

    // CAMPO NUEVA CLAVE
    const [mostrarClave2, setMostrarClave2] = useState(false);

    const mostrarOcultarClave2 = () => {
        setMostrarClave2(!mostrarClave2);
    };

    // CAMPO CONFIRMAR CLAVE
    const [mostrarClave3, setMostrarClave3] = useState(false);

    const mostrarOcultarClave3 = () => {
        setMostrarClave3(!mostrarClave3);
    };

    return(
        <Box mt={0} sx={{width:'100%', backgroundColor:'#fff', padding:4, borderRadius:3,boxShadow: 2,}}>
            <>
            <Grid 
                container
                display={'flex'}
                flexDirection={'column'}
            >
                <Box mb={3}>
                    <Text
                        fontSize="1em"
                        fontFamily="Lato"
                        margin="0px"
                        fontWeight="600"
                        text="¿Deseas actualizar tu clave?"
                    />
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <Grid item >
                        <FormControl fullWidth variant="outlined" margin='dense' spacing={2}>
                            <InputLabel htmlFor="outlined-adornment-password">Clave Actual</InputLabel>
                            <OutlinedInput
                                fullWidth  margin='dense' type={mostrarClave ? "text" : "password"} id="outlined-basic" name="claveActual" variant="outlined" {...register('claveActual')}
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
                                label="Clave Actual"
                            />
                        </FormControl>

                        {errors.claveActual ? 
                            (<Alert severity="error">{errors.claveActual?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid item >
                        <FormControl fullWidth variant="outlined" margin='dense' spacing={2}>
                            <InputLabel htmlFor="outlined-adornment-password">Nueva Clave</InputLabel>
                            <OutlinedInput
                                fullWidth  margin='dense' type={mostrarClave2 ? "text" : "password"} id="outlined-basic" name="claveNueva" variant="outlined" {...register('claveNueva')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={mostrarOcultarClave2}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {mostrarClave2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Nueva Clave"
                            />
                        </FormControl>

                        {errors.claveNueva ? 
                            (<Alert severity="error">{errors.claveNueva?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid item >
                        <FormControl fullWidth variant="outlined" margin='dense' spacing={2}>
                            <InputLabel htmlFor="outlined-adornment-password">Confirmar Clave</InputLabel>
                            <OutlinedInput
                                fullWidth  margin='dense' type={mostrarClave3 ? "text" : "password"} id="outlined-basic" name="claveNuevaRep" variant="outlined" {...register('claveNuevaRep')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={mostrarOcultarClave3}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {mostrarClave3 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Confirmar Clave"
                            />
                        </FormControl>

                        {errors.claveNuevaRep ? 
                            (<Alert severity="error">{errors.claveNuevaRep?.message}</Alert>)
                        : null}
                    </Grid>

                    <Grid mt={4}>
                        <Box width={'100%'}>
                            <ButtonStyle 
                                type='submit'
                                text="Actualizar clave"
                                variant="contained"
                                size="large"
                                spacing={9}
                                clase='btnAzul'
                            />
                        </Box>
                    </Grid>
                </form>
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador}
                    cerrar={() =>{{setValidador(!validador)}}}
                    color="success"
                    closeIcon={false}
                    mensaje="Clave actualizada con éxito."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador2}
                    cerrar={() =>{{setValidador2(!validador2)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="La nueva clave es igual a la clave actual."
                />
            </Grid>
        </>
        </Box>
    ) 
}

export default CambiarClave