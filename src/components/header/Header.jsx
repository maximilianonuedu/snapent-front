// REACT
import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import ButtonPefil from '../ButtonPerfil/ButtonPerfil';
import Sidebar from '../Sidebar/Sidebar';
import Divider from '@mui/material/Divider';
import { makeStyles } from "@material-ui/core";

// ICONS
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Login from '@mui/icons-material/Login';

// IMAGENES
import logoBlanco from './../../assets/imgs/logoblanco.png';
import logoColor from './../../assets/imgs/logo.png';
import isoLogo from './../../assets/imgs/isologoheader.svg';

// CSS
import './header.css';
import theme from '../colores/colores';

const styles = {
    Header: {
        padding: '0px !important',
        marging: '0px !important'
    },
    HeaderW: {
        backgroundColor:'white',
        padding: '0px !important',
        marging: '0px !important'
    },
    btnResgitro: {
        color: 'black',
        padding: '0px !important',
        marging: '0px !important'
    },
    btnLogin: {
        color: 'black',
       fontWeight: 'bold',
       padding: '0px !important'
    },
    transparente:{
        backgroundColor:'transparent',
        paddingLeft:0
    },
    color:{
        backgroundColor:'white',
        paddingLeft:0
    },
    bienvenida:{
        color:  theme.palette.blanco
    },
    
}

const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiPaper-root": {
        backgroundColor:'transparent',
      }
    }
  }));

function Header() {

    // EFECTO SCROLL
    const [scroll, setScroll] = useState(false);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        scrollPosition > 0 ? setScroll(false) : setScroll(true)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const classes = useStyles();
    return (
        <Container className={classes.root} maxWidth={'100%'} style={{ paddingLeft:0 }}>
            <Box  sm={{  display: 'flex' ,justifyContent: 'space-between', flexDirection:'row', padding:2}}>
                <AppBar style={ !scroll ? { backgroundImage: "linear-gradient(to right, #f05b00, #225cae)", paddingTop:6 } : { backgroundImage: "none", padding:6 } } color={scroll ? 'transparent' : 'transparent'} position={'fixed'} elevation={ scroll ? 0 : 3}>
                    <Grid lg={{pl:3, pr:3, pt:0.5, pb:0.5}} sx={{pl:1, pr:1, pt:0.5, pb:0.5}} container display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                        <Grid item display={'grid'}>
                            <Sidebar/>
                        </Grid>

                        <Grid item className={'logo'}>
                            <Link style={{margin:0, padding:0}} to="/">
                                <img src={logoColor}/>
                            </Link>
                        </Grid>

                        <Grid item className={'isologo'}>
                            <Link style={{margin:0, padding:0}} to="/">
                                <img src={isoLogo}/>
                            </Link>
                        </Grid>

                        <Grid item p={0}>
                            {(localStorage.getItem('token')) ? (
                                <>
                                    <Grid display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                        <Typography lg={{display:'block'}} md={{display:'flex'}} sx={{display:'none'}} style={{color:'white'}} display="block" align='center' variant='subtitle1' color='secondary'>BIENVENIDO</Typography>
                                        <ButtonPefil/>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Link style={{padding: 0, textDecoration: 'none'}} to="/registro">
                                        <Button disableElevation style={styles.btnResgitro} startIcon={<HowToRegIcon style={{ marging: 0, color:'#fff'}} color="white"/>}>
                                            <Box sx={{ display: { xs: 'none', lg: 'flex', xl: 'flex' }, padding:0 }}>
                                                <Typography color={'#fff'}>Registrarse</Typography>
                                            </Box>
                                        </Button>
                                    </Link>
                                
                                    
                                    <Link style={{padding: 0, textDecoration: 'none'}} to="/login">
                                        <Button disableElevation style={styles.btnLogin} startIcon={<Login style={{ marging: 0, color:'#fff'}} />}>
                                            <Box sx={{ display: { xs: 'none', lg: 'flex', xl: 'flex' } }}>
                                                <Typography color={'#fff'}>Ingresar</Typography>
                                            </Box>
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Grid>
                    </Grid>
                        <Divider orientation={'horizontal'} variant="fullWidth" flexItem={true} />
                </AppBar>
            </Box>
        </Container>
    );
  }

  export default Header;