import React, { Component } from "react";

class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                
                <div className="divFooter">
                    <section className="mb-4">
                   

                    <a className="btn btn-outline-dark btn-floating m-1" href="https://github.com/Arquisoft/dede_es6a" role="button"
                        ><svg xmlns="./github.svg " width="40" height="40" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg></a>
                    </section>

                    

                    <section className="mb-4">
                    <pre className="preFooter">
                        Proyecto del grupo dede_es6a de la asignatura Arquitectura del Software.<br/>
                        Tienda de bebidas alcohólicas NoVendoAgua.<br/>
                        2021-2022
                    </pre>
                    </section>

                    <section className="">
                    <div className="contenedorNombreAutores">
                    <div className="nombreAutores">
                        <h5 className="text-uppercase">Daniel Machado Sánchez</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                            <a href="https://github.com/UO276257" >GitHub</a>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="nombreAutores">
                        <h5 className="text-uppercase">David Maldonado Álvarez</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                            <a href="https://github.com/UO259893" >GitHub</a>
                            </li>
                            
                        </ul>
                        </div>
                    <div className="nombreAutores">
                        <h5 className="text-uppercase">Diego García Quirós</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                            <a href="https://github.com/Diegosmgq44" >GitHub</a>
                            </li>
                        </ul>
                        </div>
                        <div className="nombreAutores">
                        <h5 className="text-uppercase">Juan Mera Menéndez</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                            <a href="https://github.com/juanmera01" >GitHub</a>
                            </li>
                           
                        </ul>
                        </div>
                        <div className="nombreAutores">
                        <h5 className="text-uppercase">Óscar López González</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                            <a href="https://github.com/oscarlopezgonzalez" >GitHub</a>
                            </li>
                            
                        </ul>
                        </div>

                        

                        

                       
                    </div>
                    </section>
                </div>

                <div className="text-center p-3" >
                    © 2021 Copyright:
                    <a className="enlaceGitHub" href="https://github.com/Arquisoft/dede_es6a">dede_es6a</a>
                </div>
            </footer>
            );
    }

}

export default Footer;