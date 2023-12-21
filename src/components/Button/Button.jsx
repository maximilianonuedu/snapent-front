// REACT
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function ButtonStyle(props) {
    return (
        <Stack direction="row" spacing={props.spacing}>
            <Button disableElevation style={props.styles} mt={props.mt} fullWidth type={props.type} size={props.size} variant={props.variant} className={props.clase}>
                {props.text}
            </Button>
        </Stack>
    );
}

export default ButtonStyle;