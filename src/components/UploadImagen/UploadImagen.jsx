// REACT
import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneDialog } from 'material-ui-dropzone';
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { puerto } from '../../../global/puerto';
import axios from 'axios';
import { Grid, Box } from '@mui/material';
import AlertSnapent from '../Alert/Alert';
import Text from '../Text/Text';
// ICONS
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// CSS
import './../../index.css'

function UploadImagen(props) {
    const [open, setOpen] = React.useState(false);
    const {id} = useParams();
    const [validador, setValidador] = useState(false);
    const [validador2, setValidador2] = useState(false);
    
    const [imagenSubidaConExito, setImagenSubidaConExito] = useState(false);

    async function actualizarImagenPerfil(file) {
        let ruta;
        let tipo;

        let location = window.location.href;
        let locationSplit = location.split('/');

        if(locationSplit[4] == 'historiaClinica'){
            ruta = localStorage.getItem('profesional_id');
            tipo = 'historias';

        } else {
            if(localStorage.getItem('usuario_id')) {
                ruta = 'usuario';
                tipo = 'avatares';
    
            } else if (localStorage.getItem('profesional_id')) {
                ruta = 'profesional';
                tipo = 'avatares';
            }
        }
        
        const formData = new FormData()
        formData.append('file', file)

        axios.post(`http://localhost:${puerto}/upload/${tipo}/${ruta}/${id}`, formData)
            .then(() => {
                setValidador(true);
                window.location.reload();
            })
            .catch((err) => {

            })
    }


    return(
        <>
            <div>
                <Tooltip title="Añadir archivo" placement='bottom'>
                    <Button  pl={0} pr={0} variant="outlined" size='large' className={props.clase} disableElevation onClick={() => setOpen(true)}>
    

                       <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                       {props.texto && (
                            <Grid mr={1}>
                                <p>{props.texto}</p>
                            </Grid>
                        )}
                            <CloudUploadIcon color={props.colorIcon ? props.colorIcon : 'white'}/>
                       </Box>
                    </Button>
                </Tooltip>

                <DropzoneDialog
                    acceptedFiles={["image/jpeg", "image/png", "image/jpg"]}
                    cancelButtonText={"CANCELAR"}
                    submitButtonText={"ACTUALIZAR"}
                    maxFileSize={5000000}
                    open={open}
                    onClose={() => setOpen(false)}
                    onSave={(files) => {
                        setOpen(false);
                        actualizarImagenPerfil(files[0]);
                    }}
                    showPreviews={true}
                    showFileNamesInPreview={false}
                    dropzoneText='Arrastra y suelta una imagen o haz click aquí'
                    dialogTitle={props.historiaClinica ? 'Añadir archivo a historia clínica' : 'Actualizar foto de perfil'}
                    filesLimit={1}
                    previewText='Vista previa:'
                    showAlerts={false}
                />
            </div>

            <Grid>
                <AlertSnapent
                    estado={validador}
                    cerrar={() =>{{setValidador(!validador)}}}
                    color="success"
                    closeIcon={false}
                    mensaje="Imagen cargada con éxito."
                />
            </Grid>

            <Grid>
                <AlertSnapent
                    estado={validador2}
                    cerrar={() =>{{setValidador2(!validador2)}}}
                    color="error"
                    closeIcon={false}
                    mensaje="Error al cargar la imagen. Intente nuevamente."
                />
            </Grid>
        </>
    )
}

export default UploadImagen