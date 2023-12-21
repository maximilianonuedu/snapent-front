// REACT
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Text from '../Text/Text';
import AlertSnapent from '../Alert/Alert.jsx';
import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// SERVICES
import * as turnosServices from './../../services/turnos.services.js';

// ICONS
import CloseIcon from '@mui/icons-material/Close';

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#ffff',
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
        fontWeight: '100'
    },
    cancelar:{
        color: '#005EAA',
        fontWeight: '600',
    },
};

function ModalInput(props) {
    // CANCELAR TURNO
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    const [motivo, setMotivo] = useState(null);

    function onChangeMotivo(event) {
        setMotivo(event.target.value);
    }

    // CANCELAR DESDE PERFIL PACIENTE O PROFESIONAL
    function cancelarTurno(turno) {
        if(turno.motivo) {
            turno.motivo = motivo;
            turno.canceladoPor = 'paciente';
            
        } else {
            turno.motivo = 'Cancelado por profesional';
            turno.canceladoPor = 'profesional';
        }

        turnosServices.guardarTurno(turno)
            .then((data) =>{
                turnosServices.cancelarTurno(turno.idTurno)
                    .then(() => {
                        setValidador(true);

                        setTimeout(() => {
                            location.reload(); 
                        }, 1000);
                    })
                    .catch(() => {
                        setValidador2(true);
                    })
            })
            .catch((err) =>{
                setValidador2(true);
            })

    }

    return (
        <div>     
            <Modal
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={styles.modal}>
                    <Box display="flex" justifyContent="flex-end">
                        <CloseIcon onClick={props.close} style={{color: 'white', cursor: 'pointer'}} />
                    </Box>

                   <Box mb={3}>
                        <Text
                            text={props.titleModal}
                            fontSize="1.5em"
                            color="##005EAA"
                            fontFamily="Lato"
                            fontWeight="900"
                            textAlign="Left"
                            margin="15px 15px"
                        />
                   </Box>

                    <Text
                        text={props.textCuerpo}
                        fontSize="1.5em"
                        color="##005EAA"
                        fontFamily="Lato"
                        fontWeight="400"
                        textAlign="Left"
                        margin="15px 15px"
                    />

                    <Box mt={5}>
                        {props.infoTurno && (
                            <Select
                                fullWidth
                                name="motivo"
                                label="Motivo"
                                onChange={onChangeMotivo}
                            >
                                <MenuItem value='Cambio de disponibilidad horaria'>Cambio de disponibilidad horaria</MenuItem>

                                <MenuItem value='Falta de estudios médicos'>Falta de estudios médicos</MenuItem>

                                <MenuItem value='Turno reservado con datos erróneos'>Turno reservado con datos erróneos</MenuItem>

                                <MenuItem value='Este turno no fue solicitado por mí'>Este turno no fue solicitado por mi</MenuItem>

                                <MenuItem value='Emergencia imprevista'>Emergencia imprevista</MenuItem>
                            </Select>
                        )}
                    </Box>

                    <Box display={'flex'} justifyContent={'space-between'} my={2}>
                        <Button style={styles.cancelar} onClick={props.close}>{props.button2}</Button>

                        {props.infoTurno && (
                            <Button onClick={() => {cancelarTurno(props.infoTurno)}} style={styles.eliminar}>{props.button1}</Button>
                        )}

                        {props.infoEvento && (
                            <Button onClick={() => {cancelarTurno(props.infoEvento)}} style={styles.eliminar}>{props.button1}</Button>    
                        )}
                    </Box>
                </Box>
            </Modal>

            <Grid>
                <AlertSnapent
                    estado={validador}
                    cerrar={() =>{{setValidador(!validador)}}}
                    color="success"
                    closeIcon={false}
                    mensaje="Turno cancelado con éxito."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador2}
                    cerrar={() =>{{setValidador2(!validador2)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="Error al cancelar el turno. Intente nuevamente."
                />
            </Grid>
        </div>
    );
}

export default ModalInput