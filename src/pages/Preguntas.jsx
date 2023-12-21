// REACT
import { Container, Grid ,Box} from "@mui/material";
import TitulosHeaders from "../components/TitulosHeaders/TitulosHeaders";
import Text from "../components/Text/Text";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// ICONS 
import HelpIcon from '@mui/icons-material/Help';

function Preguntas() {
    
    return(
        <>
            <TitulosHeaders
                titulo="Preguntas Frecuentes"
                icon={<HelpIcon fontSize='large' color='white'
                />}
            />

            <Container>
                <Grid mt={5} mb={5}>
                   
                   <Box sx={{mb:3}}>
                        <Text
                            fontSize="1.4em"
                            fontFamily="Lato"
                            margin="0px"
                            fontWeight="bold"
                            text="Preguntas frecuentes sobre Snapent"
                        />
                   </Box>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        
                        >
                        <Text
                            fontSize="1.3em"
                            fontFamily="Lato"
                            margin="0px"
                            fontWeight="400"
                            text="¿Cómo puedo reservar una cita médica en Snapent?"
                        />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="Para reservar una cita, simplemente descarga la aplicación, crea una cuenta, elige al profesional médico que necesitas a través de nuestro buscador y selecciona la fecha y hora disponibles que mejor se adapten a tu horario. Una vez reservado el turno podrás ver los detalles del mismo en el apartado 'Mis turnos'."
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Text
                                fontSize="1.3em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="¿Puedo acceder a mi historial clínico a través de la aplicación?"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="Sí, Snapent ofrece acceso instantáneo a tu hsitorial clínico digital. Una vez que te regsitres y te conectes con tu proveedor de atención médica, podrás ver y gestionar tu historial clínico desde la aplicación."
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Text
                                fontSize="1.3em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="¿Cómo garantiza Snapent la confidencialidad de mis datos médicos?"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                        <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="En Snapent, la confidencialidad es primordial. Utilizamos medidas de seguridad avanzadas para proteger tur datos médicos. Todas las transmisiones de datos están cifradas y seguimos estrictos protocolos de seguridad para guardar tu infomración."
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Text
                                fontSize="1.3em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="¿Puedo cancelar una cita médica a través de la aplicación?"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="Sí, puedes cancelar tu cita médica desde la sección 'Mis turnos' en la aplicación. Solo necesitas seleccionar la cita que deseas cancelar, la cancelación se hace de forma instantánea."
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Text
                                fontSize="1.3em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="¿Ofrece Snapent servicios de atención médica de emergencia?"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                        <Text
                            fontSize="1em"
                            fontFamily="Lato"
                            margin="0px"
                            fontWeight="400"
                            text="Snapent está diseñado para reservar citas médicas no urgentes. En caso de emergencia médica, por favor, llama a servicio de emergencias de tu área o dirígete al hospital más cercano."
                        />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                           <Text
                                fontSize="1.3em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="¿Es gratuita la descarga de Snapent?"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                        <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="Sí, la descarga de Snapent es completamente gratuita. Además no hay costos extras asociados al uso básico de la aplicación. Sin embargo, algunos servicios específicos dentro la aplicación pueden tener un costo, dependiendo de las políticas de los profesionales médicos. Cualquier cargo adicional or servicios específicos será claramente indicado antes de su confirmación."
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                           <Text
                                fontSize="1.3em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="¿Puedo ver los perfiles médicos antes de reservar una cita?"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                        <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="Sí, en Snapent puedes acceder a los perfiles de los profesionales médicos disponibles. Esto incluye información sobre su especialidad y ubicación de su consultorio para ayudarte a tomar una decisión informada antes de reservar una cita."
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                           <Text
                                fontSize="1.3em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="¿Snapent está disponible para todas las especialidades médicas?"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                        <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="Nos esforzamos por ofrecer una amplia gama de especialidades en nuestra plataforma. Sin embargo, la disponibilidad puede variar según la ubicación y los profesionales quese hayan unido a nuestra red. Te animamos a explorar nuestra aplicación para ver la lista completa de especialidades médicas disponibles en tu área."
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{marginBottom:10, borderRadius:10, padding:10, border:0}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                           <Text
                                fontSize="1.3em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="¿Qué hago si experimento problemas técnicos con la aplicación?"
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                        <Text
                                fontSize="1em"
                                fontFamily="Lato"
                                margin="0px"
                                fontWeight="400"
                                text="Sin encuentras algún problema técnico mientras usas Snapent, por favor, ponte en contacto con nuestro equipo de soporte técnico. Puedes encontrar la opción de soporte dentro de la aplicación o enviar un correo electrónico a nuestro equipo de soporte para recibir ayuda inmediata."
                            />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Container>
        </>
    )
}

export default Preguntas;