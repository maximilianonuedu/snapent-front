// REACT
import { Grid, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

// IMAGENES
import logo from './../../assets/imgs/isologo.png';

// CSS
import './footer.css';

// ICONS
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {

    const styles = {
        contacto: {
            color: '#BABABA',
            fontWeight: 'bold',
            fontSize: '1em',
            fontFamily: 'Arial', 
            marginTop: '1.5em'
        },
        mail: {
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '2em',
            fontFamily: 'Lato',
            marginTop: '.5em'
        },
        footerText: {
            color: '#005EAA',
            fontWeight: 'bold',
            fontSize: '2.2em',
            fontFamily: 'Lato',
            display: 'inline',
            marginTop: '0'
        },
        footerSubText: {
            color: '#005EAA',
            fontWeight: '300',
            fontSize: '1.3em',
            fontFamily: 'Lato', 
            marginTop: '0',
            marginBottom: '1.8em'
        },
        seguinos: {
            color: 'grey',
            fontWeight: 'bold',
            fontSize: '1em',
            fontFamily: 'Arial'
        },
        socialmedia:{
            color: '#005EAA',
            fontWeight: '100',
            fontSize: '1.3em',
            textAlign:'right',
            fontFamily: 'Lato'
        },
        copyright:{
            color: '#BABABA',
            fontSize: '1em',
            fontFamily: 'Lato'
        },
        footer:{
            bottom:'0 !important',
            position: 'absolute',
            width:'100%'
        }
    }

    return (
        <>
            <footer>
                <Grid item={true} lg={12} p={2} container flexDirection={'row'}>
                    <Grid item={true} xs={12} sm={6} md={6} lg={6} textAlign={{ xs: "center", lg: "left" }}>
                        <Box lg={{ display:'flex', justifyContent:'start'}}  xs={{ display:'flex', justifyContent:'center'}}>
                            <img src={logo} alt="isologo" />
                        </Box>

                        <Box lineHeight={1}>
                            <p style={styles.contacto}>Contacto</p>

                            <p style={styles.mail}>info@snapent.com.ar</p>
                        </Box>
                    </Grid>
        
                    <Grid item={true} xs={12} sm={6} md={6} lg={6} >
                        <Grid xs={{justifyContent:'center'}} justifyContent={'end'} flexDirection={'column'} textAlign={{ xs: "center", lg: "right" }} mt={{ xs: 3, lg:0}}>
                            <p style={styles.footerText} >Tu salud</p>

                            <p style={styles.footerSubText}>EN UNA SOLA PLATAFORMA</p>
                        </Grid>

                        <Box display={'flex'} justifyContent={'end'} flexDirection={'column'} textAlign={{ xs: "center", lg: "right" }} mb={2}>
                            <p style={styles.seguinos}>REDES SOCIALES</p>

                            <Box display={'flex'} justifyContent={{ xs: "center", lg: "end" }}>
                                <IconButton><FacebookIcon/></IconButton>
                                <IconButton><TwitterIcon/></IconButton>
                                <IconButton><InstagramIcon/></IconButton>
                                <IconButton><LinkedInIcon/></IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider variant="middle" />
                
                <Grid item={true} container xs={12} sm={6} md={6} lg={12}>
                    <Box pt={2} width={'100%'} textAlign={'center'}>
                        <p style={styles.copyright}>© <b>SNAPENT</b> | Todos los derechos reservados 2023</p>
                    </Box>
                </Grid>
            </footer>
        </>
    )
}

export default Footer