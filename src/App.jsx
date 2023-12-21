// REACT
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Auth from './Auth';
import { Grid } from '@mui/material';

// COMPONENTS
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// PAGES
import InicioBuscador from './pages/InicioBuscador';
import Inicio from './pages/InicioPage';
import Pagina404 from './pages/Pagina404';
import DetalleProfesional from './pages/DetalleProfesionalPage';
import Login from './pages/LoginTodo';
import PerfilUsuarioEditar from './pages/PerfilUsuarioPage';
import RegistroTodo from './pages/RegistroTodo';
import PanelProfesional from './pages/PanelProfesional';
import ProximosTurnosUsuario from './pages/ProximosTurnosUsuario';
import Preguntas from './pages/Preguntas';
import Soporte from './pages/Soporte';
import Nosotros from './pages/Nosotros';
import PerfilUsuarioDatos from './pages/PerfilUsuarioDatos';
import DetalleHistoriaPaciente from './pages/DetalleHistoriaPaciente';
import Landing from './pages/Landing';
import HistoriaClinicaPaciente from './pages/HistoriaClinicaPaciente';

function App() {
    // GENERAL
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [autenticado, setAutenticado] = useState(false);

    // ONLOGIN
    function onLogin(usuario, token) {
        localStorage.setItem('token', token);

        setUsuario(usuario);
        setAutenticado(true);
    }

    return (
        <>
            <Grid style={{backgroundColor:'#F2F2F2'}}>
                <Header/>

                <Routes>
                    {/* INICIO BUSCADOR */}
                    <Route path="/" element={<InicioBuscador/>}/>

                    {/* LANDING */}
                      <Route path="/landing" element={<Landing/>}/>

                    {/* PREGUNTAS */}
                    <Route path="/preguntas" element={<Preguntas/>}/>

                    {/* SOPORTE */}
                    <Route path="/soporte" element={<Soporte/>}/>

                    {/* NOSOTROS */}
                    <Route path="/nosotros" element={<Nosotros/>}/>

                    {/* INICIO DE SESIÓN */}
                    <Route path="/login" element={<Login onLogin={onLogin}/>} />

                    {/* REGISTRO */}
                    <Route path="/registro" element={<RegistroTodo/>}/>

                    {/* LISTADO DE PROFESIONALES */}
                    <Route path="/profesionales" element={<Inicio/>}/>

                    {/* DETALLE DEL PROFESIONAL */}
                    <Route path="/profesionales/:id" element={<DetalleProfesional/>}/>

                    {/* ----------SESIÓN INICIADA-------- */}

                    {/* PERFIL PACIENTE */}
                    <Route path="/perfil/:id" element={<Auth><PerfilUsuarioDatos/></Auth>}/>

                    <Route path="/perfil/editar/:id" element={<Auth><PerfilUsuarioEditar/></Auth>}/>

                    <Route path="/turnos/:id" element={<Auth><ProximosTurnosUsuario/></Auth>}/>

                    <Route path="/historiaClinica/:id" element={<Auth><HistoriaClinicaPaciente/></Auth>}/>

                    {/* PANEL PROFESIONAL */}
                    <Route path="/panel/:id" element={<Auth><PanelProfesional/></Auth>}/>

                    <Route path="/panel/historiaClinica/:id" element={<Auth><DetalleHistoriaPaciente/></Auth>}/>

                    {/* ----------PÁGINA NO ENCONTRADA-------- */}
                    <Route path="*" element={<Pagina404/>}/>
                </Routes>
                    
                <Footer/>
            </Grid>
        </>
    )
}

export default App;