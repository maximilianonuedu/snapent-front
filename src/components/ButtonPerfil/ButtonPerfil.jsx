// REACT
import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Grid } from '@mui/material';
import AlertSnapent from '../Alert/Alert.jsx';
import ListItemText from '@mui/material/ListItemText';
import Text from '../Text/Text.jsx';

// ICONS
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Logout from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

// SERVICES
import * as usuariosService from '../../services/usuarios.services.js';
import * as profesionalesService from '../../services/profesionales.services.js';

export default function AccountMenu() {

    // BTN NAVIGATE
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null); 
    };

    // GUARDANDO LA INICIAL DEL USUARIO
    const [perfil, setPerfil] = useState('');
    const [usuarioInicial, setUsuarioInicial] = useState('');
    const [usuario, setUsuario] = useState('');

    // IDS
    const idUsuario = localStorage.getItem('usuario_id');
    const idProfesional = localStorage.getItem('profesional_id');

    useEffect(() => {
        if(localStorage.getItem('usuario_id')) {
            setPerfil(localStorage.getItem('usuario_id'));
    
            usuariosService.traerUsuarioPorId(idUsuario)
            .then(data => { 
                if(data){
                    setUsuarioInicial(data.nombre.charAt(0).toUpperCase());
                    setUsuario(data);
                }
    
            })
    
        } else if (localStorage.getItem('profesional_id')) {
            setPerfil(localStorage.getItem('profesional_id'));
    
            profesionalesService.traerProfesionalPorId(idProfesional)
            .then(data => { 
                if(data){
                    setUsuarioInicial(data.nombre.charAt(0).toUpperCase());
                    setUsuario(data);
                }
    
            })
                
        }
    }, [])

    // CERRAR SESIÓN
    const[validador, setValidador] = useState(false);
    const[validador2, setValidador2] = useState(false);

    const logout = () =>{
        const token = localStorage.getItem('token');

        if(idUsuario) {
            usuariosService.logout(token)
                .then(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('usuario_id');

                    setValidador(true);
                    navigate('/login')
                })
                .catch((err) => {
                    setValidador2(true);
                })

        } else if(idProfesional) {

            profesionalesService.logout(token)
                .then(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('profesional_id');
                    localStorage.removeItem('eventos');

                    setValidador(true);
                    navigate('/login')
                })
                .catch((err) => {
                    setValidador2(true);
                })
        } 
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Box sx={{flexDirection:'row'}} display={{ xs: "none", lg: "flex" }}>
                    <Text
                        text={'¡'}
                        fontSize={'1.3em'}
                        fontFamily="Lato"
                        fontWeight="300"
                        color={'#fff'}
                    />

                    <Box mr={0.5}>
                        <Text
                            text="Hola "
                            fontSize={'1.3em'}
                            fontFamily="Lato"
                            color={'#fff'}
                            
                        /> 
                    </Box>
                    
                    <Text
                        text={usuario.nombre+'!'}
                        fontSize={'1.3em'}
                        fontFamily="Lato"
                        fontWeight="300"
                        color={'#fff'}
                    />
                   
                </Box>
                <Tooltip title="Configuración de la cuenta">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {usuario.avatar != '' ? (

                            <Avatar sx={{ width: 32, height: 32, backgroundColor: usuario.color_avatar }} src={'./../../../avatares/' + usuario.avatar}>{usuarioInicial}</Avatar>

                         ) : (

                            <Avatar sx={{ width: 32, height: 32, backgroundColor: usuario.color_avatar }}>{usuarioInicial}</Avatar>

                        )}
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    idUsuario ?  
                    (
                        <Box>
                            <MenuItem component={Link} to={'/perfil/' + perfil}>
                                <ListItemIcon>
                                    <AccountCircleIcon color='action' fontSize='medium' />
                                </ListItemIcon>

                                <ListItemText><span style={{color:'black'}}>Perfil</span></ListItemText>                          
                            </MenuItem>
                            
                            <MenuItem component={Link} to={'/turnos/' + perfil}>
                                <ListItemIcon>
                                    <ListAltIcon color='action' fontSize='medium' />
                                </ListItemIcon>
                                    
                                <ListItemText><span style={{color:'black'}}>Mis turnos</span></ListItemText>
                            </MenuItem>

                            <MenuItem component={Link} to={'/historiaClinica/' + perfil}>
                                <ListItemIcon>
                                    <MonitorHeartIcon color='action' fontSize='medium' />
                                </ListItemIcon>
                                    
                                <ListItemText><span style={{color:'black'}}>Historia Clínica</span></ListItemText>
                            </MenuItem>
                        </Box>
                
                    ):
                    null
                }
               
                {
                    idProfesional ?  
                    (
                        <MenuItem component={Link} to={'/panel/' + perfil}>
                            <ListItemIcon>
                                <AdminPanelSettingsIcon color='action' fontSize='medium' />
                            </ListItemIcon>

                            <ListItemText><span style={{color:'black'}}>Panel</span></ListItemText>
                        </MenuItem>
                    ):
                    null
                }

                <Divider />
                
                <MenuItem onClick={logout}> 
                    <ListItemIcon>
                        <Logout fontSize="medium" color='action' />
                    </ListItemIcon>
                    
                    <ListItemText><span style={{color: 'black'}}>Salir</span></ListItemText>
                </MenuItem>
            </Menu>

            <Grid>
                <AlertSnapent
                    estado={validador}
                    cerrar={() =>{{setValidador(!validador)}}}
                    color="success"
                    closeIcon={false}
                    mensaje="Hasta pronto ¡Gracias por visitarnos!"
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador2}
                    cerrar={() =>{{setValidador2(!validador2)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="Error al cerrar sesión. Intente nuevamente."
                />
            </Grid>
        </React.Fragment>
    );
}