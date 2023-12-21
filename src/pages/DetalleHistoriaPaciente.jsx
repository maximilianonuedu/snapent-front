// REACT
import * as React from 'react';
import { Container, Grid, Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import TitulosHeaders from '../components/TitulosHeaders/TitulosHeaders';
import { useState, useEffect } from "react";
import UploadImagen from '../components/UploadImagen/UploadImagen';
import Text from "../components/Text/Text.jsx";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Modal } from '@mui/material';

// ICONS
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

// SERVICES
import * as usuariosService from './../services/usuarios.services.js';
import * as historiasClinicasService from './../services/historias_clinicas.services.js';

// GLOBAL
import { formatoFecha } from "../../global/formatoFecha.js";

// CSS
import './../index.css';
import "./DetalleHistoriaPaciente.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

function DetalleHistoriaPaciente() {
    const {id} = useParams();
    const [usuario, setUsuario] = useState('');
    const [historiaClinicaInfo, setHistoriaClinica] = useState('');
    const [user, setUser] = useState(null);

    async function traerDatos() {
        try {
            const data = await usuariosService.traerUsuarioPorId(id);
            setUsuario(data);
            setUser(data.nombre + ' ' + data.apellido);

        } catch(err) {
            new Error(err);
        }
    }

    useEffect(() => {
        traerDatos().then(res => {
            historiasClinicasService.traerHistoriasPorPaciente(id, localStorage.getItem('profesional_id'))
                .then((info) => {
                    setHistoriaClinica(info);
                }) 
        })
        .catch(err => {
            new Error(err);
        });
    }, [id])

    // MODAL
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [srcImg, setSrcImg] = React.useState('');

    function handleOpen(source) {
        setSrcImg(source);
        setOpen(true);
    }

    return(
        <>
            <TitulosHeaders
                titulo={usuario && usuario.nombre + ' ' + usuario.apellido}
                icon={<MonitorHeartIcon fontSize='large' color='white'
                />}
            />

            <Container>
                <Grid mt={5} mb={5} display={'flex'} flexDirection={{lg:'row', md:'row', xs:'column'}} container spacing={5}>
                    <Grid lg={6} md={6} xs={12} item>
                        {usuario && (
                            <Grid columns={12}>
                                <Grid columns={12} display='flex' flexDirection='column' justifyContent='space-around'>
                                    <Paper sx={{ boxShadow: 2,  borderRadius: 2, marginBottom:3}}>
                                        <Grid display='flex' flexDirection='column' p={3}>
                                           <Box mb={2}>
                                                <Text
                                                        text = 'Datos personales'
                                                        fontSize="1.3em"
                                                        fontFamily="Lato"
                                                        margin="0px"
                                                        fontWeight="600"
                                                        marginBottom=".5em"
                                                    />
                                           </Box>

                                            <Grid display='flex' flexDirection='row'>
                                                <Grid display='flex' flexDirection='column' mr={3}>
                                                    <Text
                                                        text='Nombre'
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='black'
                                                        marginBottom=".3em"
                                                    />

                                                    <Text
                                                        text={usuario.nombre}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='grey'
                                                    />
                                                </Grid>

                                                <Grid display='flex' flexDirection='column' mr={3}>
                                                    <Text
                                                        text='Apellido'
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        marginBottom=".3em"
                                                        color='black'
                                                    />

                                                    <Text
                                                        text={usuario.apellido}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='grey'
                                                    />
                                                </Grid>

                                                <Grid display='flex' flexDirection='column'>
                                                    <Text
                                                        text='Fecha de nacimiento'
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        marginBottom=".3em"
                                                        color='black'
                                                    />

                                                    <Text
                                                        text={formatoFecha(usuario.fecha_de_nacimiento)}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='grey'
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    
                                    <Paper sx={{ boxShadow: 2,  borderRadius: 2, marginBottom: 3}}>

                                        <Grid display='flex' flexDirection='column' p={3}>
                                            
                                            <Box mb={2}>
                                                <Text
                                                    text = 'Datos de contacto'
                                                    fontSize="1.3em"
                                                    fontFamily="Lato"
                                                    marginBottom=".5em"
                                                    fontWeight="600"
                                                />
                                            </Box>

                                            <Grid display='flex' flexDirection='row'>
                                                <Grid display='flex' flexDirection='column' mr={3}>
                                                    <Text
                                                        text='Email'
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        marginBottom=".5em"
                                                        color='black'
                                                    />

                                                    <Text
                                                        text={usuario.email}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='grey'
                                                    />
                                                </Grid>

                                                <Grid display='flex' flexDirection='column'>
                                                    <Text
                                                        text='Teléfono'
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        marginBottom=".5em"
                                                        color='black'
                                                    />

                                                    <Text
                                                        text={usuario.telefono}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='grey'
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                    <Paper sx={{ boxShadow: 2,  borderRadius: 2}}>
                                        <Grid display='flex' flexDirection='column' p={3}>
                                            
                                            <Box mb={2}>
                                                <Text
                                                    text = 'Datos médicos'
                                                    fontSize="1.3em"
                                                    fontFamily="Lato"
                                                    marginBottom=".5em"
                                                    fontWeight="600"
                                                />
                                            </Box>

                                            <Grid display='flex' flexDirection='row'>
                                                <Grid display='flex' flexDirection='column' mr={3}>
                                                    <Text
                                                        text='Obra Social'
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        marginBottom=".3em"
                                                        color='black'
                                                    />

                                                    <Text
                                                        text={usuario.obra_social}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='grey'
                                                    />
                                                </Grid>

                                                <Grid display='flex' flexDirection='column' mr={3}>
                                                    <Text
                                                        text='Peso'
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        marginBottom=".3em"
                                                        color='black'
                                                    />

                                                    <Text
                                                        text={usuario.peso + ' kg'}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='grey'
                                                    />
                                                </Grid>

                                                <Grid display='flex' flexDirection='column'>
                                                    <Text
                                                        text='Altura'
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        marginBottom=".5em"
                                                        color='black'
                                                    />

                                                    <Text
                                                        text={usuario.altura + ' cm'}
                                                        fontSize="1em"
                                                        fontFamily="Lato"
                                                        fontWeight="400"
                                                        color='grey'
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>

                    <Grid lg={6} md={6} xs={12} item>
                        <Box sx={{ boxShadow: 2,  borderRadius: 2, backgroundColor:'#fff', padding:3 }}>
                            <Grid width={'100%'} display={'flex'} mb={3}>
                                <Text
                                    text = 'Recetas y Estudios Médicos'
                                    fontSize="1.3em"
                                    fontFamily="Lato"
                                    fontWeight="600"
                                />
                            </Grid>

                            <UploadImagen clase='btnHistoria' texto='Añadir archivo' historiaClinica={true}/>

                            {historiaClinicaInfo && (
                                <>
                                    <ImageList sx={{ width: '100%', height: 'auto', marginTop: '1.5em', display: 'flex', justifyContent: 'space-between' }} cols={3} rowHeight={164}>
                                            {historiaClinicaInfo.archivos.map((img) => (
                                                <ImageListItem>
                                                    <div class='crop'>
                                                        <img
                                                            src={`./../../public/historias/${img}`}
                                                            alt={img}
                                                            loading="lazy"
                                                            onClick={() => {handleOpen(`./../../public/historias/${img}`)}}
                                                            class='imgList'
                                                        />
                                                    </div>
                                                </ImageListItem>
                                            ))}
                                    </ImageList>

                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <img src={srcImg} alt={srcImg} class='imgModal'/>
                                        </Box>
                                    </Modal>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default DetalleHistoriaPaciente