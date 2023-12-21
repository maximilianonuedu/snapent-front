// REACT
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AlertSnapent from '../components/Alert/Alert.jsx';
import VentanaModal from '../components/modal/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Text from '../components/Text/Text.jsx';

// SERVICES
import * as profesionalesService from './../services/profesionales.services.js';
import * as obrasSocialesServices from './../services/obras_sociales.services.js';

function ObrasSocialesProfesional() {

    // OBRAS SOCIALES ASOCIADAS AL PROFESIONAL
    let id = localStorage.getItem('profesional_id');
    const[obrasSociales, setObrasSociales] = useState([]);

    useEffect(() => {
        profesionalesService.traerProfesionalPorId(id)
            .then(data => { 
                if(data){
                    setObrasSociales(data.obras_sociales);
                }
            })
    }, []);

    let sinObraSocial = obrasSociales.includes('No poseo Obra Social')

    // ELIMINAR OBRA SOCIAL
    const [validador, setValidador] = useState(false);

    function eliminarObraSocial(nombre, id) {
        profesionalesService.eliminarObraSocial(nombre, id)
        .then(() => {
            setValidador(true);
            location.reload();
        })
    }

    // AGREGAR OBRA SOCIAL
    const [validador2, setValidador2] = useState(false);
    const [validador3, setValidador3] = useState(false);

    const styles = {
        divider: {
            color:'#fff',
            backgroundColor:'#ffffff26',
            height:'auto'
        },
        select: {
            backgroundColor:'#ffffff26',
            color:'black',
            border:0,
            borderRadius:30,
            margin:0,
            marginLeft:5
        },
         items: {
            color:'black',
            border:0,
            borderRadius:30,
            width:'100%'
        },
        label:{
            color:'black',
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

    const [obrasSocialesSelect, setObrasSocialesSelect] = useState([]);

    useEffect(() => {
        obrasSocialesServices.traerObrasSociales()
            .then(data => {
                setObrasSocialesSelect(data);
            })
    }, []);

    const [obraSocialSeleccionada, setObraSocialSeleccionada] = useState('Luis Pasteur')

    function onChangeObraSocial(event) {
        setObraSocialSeleccionada(event.target.value);
    }

    function agregarObraSocial() {
        if(sinObraSocial !== true) {
            profesionalesService.agregarObraSocial(obraSocialSeleccionada, id)
            .then((rta) => {
                if (rta === null) {
                    setValidador3(true);
    
                } else {
                    setValidador2(true);
                    location.reload();
                }
            })  

        } else {
            profesionalesService.eliminarObraSocial('No poseo Obra Social', id)
                .then(() => {
                    profesionalesService.agregarObraSocial(obraSocialSeleccionada, id)
                        .then(() => {
                            setValidador2(true);
                            location.reload();
                        }) 
                })
        }

    }

    return (
        <Grid>
            <Box  sx={{ boxShadow: 2,  borderRadius: 2, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:4, backgroundColor:'#fff' }}>
                <FormControl fullWidth style={styles.select}>
                    
                   <Grid display={'flex'} width={'100%'} flexDirection={{ xs: "column", lg: "row" }} columns={12} justifyContent={'space-between'}>
                   <Box marginBottom={2} m={0} width="100%" alignItems={'center'} display={'flex'}>
                        <Text
                            text="¿Deseas añadir una nueva obra social?"
                            fontFamily="Lato"
                            fontWeight="bold"
                            fontSize="1.3m"
                            color="black"
                        />
                    </Box>
                   

                   <Grid display={'flex'} width="100%" justifyContent={'end'} alignItems={'center'} flexDirection={'row'} flexWrap={'nowrap'} container mt={{ xs: 4, lg:0 }}>
                        <Grid item lg={4} width="100%">
                            <Select
                                placeholder='Selecciona un obra social'
                                labelId="select-obra-social"
                                onChange={onChangeObraSocial}
                                style={styles.items}
                                defaultValue={"Luis Pasteur"}
                            >
                                {obrasSocialesSelect.map((obra_social) => (
                                    <MenuItem value={obra_social.nombre}>{obra_social.nombre}</MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Button onClick={agregarObraSocial}>AÑADIR</Button>
                    </Grid>
                   </Grid>
                </FormControl>
            </Box>

            <Grid
                display='flex'
                flexDirection='row'
                flexWrap={'wrap'}
                my={3}
            >
                
                    {obrasSociales.length > 0 ?
                        sinObraSocial !== true ?
                            obrasSociales.map((obraSocial) => (
                                (<>
                                    <Card sx={{ maxWidth: 275 }} style={{margin:'10px'}}>
                                        <CardActionArea style={{display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
                                        <CardMedia
                                            component="img"
                                            style={{padding:'10px'}}
                                            height="90%"
                                            image={`./../../obras_sociales/${obraSocial}.png`}
                                            alt={obraSocial}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="Grid">
                                            {obraSocial}
                                            </Typography>
                                        </CardContent>

                                        <CardActions>
                                            <VentanaModal 
                                                nameButton="Eliminar" 
                                                titleModal="¿Estás seguro que quieres eliminar esta obra social?"
                                                textcuerpo={'Al eliminarla dejarás de prestar servicios para los pacientes que tengan esta obra social.'}
                                                button1="Eliminar"
                                                button2="Cancelar"
                                                onClick={() => {eliminarObraSocial(obraSocial, id)}}
                                            />
                                        </CardActions>
                                        </CardActionArea>
                                    </Card>
                                </>) 
                            )) 
                        :
                            (<>
                                <p>No cuentas con obras sociales asociadas.</p>
                            </>)
                    :
                        (<>
                            <p>No cuentas con obras sociales asociadas.</p>
                        </>)
                    }
            </Grid>
            
            <Grid>
                    <AlertSnapent
                        estado={validador}
                        cerrar={() =>{{setValidador(!validador)}}}
                        color="success"
                        closeIcon={false}
                        mensaje="Obra social eliminada con éxito."
                    />
            </Grid>

            <Grid>
                    <AlertSnapent
                        estado={validador2}
                        cerrar={() =>{{setValidador2(!validador2)}}}
                        color="success"
                        closeIcon={false}
                        mensaje="Obra social añadida con éxito."
                    />
            </Grid>

            <Grid>
                    <AlertSnapent
                        estado={validador3}
                        cerrar={() =>{{setValidador3(!validador3)}}}
                        color="error"
                        closeIcon={false}
                        mensaje="Esta obra social ya existe."
                    />
            </Grid>
        </Grid>

    )
}

export default ObrasSocialesProfesional