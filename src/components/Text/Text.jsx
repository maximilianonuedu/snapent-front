// REACT
import * as React from 'react';
import Box from '@mui/material/Box';

function Text(props) {

    const style = {
        color: props.color,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        fontFamily: props.fontFamily,
        margin: props.margin ? props.margin : '0px',
        letterSpacing: props.letterSpacing,
        textAlign: props.textAlign,
        marginBottom: props.marginBottom,
        marginLeft: props.marginLeft,
        lineHeight: props.lineHeight
    };
    
    return(
        <Box boxShadow={props.boxShadow}>
            <p className='margin' style={style}> {props.text} </p>
        </Box>
    );
}

export default Text