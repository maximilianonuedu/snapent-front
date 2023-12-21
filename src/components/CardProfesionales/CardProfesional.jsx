// REACT
import * as React from 'react';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Text from '../Text/Text.jsx';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';

// CSS
import './../../index.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

function CardProfesional(props) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [srcImg, setSrcImg] = React.useState('');

    function handleOpen(source) {
        setSrcImg(source);
        setOpen(true);
    }

    return (
        <Card lg={12} width='100%' sx={{borderRadius:3, m:1}}>
            <Box flexDirection={'row'} p={2} width='100%'>
                <Box alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Avatar
                            style={{backgroundColor: props.colorAvatar}}
                            alt="Remy Sharp"
                            src={props.avatar}
                            sx={{ width: 56, height: 56, mr: 2 }}
                        >
                                {props.inicialesProfesional}
                        </Avatar>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Box display={'flex'} flexDirection={'row'}>
                                <Text
                                    text={props.nombre}
                                    fontSize="1.3em"
                                    color={props.colorText}
                                    fontFamily="Lato"
                                    fontWeight="900"
                                    textAlign="Left"
                                />
                                
                                <Box marginLeft={.5}>
                                    <Text
                                        text={props.apellido}
                                        fontSize="1.3em"
                                        color={props.colorText}
                                        fontFamily="Lato"
                                        fontWeight="600"
                                        textAlign="Left"
                                    />
                                </Box>
                            </Box>
                            <Text
                                text={props.especialidad}
                                fontSize={props.sizeEspecialidad}
                                color={props.colorEspecialidad}
                                fontFamily="Lato"
                                fontWeight="700"
                                textAlign="Left"
                            />
                        </Box>
                    </Box>
                </Box>
            
                <Box m={2} flexDirection={'row'}>
                
                    <Text
                        text={'Subespecialidad:'}
                        fontSize={'1em'}
                        color={'grey'}
                        fontFamily="Lato"
                        fontWeight="400"
                        textAlign="Left"
                    />

                    <Text
                        text={props.subespecialidad}
                        fontSize={props.subsizeEspecialidad}
                        color={props.subcolorEspecialidad}
                        fontFamily="Lato"
                        fontWeight="600"
                        textAlign="Left"
                    />
                </Box>

                {(props.lugarNombre) && (
                    <>
                        <Box mb={1}>
                            <Typography style={{color:'black !important', display:'flex', alignItems:'center', fontWeight: '500'}}>
                                    <LocationOnIcon color='orange' fontSize='large'/> {props.lugarNombre}
                            </Typography>
                        </Box>
                    
                    </>
                            
                )}


                <Divider />
                
                {props.textButton && (
                    <CardActions style={{display:'flex', justifyContent:'center', padding:0}}>
                        <Link style={{p:0, width:'100%'}} to={props.url}>
                            <Button variant="contained" fullWidth disableElevation size="large">{props.textButton}</Button>
                        </Link>
                    </CardActions>
                )}

                {props.imgs && (
                    <ImageList sx={{ width: '100%', height: 'auto', marginTop: '1.5em', display: 'flex', justifyContent: 'start' }} cols={3} rowHeight={164}>
                        {props.imgs.map((img) => (
                            <ImageListItem>
                               <Box m={1}>
                                    <div class='crop'>
                                        <img
                                            src={`./../../../public/historias/${img}`}
                                            alt={img}
                                            loading="lazy"
                                            onClick={() => {handleOpen(`./../../../public/historias/${img}`)}}
                                            class='imgList'
                                        />
                                    </div>
                               </Box>
                            </ImageListItem>
                        ))}
                    </ImageList>
                )}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <img src={srcImg} alt={srcImg} class='imgModal'/>
                    </Box>
                </Modal>
            </Box>
        </Card>
    );
}

export default CardProfesional;