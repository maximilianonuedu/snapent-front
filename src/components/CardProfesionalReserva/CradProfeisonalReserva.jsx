// REACT
import * as React from 'react';
import { Box } from '@mui/system';
import { Avatar, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Skeleton } from '@mui/material';

const useStyles = makeStyles({
    titulo:{
        color:'red',
        fontSize:'40px',
        fontFamily:'Lato',
        fontWeight:'bold',
    },
    profesional:{
        boxShadow:'black'
    }
});


function CardProfesionalReserva(props) {
    const classes = useStyles();

    return (
        <Box display='flex' flexDirection='row' alignItems='space-arround' whiteSpace={3} className={classes.profesional} borderRadius={10} boxShadow={3} padding={2}>
            <Box padding={1}>
                <Avatar
                    style={{ backgroundColor: props.colorAvatar}}
                    alt="Remy Sharp"
                    src={props.avatar}
                    sx={{ width: 56, height: 56, fontSize:25 }}
                >
                        {props.inicialesProfesional}
                </Avatar>
            </Box>
            <Box display='flex' flexDirection='column'>
                {
                    props.nombre ? 
                    <Typography className={classes.titulo}>
                        {props.nombre} {props.apellido}
                    </Typography>
                    :
                    <Skeleton lg={{ animationDuration: "0.3s" }} variant="h1" animation="wave" width={'100%'} height={60} />
                }
                
                {
                    props.especialidad ? 
                    <Typography className={classes.profesional}>
                        {props.especialidad}
                    </Typography>
                    :
                    <Skeleton lg={{ animationDuration: "0.3s" }} variant="h4" animation="wave" width={'100%'} height={60} />
                }
            </Box>

        </Box>
    );
}

export default CardProfesionalReserva;