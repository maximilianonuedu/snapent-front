// REACT
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {Grid} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import AlertSnapent from '../Alert/Alert';
import Button from '@mui/material/Button';
import FiltrosBusqueda from '../FiltrosBusqueda/FiltrosBusqueda';

// CSS
import './styles.css';

// SERVICES
import * as especialidadesServices from './../../services/especialidades.services.js';
import * as obrasSocialesServices from './../../services/obras_sociales.services.js';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    color:'#fff',
    fontSize: '30px',
    padding: '10px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '5em',
}));

const StyledInputBase = styled(InputBase, Select)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    // GENERAL
    const navigate = useNavigate();

    const styles = {
        divider: {
            color:'#fff',
            backgroundColor:'#ffffff26',
            height:'auto'
        },
        select: {
            backgroundColor:'#ffffff26',
            color:'#fff',
            border:0,
            borderRadius:30,
            margin:0,
            marginLeft:5
        },
         items: {
            color:'#fff',
            border:0,
            borderRadius:30,
        },
        label:{
            color:'#fff',
            border:0,
        },
        select_group:{
            borderBottom: '1px solid grey',

        },
        containerSearch:{
            justifyContent:'space-around',
            padding: '15px',

        }
    }

    // SELECT ESPECIALIDADES + SELECT OBRA SOCIALES
    const [especialidades, setEspecialidades] = useState([]);
    const [obras_sociales, setObrasSociales] = useState([]);

    // FILTROS
    const [cuerpos_medicos, setCuerposMedicos] = useState([]);
    const [salud_mental, setSaludMental] = useState([]);
    const [estudios, setEstudios] = useState([]);

    async function traerDatosSelect() {
        try{
            const especialidades = await especialidadesServices.traerEspecialidades();
            const obrasSociales = await obrasSocialesServices.traerObrasSociales();

            setEspecialidades(especialidades);
            setObrasSociales(obrasSociales);

            // CUERPO MÉDICO
            const cuerposMedicosArray = especialidades.filter(especialidad => {
                return especialidad.seccion === 'Cuerpo Médico';
            });

            setCuerposMedicos(cuerposMedicosArray);

            // SALUD MENTAL
            const saludMentalArray = especialidades.filter(especialidad => {
                return especialidad.seccion === 'Salud Mental';
            });

            setSaludMental(saludMentalArray);

            // ESTUDIOS
            const estudiosArray = especialidades.filter(especialidad => {
                return especialidad.seccion === 'Estudios de Diagnóstico y Tratamiento';
            });

            setEstudios(estudiosArray);


        } catch(err) {
            new Error(err);
        }
    }

    useEffect(() => {
        traerDatosSelect().then(res => {
            
        })
        .catch(err => {
            new Error(err);
        });
    }, []);

    // BUSQUEDA DE PROFESIONALES
    const [busquedaPorNombre, setBusquedaPorNombre] = useState(null)
    const [busquedaPorEspecialidad, setBusquedaPorEspecialidad] = useState(null)
    const [busquedaPorObraSocial, setBusquedaPorObraSocial] = useState(null)
    const [validador, setValidador] = useState(false)

    function onChangeNombre(event) {
        let nombreBusqueda = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
        setBusquedaPorNombre(nombreBusqueda);
    }

    function onChangeEspecialidad(event) {
        setBusquedaPorEspecialidad(event.target.value);
    }

    function onChangeObraSocial(event) {
        setBusquedaPorObraSocial(event.target.value);
    }

    function buscar() {
        if(busquedaPorNombre != null || busquedaPorEspecialidad != null || busquedaPorObraSocial != null){
            navigate('/profesionales', { state: { nombre: busquedaPorNombre, especialidad: busquedaPorEspecialidad, obras_sociales: busquedaPorObraSocial } });
        } else {
            setValidador(true);
        }
    }

    return (

        <>
            <Grid container justifyContent={'space-between'} flexDirection={'column'}>
                <Grid container justifyContent={'center'} 
                    direction={{
                        lg: 'row',
                        md: 'column',
                        xs: 'column'
                    }}
                
                >
                    <Grid width={'100%'} display={'flex'} direction={'row'} item xs={12} lg={6} justifyContent={'center'} alignItems={'center'}>
                        <Grid 
                            display={{
                                lg: 'flex',
                                md: 'flex',
                                xs: 'flex'
                            }}
                            direction={{
                                lg: 'row',
                                md: 'row',
                                xs: 'column'
                            }}
                            width="100%"
                            style={styles.containerSearch}
                            height={{
                                xs: 'auto',
                                lg:'auto',
                                md:'auto'
                            }}
                        
                        >
                            <Search style={{ alignItems:'center', fontSize:'50px', flexDirection:'row', padding:5, borderRadius:30, margin:0, width:'auto', flexGrow:1 }}>
                                <Grid 
                                    display={'flex'}
                                    flexDirection={{
                                        lg: 'row',
                                        md: 'row',
                                        xs:'column'
                                    }}
                                >
                                    <Grid display={'flex'} flexDirection={'row'}>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>

                                        <StyledInputBase
                                        placeholder="Buscar especialista"
                                        inputProps={{ 'aria-label': 'search' }} onChange={onChangeNombre}
                                        />
                                    </Grid>

                                   

                                    <Grid display={{ xs: "none", lg: "flex" }} width={'100%'} >
                                        <FormControl fullWidth >
                                            <InputLabel focused={false} style={styles.label} id="select-especialidad">Especialidad</InputLabel>

                                            <Select
                                            placeholder='Selecciona un especialidad'
                                            labelId="select-especialidad"
                                            onChange={onChangeEspecialidad}
                                            style={styles.items}
                                            displayEmpty
                                            options={especialidades}
                                            >
                                                <MenuItem value="Cuerpo Médico" style={styles.select_group} disabled>Cuerpo Médico</MenuItem>
                                                {cuerpos_medicos.map((cuerpo_medico) => (
                                                    <MenuItem value={cuerpo_medico.nombre}>{cuerpo_medico.nombre}</MenuItem>
                                                ))}

                                                <MenuItem value="Salud Mental" style={styles.select_group} disabled>Salud Mental</MenuItem>
                                                {salud_mental.map((salud_mental_opc) => (
                                                        <MenuItem value={salud_mental_opc.nombre}>{salud_mental_opc.nombre}</MenuItem>
                                                ))}

                                                <MenuItem value="Estudios de Diagnóstico y Tratamiento" style={styles.select_group} disabled>Estudios de Diagnóstico y Tratamiento</MenuItem>
                                                {estudios.map((estudio) => (
                                                        <MenuItem value={estudio.nombre}>{estudio.nombre}</MenuItem>
                                                ))}
                                                
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth style={styles.select}>
                                            <InputLabel focused={false} style={styles.label} id="select-obra-social">Obra Social</InputLabel>

                                            <Select
                                            placeholder='Selecciona un obra social'
                                            labelId="select-obra-social"
                                            onChange={onChangeObraSocial}
                                            style={styles.items}
                                            displayEmpty
                                            >
                                                {obras_sociales.map((obra_social) => (
                                                    <MenuItem value={obra_social.nombre}>{obra_social.nombre}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid
                                    marginLeft={1}
                                    display={{
                                        lg: 'flex',
                                        md: 'flex',
                                        xs: 'none'
                                    }}
                                    >
                                        <Grid
                                            display={{
                                                lg: 'flex',
                                                md: 'flex',
                                                xs: 'flex'
                                            }}
                                        >
                                            <IconButton style={{ backgroundColor:'#ffffff26', color:'#fff', fontSize:'15em', padding:'15px' }} aria-label="search" onClick={buscar}>
                                                <SearchIcon color='#ffffff26' />
                                            </IconButton>
                                        </Grid>

                                      
                                    </Grid>
                                </Grid>
                            </Search>
                            <Grid flexDirection={'column'} display={{ xs: "flex", lg: "none" }} width={'100%'} >
                                        <Grid mt={2}>
                                            <FormControl fullWidth style={styles.select} >
                                                <InputLabel focused={false} style={styles.label} id="select-especialidad">Especialidad</InputLabel>

                                                <Select
                                                placeholder='Selecciona un especialidad'
                                                labelId="select-especialidad"
                                                onChange={onChangeEspecialidad}
                                                style={styles.items}
                                                displayEmpty
                                                options={especialidades}
                                                >
                                                    <MenuItem value="Cuerpo Médico" style={styles.select_group} disabled>Cuerpo Médico</MenuItem>
                                                    {cuerpos_medicos.map((cuerpo_medico) => (
                                                        <MenuItem value={cuerpo_medico.nombre}>{cuerpo_medico.nombre}</MenuItem>
                                                    ))}

                                                    <MenuItem value="Salud Mental" style={styles.select_group} disabled>Salud Mental</MenuItem>
                                                    {salud_mental.map((salud_mental_opc) => (
                                                            <MenuItem value={salud_mental_opc.nombre}>{salud_mental_opc.nombre}</MenuItem>
                                                    ))}

                                                    <MenuItem value="Estudios de Diagnóstico y Tratamiento" style={styles.select_group} disabled>Estudios de Diagnóstico y Tratamiento</MenuItem>
                                                    {estudios.map((estudio) => (
                                                            <MenuItem value={estudio.nombre}>{estudio.nombre}</MenuItem>
                                                    ))}
                                                    
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid mt={2}>
                                            <FormControl fullWidth style={styles.select}>
                                                <InputLabel focused={false} style={styles.label} id="select-obra-social">Obra Social</InputLabel>

                                                <Select
                                                placeholder='Selecciona un obra social'
                                                labelId="select-obra-social"
                                                onChange={onChangeObraSocial}
                                                style={styles.items}
                                                displayEmpty
                                                >
                                                    {obras_sociales.map((obra_social) => (
                                                        <MenuItem value={obra_social.nombre}>{obra_social.nombre}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid display={{ xs: "flex", lg: "none" }} mt={3} width={'100%'}>
                             <Button fullWidth style={{ backgroundColor:'#ffffff26', color:'#fff', fontSize:'1em', padding:'15px', borderRadius:30 }} aria-label="search" onClick={buscar}> 
                                Buscar
                            </Button>                           
                        </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
           
            <Grid>
                <AlertSnapent
                    estado={validador}
                    cerrar={() =>{{setValidador(!validador)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="Ingresa el nombre de un profesional o filtra por especialidad u obra social."
                />
            </Grid>
        </>
    );
}