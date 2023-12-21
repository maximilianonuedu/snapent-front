// REACT
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Container, Grid } from "@mui/material";
import ItemsAgenda from './../components/ItemsAgenda/ItemsAgenda';
import { useParams } from 'react-router';

// SERVICES
import * as profesionalesServices from './../services/profesionales.services';

function GestioAgendaProfesional(){
    // GENERAL
    const {id} = useParams();
    const [dias, setDias] = useState([]);
    
    useEffect(() => {
        profesionalesServices.traerDisponibilidadHorariaPorID(id)
            .then(res => {
                setDias(res);
            })
            .catch(err => {
                new Error(err);
            })
    }, [id]);

    return(
        <Container maxWidth='md'>
            <Grid container display='flex' flexDirection='column' column={12} fullWidth>
                {dias.map((dia) => (
                    <ItemsAgenda
                        dia={dia.dia}
                        horaInicio={dia.horaInicio}
                        horaFin={dia.horaFin}
                        deshabilitado={dia.deshabilitado}
                    />                                          
                ))}                                         
            </Grid>
        </Container>
    )
}

export default GestioAgendaProfesional