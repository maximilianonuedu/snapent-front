// REACT
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
    <Paper lg={{ m: 1, width: 100, height: 100, display:'flex', flexDirection:'row' }} elevation={4}>
        <p>FILTRO 1</p>
    </Paper>
);

export default function FiltrosBusqueda() {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
    setChecked((prev) => !prev);
    };

    return (
        <Box  width={'100%'} sx={{ height: 180 }}>
            <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Filtros"
            />

            <Box minWidth={'100%'} width={'100%'} lg={{ display: 'flex', justifyContent:'center', backgroundColor:'red', flexDirection:'row' }}>
                <Grow in={checked}>{icon}</Grow>

                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                >
                    {icon}
                </Grow>
            </Box>
        </Box>
    );
}