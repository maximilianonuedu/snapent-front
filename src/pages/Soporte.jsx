// REACT
import { Container, Grid ,Box} from "@mui/material";
import TitulosHeaders from "../components/TitulosHeaders/TitulosHeaders";
import Text from "../components/Text/Text";

// ICONS
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function Soporte() {
    
    return(
        <>
            <TitulosHeaders
                titulo="Centro de Soporte"
                icon={<SupportAgentIcon fontSize='large' color='white'
                />}
            />
        
            <Container>
                <Grid mb={5} mt={5}>
                   <Box p={4} sx={{backgroundColor:'#fff', boxShadow: 2,borderRadius:2, marginBottom:2}} lineHeight={{lg: "2em" }}>
                      
                        <Box mb={2}>
                            <Text
                                fontSize="1.5em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="600"
                                text="Bienvenido al Centro de Soporte de Snapent"
                            />
                        </Box>

                        <Text
                            fontSize="1em"
                            fontFamily="Lato"
                            margin="0px"
                            fontWeight="400"
                            text="En Snapent, nos comprometemos a brindarte la mejor experiencia posible mientras utilizas nuestra aplicación para gestionar tu atención médica. Nuestro equipo de soporte está aquí para ayudarte en cada paso del camino."
                        />

                       
                   </Box>

                   <Box p={4} sx={{backgroundColor:'#fff', boxShadow: 2,borderRadius:2, marginBottom:2}} lineHeight={{lg: "2em" }}>
                        
                        <Box  mb={2}>
                            <Text
                                fontSize="1.5em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="600"
                                text="¿Cómo podemos ayudarte?"
                            />
                        </Box>
                        
                        <Box lineHeight={{lg: "2em" }}>
                            <ul>
                                <li>
                                    <Box mb={1}>
                                        <Text
                                            fontSize="1em"
                                            fontFamily="Lato"
                                            margin="0px"
                                            fontWeight="400"
                                            text="Problemas técnicos: Si encuentras algún problema técnico mientras utilizar la aplicación, nuestro equipo de soporte técnico está disponible para ayudarte a resolverlo lo antes posible. ¡Estamo aquí para asegurarnos de que tu experiencia sea fluida y sin interrupciones!"
                                        />
                                    </Box>
                                </li>

                                <li>
                                    <Box mb={1}>
                                        <Text
                                            fontSize="1em"
                                            fontFamily="Lato"
                                            margin="0px"
                                            fontWeight="400"
                                            text="Preguntas frecuentes: Explora nuestra sección de preguntas frecuentes (FAQ) para obtener respuestas rápidas a las onsutas comunes sobre Snapent. Aquí podrás encontrar información sobre reserva de citas, acceso a historiales clínicos y más."
                                        />
                                    </Box>
                                </li>

                                <li>
                                    <Text
                                        fontSize="1em"
                                        fontFamily="Lato"
                                        margin="0px"
                                        fontWeight="400"
                                        text="Contacto directo: ¿Tienes alguna pregunta específica o necesitas ayuda adicional? No dudes en contactarnos. Puedes enviarnos un correo electrónico a info@snapent.com.ar para recibir asistencia personalizada."
                                    />
                                </li>
                            </ul>
                        </Box>
                   </Box>

                  <Box p={4} sx={{backgroundColor:'#fff', boxShadow: 2,borderRadius:2, marginBottom:2}}>

                    <Box mb={4} lineHeight={{lg: "2em" }}>
                        <Text
                            fontSize="1.5em"
                            fontFamily="Lato"
                            margin="0px"
                            fontWeight="600"
                            text="Nuestro Compromiso"
                            lineHeight="2em"
                        />
                    </Box>

                    <Text
                        fontSize="1em"
                        fontFamily="Lato"
                        margin="0px"
                        fontWeight="400"
                        lineHeight='2em'
                        text="En Snapent, tu satisfacción es nuestra prioridad. Estamos constantemente trabajando para mejorar nuestra aplicación y brindarte la mejor experiencia posible en la gestión de tu salud. Tu feedback es invaluable para nosotros, asi que no dudes en compartir tus comentarios para que podamos seguir mejorando."
                    />

                   <Box mt={2}>
                        <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="Gracias por confiar en Snapent para tu atención médica. Estamos aquí para brindarte el soporte que necesitas, cuando los necesitas."
                            />
                   </Box>

                  </Box>
                     
                </Grid>
            </Container>
        </>
    )
}

export default Soporte;