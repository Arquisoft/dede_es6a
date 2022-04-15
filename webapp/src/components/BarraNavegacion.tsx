import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import logo from "../images/vino.png";
import "./BarraNavegacion.css";
import {isLogged, logout, isAdmin} from '../api/api';
import {isLoggedType} from '../shared/shareddtypes';
import { useState, useEffect } from 'react';

function BarraNavegacion (): JSX.Element {

    const [log,setIsLogged] = useState<isLoggedType>();
    const [admin,setIsAdmin] = useState<isLoggedType>();
    const refreshIsLogged = async () => {
        setIsLogged(await isLogged());
    }
    const refreshIsAdmin = async () => {
        setIsAdmin(await isAdmin());
    }
    useEffect(()=>{ refreshIsLogged(); refreshIsAdmin(); }, []);

    const check = () => {
        if(log != undefined)
            if(log.logged)
                return(<NavLink href="/#/catalogo" onClick={() => {
                    logout();
                    window.location.assign('/#/catalogo');
                    window.location.reload();
            }}>
                    Cerrar Sesión</NavLink>);
            else
                return(<NavLink href="/#/login">Inicia sesión</NavLink>);          
    }
    const adminOptions = () => {
        if(admin != undefined)
            if(admin.logged){
                return(
                    <UncontrolledDropdown inNavbar nav>
                            <DropdownToggle caret nav>
                                Administración
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem href="/#/products/add">
                                    Añadir productos
                                </DropdownItem>
                                <DropdownItem href="/#/users/list">
                                    Lista de usuarios
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                );
            }
    }

    return (
        <div>
            <Navbar color="dark" dark expand="md" light>

                {/* Nombre de la empresa y logo */}
                <NavbarBrand onClick={() => {
                                window.location.assign('/#/catalogo');
                                window.location.reload();
                                }}>
                    No Vendo Agua
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="imagenMarca"
                    />
                </NavbarBrand>

                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
    
                    {/* Parte izquierda de la barra de navegación */}
                    <Nav className="me-auto" navbar>

                        {/* Opción de caja sorpresa*/}
                        <NavItem>
                            <NavLink onClick={() => {
                                        window.location.assign('/#/catalogo');
                                        window.location.reload();
                                }}>
                                Caja sorpresa
                            </NavLink>
                        </NavItem>

                        {/* Menú desplegable correspondiente a la cerveza*/}
                        <UncontrolledDropdown inNavbar nav>
                            <DropdownToggle caret nav>
                                Cervezas
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=rubia');
                                        window.location.reload();
                                }}>
                                    Rubia
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=roja');
                                        window.location.reload();
                                }}>
                                    Roja
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=tostada');
                                        window.location.reload();
                                }}>
                                    Tostada
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=negra');
                                        window.location.reload();
                                }}>
                                    Negra
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        {/* Menú desplegable correspondiente al vino*/}
                        <UncontrolledDropdown inNavbar nav>
                            <DropdownToggle caret nav>
                                Vinos
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=tinto');
                                        window.location.reload();
                                }}>
                                    Tinto
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=blanco');
                                        window.location.reload();
                                }}>
                                    Blanco
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=rosado');
                                        window.location.reload();
                                }}>
                                    Rosado
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>


                        {/* Menú desplegable correspondiente a las bebidas destiladas*/}
                        <UncontrolledDropdown inNavbar nav>
                            <DropdownToggle caret nav>
                                Bebidas destiladas
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=ginebra');
                                        window.location.reload();
                                }}>
                                    Ginebra
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=ron');
                                        window.location.reload();
                                }}>
                                    Ron
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=whisky');
                                        window.location.reload();
                                }}>
                                    Whisky
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                        window.location.assign('/#/catalogo?filter=vodka');
                                        window.location.reload();
                                }}>
                                    Vodka
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                    {/* Parte derecha de la barra de navegación */}
                    <Nav className="ms-auto" navbar>
                        {/* Menú desplegable correspondiente a las opciones del administrador*/}
                        {adminOptions()}

                        {/* Opción de about us*/}
                        <NavItem>
                            <NavLink href="/#/aboutus">
                                Sobre nosotros
                            </NavLink>
                        </NavItem>

                        {/* Opción para iniciar sesión */}
                        <NavItem>
                            {check()}
                        </NavItem>
                        <NavItem>
                            <NavLink href="/#/carrito">
                                <svg xmlns="./cart.svg " width="50" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </NavLink>
                        </NavItem>
                        
                    </Nav>
                </Collapse>
    </Navbar>
        </div>
    );
}

export default BarraNavegacion;