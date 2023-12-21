// REACT
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Text from '../Text/Text'
import fondoPopup from'./../../assets/imgs/fondo-popup.png';

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor:'white!important',
        borderRadius:2,
        backgroundImage: 'url(' + fondoPopup + ')',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        boxShadow: 24,
        p: 5,
        borderRadius:3,
        width: '90%',
        '@media (min-width: 780px)': {
            width: '40%'
        }
    },
    eliminar:{
        color: '#005EAA',
    },
    cancelar:{
        color: '#005EAA',
        fontWeight: 'bold',
    }
};

function VentanaModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button ariant="contained" className={props.clase} disableElevation onClick={handleOpen}>{props.nameButton}</Button>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Box mb={3}>
                        <Text
                            text={props.titleModal}
                            fontSize="1.5em"
                            color="#005EAA"
                            fontFamily="Lato"
                            fontWeight="900"
                            textAlign="Left"
                            margin="15px 15px"
                        />
                    </Box>

                    <Text
                        text={props.textcuerpo}
                        fontSize="1.5em"
                        color="#005EAA"
                        fontFamily="Lato"
                        fontWeight="400"
                        textAlign="Left"
                        margin="15px 15px"
                    />

                    {props.contenido}

                    <Box display={'flex'} justifyContent={'space-between'} mt={4}>
                        <Button style={styles.cancelar} onClick={handleClose}>{props.button2}</Button>

                        <Button style={styles.eliminar} onClick={props.onClick}>{props.button1}</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default VentanaModal