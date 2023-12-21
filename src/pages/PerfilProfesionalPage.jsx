// REACT
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate}  from 'react-router-dom';
import VentanaModal from './../components/modal/Modal';
import { Grid, Alert, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Text from   '../components/Text/Text';
import ButtonStyle from '../components/Button/Button.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AlertSnapent from '../components/Alert/Alert';
import UploadImagen from '../components/UploadImagen/UploadImagen';

// SERVICES
import * as profesionalesService from './../services/profesionales.services.js';
import * as especialidadesServices from './../services/especialidades.services.js';
import * as consultoriosService from './../services/consultorios.services.js';

// YUP
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { editarProfesionalScheme } from '../../schemes/profesionales.schemes';

function PerfilUsuarioPage() {
    // GENERAL
    const navigate = useNavigate();
    const {id} = useParams();
    const [errores, setErrores] = useState([])
    const [usuario, setUsuario] = useState(null);
    const [user, setUser] = useState(null);
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    const [validador5, setValidador5] = useState(false);

    // TRAER PROFESIONAL POR ID
    useEffect(() => {
        profesionalesService.traerProfesionalPorId(id)
            .then(data => { 
                if(data){
                    setUser(data.nombre + ' '+ data.apellido);
                    setUsuario(data);
                }

            })
            .catch(err => {
                navigate('/404');
            })
    }, [id])

    // YUP - ONSUBMIT
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        resolver: yupResolver(editarProfesionalScheme)
    });

    function onSubmit(data) {
        profesionalesService.editar(id, data.nombre,data.apellido, data.matricula, data.email, data.especialidad, data.subespecialidad, data.consultorio)
            .then((rta) => {
                if (rta === null) {
                    setValidador5(true);
    
                } else {
                    setValidador(true);
                    location.reload();
                }
            })
            .catch((err) => {
                setErrores(err.errors)
                setValidador2(true);
            })
    }

    // ELIMINAR USUARIO
    const [validador3, setValidador3] = useState(false);
    const [validador4, setValidador4] = useState(false);

    function eliminarUsuario() { 
        profesionalesService.eliminar(id)
            .then(() => {
                setValidador3(true);

                localStorage.removeItem('token');
                localStorage.removeItem('profesional_id');

                setTimeout(() => {
                    navigate('/registro');
                }, 1800);
            })
            .catch((err) => {
                setValidador4(true);
            })
    }

    // SELECT ESPECIALIDADES + FILTROS POR SECCION
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

    return(
        <>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12} lg={12}  alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    {usuario ? (
                        <Grid columns={{lg:12}} >
                            <Grid display={'flex'} flexDirection={'column'}>

                                <Box width={'100%'} mb={5} padding={3} sx={{ boxShadow: 2,  borderRadius: 2, display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'#fff', justifyContent:'space-between' }}>
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
                                        margin="10px"
                                        />
                                        </Box>
                                    </Box>

                                    <Box  justifyContent={'center'} alignItems={'center'}>
                                        <UploadImagen colorIcon="red"/>
                                    </Box>
                                </Box>

                                <Box sx={{width:'100%', backgroundColor:'#fff', padding:4, borderRadius:3,boxShadow: 2,}}>
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
                                        <div>
                                            <TextField defaultValue={usuario.nombre} fullWidth margin='dense' type="text" id="outlined-basic" name="nombre" label="Nombre" variant="outlined" {...register('nombre')}/>

                                            {errors.nombre ? 
                                                (<Alert severity="error">{errors.nombre?.message}</Alert>)
                                            : null}
                                        </div>

                                        <div>
                                            <TextField defaultValue={usuario.apellido} fullWidth margin='dense' type="text" id="outlined-basic" name="apellido" label="Apellido" variant="outlined" {...register('apellido')}/>

                                            {errors.apellido ? 
                                                (<Alert severity="error">{errors.apellido?.message}</Alert>)
                                            : null}
                                        </div>

                                        <div>
                                            <TextField defaultValue={usuario.email} fullWidth margin='dense' type="email" id="outlined-basic" name="email" label="Email" variant="outlined" {...register('email')}/>

                                            {errors.email ? 
                                                (<Alert severity="error">{errors.email?.message}</Alert>)
                                            : null}
                                        </div>

                                        <div>
                                            <TextField defaultValue={usuario.matricula} fullWidth margin='dense' type="number" id="outlined-basic" name="matricula" label="Matrícula" variant="outlined" {...register('matricula')}/>

                                            {errors.matricula ? 
                                                (<Alert severity="error">{errors.matricula?.message}</Alert>)
                                            : null}
                                        </div>

                                        <div>
                                            <FormControl fullWidth variant="outlined" margin='dense' spacing={2}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Especialidad</InputLabel>

                                                <Select
                                                    placeholder='Especialidad'
                                                    labelId="select-especialidad"
                                                    defaultValue={usuario.especialidad}
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
                                        </div>

                                        <div>
                                            <TextField defaultValue={usuario.subespecialidad} fullWidth margin='dense' type="text" id="outlined-basic" name="subespecialidad" label="Subespecialidad" variant="outlined" {...register('subespecialidad')}/>

                                            {errors.subespecialidad ? 
                                                (<Alert severity="error">{errors.subespecialidad?.message}</Alert>)
                                            : null}
                                        </div>

                                        <div>
                                            <FormControl fullWidth variant="outlined" margin='dense' spacing={2}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Consultorio</InputLabel>

                                                <Select
                                                    placeholder='Consultorio'
                                                    labelId="select-consultorio"
                                                    defaultValue={usuario.id_consultorio}
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
                                        </div>

                                    <Grid mt={4} display={'flex'} justifyContent={'space-between'} container>
                                        <ButtonStyle 
                                            type='submit'
                                            text="Editar"
                                            variant="contained"
                                            size="large"
                                            spacing={9}
                                            disableElevation
                                            clase='btnAzul'
                                        />
                                        
                                        <VentanaModal 
                                            nameButton="Eliminar Usuario" 
                                            titleModal="¿Estás seguro que quieres eliminar tu cuenta?"
                                            textcuerpo={'Al confirmar se perderán todos tus datos personales.'}
                                            button1="Confirmar"
                                            button2="Cancelar"
                                            onClick={eliminarUsuario}
                                            clase='btnAzulLetra'
                                        />
                                    </Grid>
                                </form>
                                </Box>
                            </Grid>

                            <Grid>
                                <AlertSnapent
                                    estado={validador}
                                    cerrar={() =>{{setValidador(!validador)}}}
                                    color="success"
                                    closeIcon={false}
                                    mensaje="Datos del perfil actualizados con éxito."
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
                       
                      <Grid container columns={12} display={'flex'} justifyContent={'center'} alignItems={'center'}> 
                            <Box minWidth={100} minHeight={100} justifyContent={'center'} alignItems={'center'}>
                                <CircularProgress disableShrink />
                            </Box>
                      </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default PerfilUsuarioPage