// REACT
import React from "react";
import { Grid } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const style = {
    textColor:{
        color:'#EA5C03',
        fontFamily:'Lato',
        fontWeight:'bold',
        margin:0
    },
    dni:{
        color:'#B3B3B3',
        fontFamily:'Lato',
        fontWeight:'regular',
        margin:0
    }
};

function UsuarioSidebar(props) {

    
    return(
        <Grid display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Avatar sizes="large" sx={{ bgcolor: '#fff', height:50, width:50, color:'#EA5C03', border:'solid 3px #EA5C03'}}>
                <AccountCircleIcon fontSize={'large'}/>
            </Avatar>
           <Grid display={'flex'} flexDirection={'column'} ml={1}>
                <p style={style.textColor}>{props.usuario}</p>
                <p style={style.dni}>{props.dni}</p>
           </Grid>
        </Grid>
    )
}

export default UsuarioSidebar