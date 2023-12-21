// REACT
import * as React from 'react';
import { Grid, Box } from '@mui/material';
import Text from './../Text/Text';
import fondoImagen from '../../assets/imgs/header-titulos.jpg';

function TitulosHeaders(props) {

    const styles = {
        fondo: {
            backgroundColor:'#065FAA',
            backgroundImage: `url(${fondoImagen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'start center',
            backgroundAttachment: 'cover',
            backgroundRepeat: 'no-repeat',
            paddingTop:'80px',
            paddingBottom:'20px',
        },
       
    }

    return (
        <>
            <Grid className='hedearTitulos' display={'flex'} flexDirection={props.direccion ? 'row' : 'column'}  justifyContent={'center'} alignItems={'center'} container columns={12} style={styles.fondo}>
                {props.icon}
                <Text
                    color='#fff'
                    textaling='center'
                    fontSize='3em'
                    fontFamily='Lato'
                    fontWeight='bold'
                    text={props.titulo}
                />
            </Grid>
        </>
    )
}

export default TitulosHeaders