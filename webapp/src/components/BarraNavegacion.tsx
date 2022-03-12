import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import logo from "../images/vino.png";
import "./BarraNavegacion.css";

class BarraNavegacion extends Component {

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md" light>

                    {/* Nombre de la empresa y logo */}
                    <NavbarBrand href="/products">
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
                                <NavLink href="/products">
                                    Caja sorpresa
                                </NavLink>
                            </NavItem>

                            {/* Menú desplegable correspondiente a la cerveza*/}
                            <UncontrolledDropdown inNavbar nav>
                                <DropdownToggle caret nav>
                                    Cervezas
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Rubia
                                    </DropdownItem>
                                    <DropdownItem>
                                        Roja
                                    </DropdownItem>
                                    <DropdownItem>
                                        Tostada
                                    </DropdownItem>
                                    <DropdownItem>
                                        Negra
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* Menú desplegable correspondiente al vino*/}
                            <UncontrolledDropdown inNavbar nav>
                                <DropdownToggle caret nav>
                                    Vinos
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Tinto
                                    </DropdownItem>
                                    <DropdownItem>
                                        Blanco
                                    </DropdownItem>
                                    <DropdownItem>
                                        Rosado
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {/* Menú desplegable correspondiente a las bebidas destiladas*/}
                            <UncontrolledDropdown inNavbar nav>
                                <DropdownToggle caret nav>
                                    Bebidas destiladas
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Ginebra
                                    </DropdownItem>
                                    <DropdownItem>
                                        Ron
                                    </DropdownItem>
                                    <DropdownItem>
                                        Whisky
                                    </DropdownItem>
                                    <DropdownItem>
                                        Vodka
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>

                        {/* Parte derecha de la barra de navegación */}
                        <Nav className="ms-auto" navbar>

                            {/* Opción para iniciar sesión */}
                            <NavItem>
                                <NavLink href="/products">Inicia sesión</NavLink>
                            </NavItem>
                            
                        </Nav>
                    </Collapse>
        </Navbar>
            </div>
        );
    }

}

export default BarraNavegacion;