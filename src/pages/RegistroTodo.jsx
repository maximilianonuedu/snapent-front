// REACT
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RegistroProfesional from '../pages/RegistroProfesional';
import RegistroPaciente from './RegistroPacientes';
import Text from '../components/Text/Text';
import { Grid } from '@mui/material';

// CSS
import './Login.css';

function RegistroPage(props) {

    const [value, setValue] = useState('Paciente');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
    
    return(
        <Grid lg={12} md={12} xd={12} container display={'flex'} className='login' justifyContent={'center'} alignItems={'center'}>
            
            <Grid lg={6} display={'flex'} justifyContent={'space-between'} flexDirection={'row'}> </Grid>

            <Grid mt={13} mb={4} spacing={2}  lg={6} md={12}  xs={12} item display={'flex'} justifyContent={'center'}>
                <Box className="BoxLogin" >
                    <Text
                        text="Registrarse"
                        fontSize="2em"
                        color="black"
                        fontFamily="Lato"
                        fontWeight="900"
                        textAlign="Left"
                        margin="15px 15px"
                    />

                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Soy paciente" value="Paciente" />
                                    <Tab label="Soy Profesional" value="Profesional" />
                                </TabList>
                            </Box>

                            <TabPanel style={{padding:'20px 0px 0px 0px '}} value="Paciente">
                                <RegistroPaciente/>
                            </TabPanel>

                            <TabPanel style={{padding:'20px 0px 0px 0px '}} value="Profesional">
                                <RegistroProfesional/>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            </Grid>     
        </Grid>
    )
}

export default RegistroPage