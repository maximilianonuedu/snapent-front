// REACT
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Text from '../Text/Text';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ICONS
import CloseIcon from '@mui/icons-material/Close';

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#005EAA',
        boxShadow: 24,
        p: 2,
    },
    eliminar:{
        color: '#FFFFFF',
    },
    cancelar:{
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
};

function ModalMapa(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                   style={{ marginTop: '.5em'}} 
                   onClick={handleOpen}
                   disableElevation
                   size="small"
                   color='orange'
                   variant="text" startIcon={<VisibilityIcon />}>
                    Ver ubicación
            </Button>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Box display="flex" justifyContent="flex-end">
                        <CloseIcon onClick={handleClose} style={{color: 'white', cursor: 'pointer'}} />
                    </Box>

                    <Text
                        text={props.titleModal}
                        fontSize="1.5em"
                        color="white"
                        fontFamily="Lato"
                        fontWeight="900"
                        textAlign="Left"
                        margin="15px 15px"
                    />

                    {props.contenido}

                    <Box display={'flex'} justifyContent={'flex-end'}>       
                        <Button 
                            style={styles.cancelar} 
                            onClick={handleClose}
                        >
                            {props.button2}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalMapa