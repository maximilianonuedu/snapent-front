
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

// IMGS
import farmacity from '../../assets/imgs/publicidad/farmacity.jpg';
import osde from '../../assets/imgs/publicidad/osde.png';
import swiss from '../../assets/imgs/publicidad/swiss.png';

function Publicidad() {
    
    return(
        <>
           <Grid item lg={12} display={'flex'} flexDirection={'column'}>
                    <Box sx={{backgroundColor:'#fff', boxShadow: 2,borderRadius:2, marginBottom:2}}>
                        <CardMedia                   
                            sx={{ padding:3 }}
                            image={farmacity}
                            style={{width:'100%', height:'130px'}}
                        >
                        </CardMedia>
                    </Box>
                    <Box sx={{backgroundColor:'#fff', boxShadow: 2,borderRadius:2, marginBottom:2}}>
                        <CardMedia                   
                            sx={{ padding:3 }}
                            image={osde}
                            style={{width:'100%', height:'300px'}}
                        >
                        </CardMedia>
                    </Box>
                    <Box sx={{backgroundColor:'#fff', boxShadow: 2,borderRadius:2}}>
                        <CardMedia                   
                            sx={{ padding:3 }}
                            image={swiss}
                            style={{width:'100%', height:'160px'}}
                        >
                        </CardMedia>
                    </Box>
            </Grid>
        </>
    )
}

export default Publicidad