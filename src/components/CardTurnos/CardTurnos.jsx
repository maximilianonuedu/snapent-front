// REACT
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CancelIcon from '@mui/icons-material/Cancel';
import Text from '../Text/Text'
import Avatar from '@mui/material/Avatar';

// IMGS
import fondo from '../../../src/assets/imgs/cardheader.png'

// ICONS
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';

// GLOBAL
import { formatoFecha } from '../../../global/formatoFecha';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const styles = {
    card:{
        borderRadius:'50px!important',
        backgroundColor:'red !important',
        width:'360px',
        margin:10
    }
}

export default function CardTurnos(props) {
    
  return (
        <Card style={styles.card} sx={{ minWidth: 'md' }}>
            <div>
            <CardMedia                    
                sx={{ height: 100, padding:3 }}
                image={fondo}
                container display={'flex'} flexDirection={'row'} alignItems={'center'}
            >
                     <Grid mb={2} width={'100%'} display='flex' flexDirection={'row'}>
                        {(props.inicialesProfesional) && (
                            <>
                                <Avatar
                                    style={{backgroundColor: props.colorAvatar}}
                                    alt="avatar perfil"
                                    src={props.avatar}
                                    sx={{ width: 56, height: 56, mr: 2 }}
                                >
                                    {props.inicialesProfesional}
                                </Avatar>
                            
                            </>
                            
                        )}
                         
                       <Grid>
                            <Text
                                fontFamily="Lato-black"
                                fontWeight="regular"
                                fontSize="1.5em"
                                color="white"
                                text={props.profesional}
                            />
                            <Text
                                fontFamily="Lato"
                                fontWeight="light"
                                color="white"
                                text={props.especialidad}
                                fontSize="1em"
                            />

                            {/* CANCELACIONES */}
                            <Text
                                fontFamily="Lato-black"
                                fontWeight="regular"
                                fontSize="1.5em"
                                color="white"
                                text={props.fechaCancelacion}
                            />
                       </Grid>
                        
                    </Grid>
                </CardMedia>
            <CardContent>
              <Grid container columns={6}>
                
                    <Grid width={'100%'} columns={12} container display={'flex'} justifyContent={'space-between'} flexDirection={'row'} alignItems={'center'}>
                        <Grid item display={'flex'} flexDirection={'row'} alignItems={'center'}>  
                            <CalendarMonthIcon color='orange' fontSize='large'/>
                            <Text
                                fontFamily="Lato"
                                fontWeight="light"
                                text={formatoFecha(props.fecha)}
                                fontSize="1em"
                            />
                        </Grid>
                        <Grid item display={'flex'} flexDirection={'row'} alignItems={'center'}>  
                            <QueryBuilderIcon color='orange' fontSize='large'/>
                            <Text
                                fontFamily="Lato"
                                fontWeight="light"
                                text={props.horario + ' hs.'}
                                fontSize="1em"
                            />
                        </Grid>
                    </Grid>
              </Grid>
              <Grid container mt={2} flexDirection={'row'} alignItems={'center'}>
                    <Typography style={{color:'black !important', display:'flex', alignItems:'center'}}>
                        {(props.lugarNombre) && (
                            <>
                                <LocationOnIcon color='orange' fontSize='large'/> {props.lugarNombre}
                            
                            </>
                            
                        )}

                        {/* CANCELACIONES */}
                        {(props.motivo) && (
                            <>
                                <ArticleIcon color='orange' fontSize='large'/> {props.motivo}
                            
                            </>
                            
                        )}
                    </Typography>
                </Grid>
            </CardContent>

            <CardActions>
                <Grid display='flex' flexDirection='row' justifyContent={'space-between'} style={{width:'100%'}}>
                    {(props.lugarDireccion) && (
                            <Button
                                style={{ marginTop: '.5em'}} 
                                disableElevation
                                size="small"
                                color='orange'
                                variant="text"
                                button 
                                component="a" 
                                href={"https://www.google.com/maps/place/" + props.lugarDireccion}
                                target="_blank"
                                startIcon={<VisibilityIcon />}
                            >
                                VER UBICACIÓN
                            </Button>
                    )}

                    {(props.btnText) && (
                        <>
                            <Button
                                style={{ marginTop: '.5em'}} 
                                onClick={props.onClickCancelar}
                                disableElevation
                                size="small"
                                color='orange'
                                variant="text" startIcon={<CancelIcon />}
                            >
                                {props.btnText}
                            </Button>
                        
                        </>
                    )}
                </Grid>
            </CardActions>
            </div>
        </Card>

  );
}
