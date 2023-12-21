// REACT
import { Container, Grid, Box } from "@mui/material";
import TitulosHeaders from './../components/TitulosHeaders/TitulosHeaders';
import Text from "../components/Text/Text";

// ICONS
import Diversity3Icon from '@mui/icons-material/Diversity3';

function Nosotros() {
    
    return(
        <>
            <TitulosHeaders
                titulo="Sobre Nosotros"
                icon={<Diversity3Icon fontSize='large' color='white'
                />}
            />

            <Container>
                <Grid mt={5} mb={5}>

                    <Box p={4} sx={{backgroundColor:'#fff', boxShadow: 2,borderRadius:2, marginBottom:2}}>
                       <Box mb={2} lineHeight={{lg: "2em" }}>
                            <Text
                                fontSize="1.5em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="600"
                                lineHeight="2em"
                                text="Bienvenido a Snapent: Tu puerta de entrada al cuidado médico moderno."
                            />
                       </Box>

                        <Text
                            fontSize="1em"
                            fontFamily="Lato"
                            margin="0px"
                            fontWeight="400"
                            text="En Snapent, estamos comprometidos con la transformación digital del cuidado de la salud. Nuestra aplicación no solo simplifica la reserva de turnos médicos, sino que también ofrece a los pacientes acceso inmediato a su historial clínico en un formato digital fácil de usar."
                    />
                    </Box>

                    <Box p={4} sx={{backgroundColor:'#fff', boxShadow: 2,borderRadius:2, marginBottom:2}}>

                        <Box mb={2}>
                            <Text
                                fontSize="1.5em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="600"
                                text="¿Qué nos hace especiales?"
                            />
                        </Box>

                        <Box mb={2} lineHeight={{lg: "2em" }}>
                            <ul>
                                <li>
                                    <Box mb={1}>
                                        <Text
                                            fontSize="1em"
                                            fontFamily="Lato"
                                            margin="0px"
                                            fontWeight="400"
                                            text="Reservas simplificadas: Con solo unos pocos clics, los usuarios pueden reservar citas médicas desde la comodidad de su hogar evitando largas esperas y facilitando la gestión de su tiempo."
                                        />
                                    </Box>
                                </li>

                                <li>
                                    <Text
                                        fontSize="1em"
                                        fontFamily="Lato"
                                        margin="0px"
                                        fontWeight="400"
                                        text="Acceso a historiales clínicos: Nuestra plataforma proporciona a los pacientes una visión completa de su historial clínico, permitiéndoles estar informados y capacitados sobre su salud en todo momento."
                                    />
                                </li>
                            </ul>
                        </Box>

                        <Box lineHeight={{lg: "2em" }}>
                            <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="600"
                                text="Salud, Confidencialidad y Rapidez: Nuestros Pilares Fundamentales"
                            />

                            <Box mb={1}>
                                <Text
                                    fontSize="1em"
                                    fontFamily="Lato"
                                    margin="0px"
                                    fontWeight="400"
                                    text="En Snapent, la salud es nuestra máxima prioridad. Nos comprometemos a ofrecer a nuestros usuarios una experiencia centrada en su bienestar en todo momento."
                                />
                            </Box>
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
                                            text="Salud: Desde la reserva de turnos médicos hasta el acceso a los historiales clínicos digitales, cada función de Snapent se diseña en la mejora y el mantenimiento de la salud de nuestros usuarios. Nos esforzamos por simplificar el acceso a la atención médica para que puedan cuidar de sí mismos y sus seres queridos de manera más efectiva."
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
                                            text="Confidencialidad: Entendemos la importancia de la privacidad en cuestiones de salud. Por eso, en Snapent, implementamos rigurosas medidas de seguridad para garantizar la confidencialidad de la información médica de nuestros usuarios. Todos los datos están protegidos y manejados con el más alto nivel de seguridad para brindar tranquilidad y confianza."
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
                                            text="Rapidez: Valoramos su tiempo tanto como usted. Nuestra plataforma está diseñada para ofrecer un proceso de reserva de citas médicas rápido y eficiente. Además, el acceso instantáneo a los historiales médicos digitales permite una toma de decisiones más ágil y una comunicación más efectiva entre médicos y pacientes."
                                        />
                                    </Box>
                                </li>
                            </ul>
                        </Box>

                        <Box lineHeight={{lg: "2em" }}>
                            <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="En Snapent, nos comprometemos a mantener estos tres pilares como la base de cada interacción y servicio que ofrecemos, asegurando así una experiencia de usuario excepcional que promueva un cuidado de la salud más informado, seguro y rápido."
                            />

                            <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="600"
                                text="¡Descarga Sanpent hoy mismo y comienza a tomar el control de tu bienestar! Experimenta la comodidad de gestionar tu salud de manera rápida, segura y confidencial."
                            />
                        </Box>

                    </Box>
                    

                </Grid>    
            </Container>
        </>
    )
}

export default Nosotros;