// REACT
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import Link from '@mui/material/Link';

// STYLES
import './styles.css';

// ICONS
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export default function Sidebar() {
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, display:'grid' }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        className='sidebar'
        
        >
            <List>
                <ListItem button component="a" href="/">
                    <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon color='white'/>
                            </ListItemIcon>

                            <ListItemText primary='Inicio' />
                    </ListItemButton>
                </ListItem>

                {localStorage.getItem('usuario_id') && (
                    <>
                        <ListItem button component="a" href={"/perfil/" + localStorage.getItem('usuario_id')}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleIcon color='white'/>
                                </ListItemIcon>

                                <ListItemText primary='Perfil' />
                            </ListItemButton>
                        </ListItem>

                        <ListItem button component="a" href={"/turnos/" + localStorage.getItem('usuario_id')}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ListAltIcon color='white'/>
                                </ListItemIcon>

                                <ListItemText primary='Mis turnos' />
                            </ListItemButton>
                        </ListItem>

                        <ListItem button component="a" href={"/historiaClinica/" + localStorage.getItem('usuario_id')}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MonitorHeartIcon color='white'/>
                                </ListItemIcon>

                                <ListItemText primary='Historia Clínica' />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}

                {localStorage.getItem('profesional_id') && (
                    <>
                        <ListItem button component="a" href={"/panel/" + localStorage.getItem('profesional_id')}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon color='white'/>
                                </ListItemIcon>

                                <ListItemText primary='Panel' />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>

            <Divider />

            <List>
                <ListItem button component="a" href="/nosotros">
                    <ListItemButton>
                        <ListItemIcon>
                            <Diversity3Icon color='white'/>
                        </ListItemIcon>

                        <ListItemText primary='Nosotros' />
                    </ListItemButton>
                </ListItem>

                <ListItem button component="a" href="/soporte">
                    <ListItemButton>
                        <ListItemIcon>
                            <SupportAgentIcon color='white'/>
                        </ListItemIcon>

                        <ListItemText primary='Soporte' />
                    </ListItemButton>
                </ListItem>

                <ListItem button component="a" href="/preguntas">
                    <ListItemButton>
                        <ListItemIcon>
                            <HelpIcon color='white'/>
                        </ListItemIcon>

                        <ListItemText primary='Preguntas' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div> 
            {['left'].map((anchor) => (
            <React.Fragment className='sidebar' key={anchor}>
                <IconButton
                    size="large"
                    edge="start"
                    color="white"
                    aria-label="menu"
                    styles={{ m: 0 }}
                    onClick={toggleDrawer(anchor, true)}
                >
                    <MenuIcon color='white'/>
                </IconButton>

                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
            ))}
        </div>
    );
}