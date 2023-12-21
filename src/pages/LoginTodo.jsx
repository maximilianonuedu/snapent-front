// REACT
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoginProfesional from '../pages/LoginProfesional';
import LoginPacientes from '../pages/LoginPacientes';
import Text from '../components/Text/Text';
import { Grid } from '@mui/material';

// CSS
import './Login.css';

function LoginPage({onLogin}) {

    const [value, setValue] = useState('Paciente');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }

    return(
        <Grid lg={12} md={12} xd={12} container display={'flex'} className='login' justifyContent={'center'} alignItems={'center'}>
            <Grid lg={6} display={'flex'} justifyContent={'space-between'} flexDirection={'row'}></Grid>

            <Grid spacing={2}  lg={6} md={12}  xs={12} item display={'flex'} justifyContent={'center'}>
                <Box className="BoxLogin">
                    <Text
                        text="Ingresar"
                        fontSize="2em"
                        color="black"
                        fontFamily="Lato"
                        fontWeight="900"
                        textAlign="Left"
                        margin="15px 15px"
                    />

                    <Box spacing={4} sx={{ width: '100%'}}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    <Tab label="Soy paciente" value="Paciente" />
                                    <Tab label="Soy Profesional" value="Profesional" />
                                </TabList>
                            </Box>

                            <TabPanel style={{padding:'20px 0px 0px 0px '}} value="Paciente">
                                <LoginPacientes onLogin={onLogin}/>
                            </TabPanel>

                            <TabPanel style={{padding:'20px 0px 0px 0px '}} value="Profesional">
                                <LoginProfesional onLogin={onLogin}/>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default LoginPage