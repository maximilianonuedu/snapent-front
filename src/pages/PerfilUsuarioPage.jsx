// REACT
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useNavigate}  from 'react-router-dom';
import VentanaModal from './../components/modal/Modal';
import { Grid, Alert, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Text from   '../components/Text/Text';
import ButtonStyle from '../components/Button/Button.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import AlertSnapent from '../components/Alert/Alert';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import CambiarClave from '../components/CambiarClave/CambiarClave';
import Divider from '@mui/material/Divider';
import UploadImagen from '../components/UploadImagen/UploadImagen';
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';

// ICONS
import EditIcon from '@mui/icons-material/Edit';

// SERVICES
import * as usuariosService from './../services/usuarios.services.js';
import * as obrasSocialesServices from '../services/obras_sociales.services';

// YUP
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { editarUsuarioScheme } from '../../schemes/usuarios.schemes';

// MUI TEL
import { MuiTelInput } from 'mui-tel-input';

// DATE PICKER
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { esES } from '@mui/x-date-pickers/locales';

function PerfilUsuarioPage() {

    // GENERAL
    const navigate = useNavigate();
    const {id} = useParams();
    const [errores, setErrores] = useState([])
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    const [validador5, setValidador5] = useState(false);

    // TRAER DATOS USUARIO
    const [usuario, setUsuario] = useState(null);
    const [user, setUser] = useState(null);
    const [phone, setPhone] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    
    useEffect(() => {
        usuariosService.traerUsuarioPorId(id)
            .then(data => { 
                if(data){
                    setUser(data.nombre + ' ' + data.apellido);
                    setUsuario(data);
                    setPhone(data.telefono);
                    setFechaNacimiento(data.fecha_de_nacimiento);
                }
            })
    }, [id])

    // YUP - ONSUBMIT
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver: yupResolver(editarUsuarioScheme)
    });

    function onSubmit(data) {
        event.preventDefault();

        usuariosService.editar(id, data.nombre, data.apellido, data.email, data.telefono, data.fecha_de_nacimiento, data.DNI, data.obra_social, data.peso, data.altura)
            .then((rta) => {
                if (rta === null) {
                    setValidador5(true);
    
                } else {
                    setValidador(true);
                    navigate(0);
                }
            })
            .catch((err) => {
                setErrores(err.errors);
                setValidador2(true);
            })
    }

    // SELECT OBRAS SOCIALES
    const [obras_sociales, setObrasSociales] = useState([]);

    useEffect(() => {
        obrasSocialesServices.traerObrasSociales()
            .then(data => {
                setObrasSociales(data);
            })
    }, []);

    // MUI TEL INPUT
    const handleChange = (newPhone) => {
        setPhone(newPhone)
    }

    // ELIMINAR USUARIO
    const [validador3, setValidador3] = useState(false);
    const [validador4, setValidador4] = useState(false);

    function eliminarUsuario() {

        usuariosService.eliminar(id)
            .then(() => {
                setValidador3(true);

                localStorage.removeItem('token');
                localStorage.removeItem('usuario_id');

                setTimeout(() => {
                    navigate('/registro');
                }, 1800);
            })
            .catch((err) => {
                setValidador4(true);
            })
    }

    return(
        <>
            <TitulosHeaders
                titulo="Editar Perfil"
                icon={<EditIcon fontSize='large' color='white'
                />}
            />

            <Container maxWidth='lg'>
                <Grid columns={12} mt={5} mb={5}>
                    {usuario ? (
                        <Grid columns={12}>
                            
                            <Box mb={5} padding={3} sx={{ boxShadow: 2,  borderRadius: 2, display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', justifyContent:'space-between' }}>

                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                    {usuario.avatar != '' ? ( 

                                    <Avatar sx={{ width: 56, height: 56, fontSize:25, backgroundColor: usuario.color_avatar }} src={'./../../avatares/' + usuario.avatar}>{usuario.nombre.charAt(0).toUpperCase()} {usuario.apellido.charAt(0).toUpperCase()}</Avatar>

                                    ) : (

                                    <Avatar sx={{ width: 56, height: 56, fontSize:25, backgroundColor: usuario.color_avatar }}>{usuario.nombre.charAt(0).toUpperCase()} {usuario.apellido.charAt(0).toUpperCase()}</Avatar>

                                    )}

                                    <Box ml={2}>
                                    <Text
                                        text={user}
                                        fontSize="2em"
                                        fontFamily="Lato"
                                        fontWeight="900"
                                        margin="0em .5em 0em .5em"
                                    />
                                    </Box>
                               </Box>

                                <Box>
                                    <UploadImagen colorIcon="red"/>
                                </Box>
                            </Box>

                            <Grid fullWidth display='flex' flexDirection={{lg:'row', md:'row', xs:'column'}} flexWrap='nowrap' container>
                                
                                <Box sx={{width:'100%', backgroundColor:'#fff', padding:4, borderRadius:3,boxShadow: 2,}}>
                                    <Grid
                                        lg={12} md={6} xs={12}
                                        pr={{lg:3, md:3, xs:0}}
                                        item
                                    >
                                        <Box sx={{mb:4}}>
                                            <Text
                                                text = 'Datos de la cuenta'
                                                fontSize="1em"
                                                fontFamily="Lato"
                                                fontWeight="600"
                                                marginBottom={3}
                                            />
                                        </Box>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Grid item lg={12} md={12} xs={12}>
                                                <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="nombre" label="Nombre" variant="outlined"
                                                defaultValue={usuario.nombre} {...register('nombre')}/>

                                                {errors.nombre ? 
                                                    (<Alert severity="error">{errors.nombre?.message}</Alert>)
                                                : null}
                                            </Grid>

                                            <Grid item lg={12} md={12} xs={12}>
                                                <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="apellido" label="Apellido" variant="outlined" defaultValue={usuario.apellido} {...register('apellido')}/>

                                                {errors.apellido ? 
                                                    (<Alert className='responsive' severity="error">{errors.apellido?.message}</Alert>)
                                                : null}
                                            </Grid>

                                            <Grid item lg={12} md={12} xs={12}>
                                                <TextField autoComplete="off" fullWidth margin='dense' type="email" id="outlined-basic" name="mail" label="Email" variant="outlined" defaultValue={usuario.email} {...register('email')}/>

                                                {errors.email ? 
                                                    (<Alert severity="error">{errors.email?.message}</Alert>)
                                                : null}
                                            </Grid>

                                            <Grid item lg={12} md={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <MuiTelInput {...register('telefono')} 
                                                    fullwidth margin='dense' id="outlined-basic" defaultCountry="AR" value={phone} onChange={handleChange} name='telefono' label='Teléfono' />  
                                                </FormControl>
                                            
                                                {errors.telefono ? 
                                                    (<Alert severity="error">{errors.telefono?.message}</Alert>)
                                                : null}
                                            </Grid>

                                            <Grid item lg={12} md={12} xs={12}>
                                                
                                                    <LocalizationProvider localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs} adapterLocale="es">
                                                        
                                                        <DatePicker
                                                            {...register('fecha_de_nacimiento')}
                                                            label='Fecha de nacimiento'
                                                            value={fechaNacimiento}
                                                            renderInput={(params) => <Tooltip title="No es posible editar este campo" placement='right'><TextField fullWidth margin='dense' name='fecha_de_nacimiento'
                                                            variant='outlined' {...params}/></Tooltip>}
                                                            disabled
                                                        />
                                                        
                                                    </LocalizationProvider>
                                            </Grid>

                                            <Grid item lg={12} md={12} xs={12}>
                                                <Tooltip title="No es posible editar este campo" placement='right'>
                                                    <TextField fullWidth margin='dense' type="text" id="outlined-basic" name="DNI" label="DNI" variant="outlined" defaultValue={usuario.DNI} {...register('DNI')} disabled />
                                                </Tooltip>
                                            </Grid>

                                            <Grid item lg={12} md={12} xs={12}>
                                                <FormControl margin='dense' spacing={2} style={{ width:'100%' }}>
                                                    <InputLabel id="demo-simple-select-autowidth-label">Obra Social</InputLabel>

                                                    <Select
                                                    fullWidth
                                                    label="Obra Social"
                                                    name="obra_social" 
                                                    defaultValue={usuario.obra_social}
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

                                            <Grid item lg={12} md={12} xs={12}>
                                                <TextField fullWidth margin='dense' type="number" id="outlined-basic" name="peso" label="Peso" variant="outlined" defaultValue={usuario.peso} InputProps={{endAdornment: <InputAdornment position="end">kg</InputAdornment>}} {...register('peso')}/>

                                                {errors.peso ? 
                                                    (<Alert className='responsive' severity="number">{errors.peso?.message}</Alert>)
                                                : null}
                                            </Grid>

                                            <Grid item lg={12} md={12} xs={12}>
                                                <TextField fullWidth margin='dense' type="number" id="outlined-basic" name="altura" label="Altura" variant="outlined" defaultValue={usuario.altura} InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}} {...register('altura')}/>

                                                {errors.altura ? 
                                                    (<Alert className='responsive' severity="error">{errors.altura?.message}</Alert>)
                                                : null}
                                            </Grid>

                                            <Grid mt={4} display={'flex'} justifyContent={'space-between'} container>
                                                <ButtonStyle 
                                                    type='submit'
                                                    text="Editar"
                                                    variant="contained"
                                                    size="large"
                                                    spacing={9}
                                                    styles={{backgroundColor: '#165788'}}
                                                />
                                                
                                                <VentanaModal 
                                                    nameButton="Eliminar Usuario" 
                                                    titleModal="¿Estás seguro que quieres eliminar tu cuenta?"
                                                    textcuerpo={'Al confirmar se perderán todos tus datos personales.'}
                                                    button1="Confirmar"
                                                    button2="Cancelar"
                                                    onClick={eliminarUsuario}
                                                    styles={{color: '#165788'}}
                                                />
                                            </Grid> 
                                        </form>
                                    </Grid>
                                </Box>

                                <Divider orientation={'vertical'} flexItem={true} />

                                <Grid
                                    lg={6} md={6} xs={12}
                                    pl={{lg:3, md:3, xs:0}}
                                    mt={{lg:0, md:0, xs:5}}
                                    item
                                >
                                    <Box>
                                        <CambiarClave/>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid>
                                <AlertSnapent
                                    estado={validador}
                                    cerrar={() =>{{setValidador(!validador)}}}
                                    color="success"
                                    closeIcon={false}
                                    mensaje="Perfil editado con éxito."
                                />
                            </Grid>

                            <Grid>
                                <AlertSnapent
                                    estado={validador2}
                                    cerrar={() =>{{setValidador2(!validador2)}}}
                                    color="error"
                                    closeIcon={false}
                                    mensaje="Error al editar el perfil. Intente nuevamente."
                                />
                            </Grid>

                            <Grid>
                                <AlertSnapent
                                    estado={validador3}
                                    cerrar={() =>{{setValidador3(!validador3)}}}
                                    color="success"
                                    closeIcon={false}
                                    mensaje="Usuario eliminado con éxito."
                                />
                            </Grid>

                            <Grid>
                                <AlertSnapent
                                    estado={validador4}
                                    cerrar={() =>{{setValidador4(!validador4)}}}
                                    color="error"
                                    closeIcon={false}
                                    mensaje="Error al eliminar el usuario. Intente nuevamente."
                                />
                            </Grid>

                            <Grid>
                                <AlertSnapent
                                    estado={validador5}
                                    cerrar={() =>{{setValidador5(!validador5)}}}
                                    color="error"
                                    closeIcon={false}
                                    mensaje="El email ingresado ya se encuentra registrado."
                                />
                            </Grid> 
                        </Grid>
                    ) : (
                        <Grid columns={12} mt={5} display={'flex'} justifyContent={'center'} alignItems={'center'}> 
                            <Box minWidth={100} minHeight={100} justifyContent={'center'} alignItems={'center'}>
                                <CircularProgress disableShrink />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    )
}

export default PerfilUsuarioPage