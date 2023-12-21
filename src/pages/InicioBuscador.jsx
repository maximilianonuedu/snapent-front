// REACT
import { Grid, Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Buscador from './../components/Buscador/Buscador';
import Text from '../components/Text/Text';
import backgroundSidebar from '../assets/imgs/sidebar-background.svg';
import Link from '@mui/material/Link';

// CSS
import './Login.css';

// ICONS
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const styles = {
    fondo: {
      backgroundImage: `url(${"../assets/imgs/sidebar-background.svg"})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
    }
   };


function InicioBuscador(styles) {
    return(
        <Grid
            width={'100%'}
            container 
            columns={12}
            className='buscador' 
            flexDirection={'row'}
            flexWrap={'nowrap'}
            >

            <Grid columns={{lg:0}} display={{ xs: "none", lg: "flex" }}  item style={{backgroundColor:'tranparent'}}>
                <Paper elevation={3} className="fondo-sidebar">
                    <Grid height={'100vh'} container display={'flex'} justifyContent={'space-arround'} alignItems={'center'} flexDirection={'column'}>
                       <Grid item display={'hidden'} flexGrow={1}>
                        <p style={{color:'#ffffff00'}}>hola</p>
                       </Grid>

                       <Grid overflow={'hidden'} flexGrow={4} item display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                            <div className='boton-vertical'>
                                <Button href='/preguntas' size='small' variant="text" color="white">
                                    PREGUNTAS
                                </Button>
                            </div>
                            
                            <div className='boton-vertical'>
                                <Button href='/soporte' size='small' variant="text" color="white">
                                    SOPORTE
                                </Button>
                            </div>

                            <div className='boton-vertical'>
                                <Button href='/nosotros' size='small' variant="text" color="white">
                                    NOSOTROS
                                </Button>
                            </div>
                       </Grid>

                       <Grid flexGrow={1} display={'flex'} justifyContent={'center'} alignItems={'center'} item>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'end'}>
                                <IconButton color='white'><FacebookIcon/></IconButton>
                                <IconButton color='white'><TwitterIcon/></IconButton>
                                <IconButton color='white'><InstagramIcon/></IconButton>
                                <IconButton color='white'><LinkedInIcon/></IconButton>
                            </Box>
                       </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item display={'flex'} style={{ width:'100%'}} alignItems={'center'} justifyContent={'space-around'} py={19} width={'100%'} flexDirection={'column'}>
                <Text
                    text="Busca tu profesional por nombre, especialidad u obra social"
                    fontFamily="Arial"
                    fontSize="22px"
                    color="#fff"
                    fontWeight="bold"
                    textAlign="center"
                    margin="20px"
                />

                <Buscador/>  

                <Grid width={'100%'}
                    columns={{
                        lg: 10,
                        md: 10,
                        xs: 12
                    }}
                        flexWrap={'nowrap'}
                     container pt={3} pb={0} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>
                    <Grid ml={2}>
                        <Paper elevation={2} style={{padding:10, display:'flex',flexShrink:4 ,backgroundColor:'#ee7411', color:'white', textAlign:'center', borderRadius:"10px", flexDirection:'column', minWidth:'10%'}}>
                            <Typography variant='h4'>+ 250</Typography>
                            <Typography variant='subtitle2'>Profesionales</Typography>
                        </Paper>
                    </Grid>

                    <Grid ml={2}>
                        <Paper elevation={2} style={{padding:10, display:'flex' ,flexShrink:4 ,backgroundColor:'#2c70b7', color:'white', textAlign:'center', borderRadius:"10px", flexDirection:'column',  minWidth:'10%'}}>
                            <Typography variant='h4'>+ 75</Typography>
                            <Typography variant='subtitle2'>Especialidades</Typography>
                        </Paper>
                    </Grid>

                    <Grid ml={2}>
                        <Paper elevation={2} style={{padding:10, display:'flex' ,flexShrink:4 ,backgroundColor:'#30bad2', color:'white', textAlign:'center', borderRadius:"10px", flexDirection:'column',  minWidth:'10%'}}>
                            <Typography variant='h4'>+ 500</Typography>
                            <Typography variant='subtitle2'>Obras sociales</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default InicioBuscador;