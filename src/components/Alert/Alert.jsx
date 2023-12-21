// REACT
import * as React from 'react';
import {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function AlertSnapent(props) {

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={props.estado} autoHideDuration={3000} onClose={props.cerrar}> 
                <Alert 
                    severity={props.color} 
                    sx={{ width: '100%' }}
                    action={
                        (props.closeIcon &&
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => { props.cerrar }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                        )
                        }
                    >
                    {props.mensaje}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
