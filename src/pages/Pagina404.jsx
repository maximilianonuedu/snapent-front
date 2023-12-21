// REACT
import Box from '@mui/material/Box';
import Text from '../components/Text/Text';

// IMGS
import backgroundTextura from './../assets/imgs/backgroundTextura.svg';

const styles ={
    backgroundColor: '#EA5C03',
    color: '#FFFFFF',
    height:'100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundImage: 'url(' + backgroundTextura + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}

function Pagina404() {
    return(
        <Box style={styles}>
            <Text
               text="404"
               fontSize="8em"
               color="#fff"
               fontFamily="Lato"
               fontWeight="900"
               textAlign="Left"
               margin="15px 15px"
            />
            
            <Text
               text="Página no encontrada"
               fontSize="3em"
               color="#fff"
               fontFamily="Lato"
               fontWeight="600"
               textAlign="center"
               margin="15px 15px"
            />

            <Text
               text="Puedes visitar la página anterior, visitar nuestra página de inicio o ponerte en contacto con nuestro equipo de asistencia técnica."
               fontSize="1em"
               color="#fff"
               fontFamily="Lato"
               fontWeight="600"
               textAlign="center"
               margin="15px 15px"
            />
        </Box>
    )
}

export default Pagina404