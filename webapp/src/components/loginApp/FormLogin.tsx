import "./FormLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {login} from '../../api/api';
import {Form } from 'react-bootstrap/';
import { useState, useEffect } from 'react';

export default function LoginForm() {

    const loginButton = async () => {
        
        const username  = (document.querySelector("input[name='name']") as HTMLInputElement).value;
        const password = (document.querySelector("input[name='password']") as HTMLInputElement).value;
        const url = (document.querySelector("input[name='pod']") as HTMLInputElement).value;
        let res:boolean = await login(username, password, url);
        if(res){
            (document.getElementById("catalogo") as HTMLAnchorElement).click();
        }
    }

    const changeProvider = () => {
        let link: HTMLAnchorElement = document.getElementById('link') as HTMLAnchorElement;
        let select: HTMLInputElement = document.getElementById('provider') as HTMLInputElement;
        if(select.value == '2'){
            link.href = "https://solidcommunity.net";
            link.text = "SolidCommunity";
        }else{
            link.href = "https://inrupt.net";
            link.text = "Inrupt";
        }
    }

  return (
      <div className="login-container">
            <div className="row">
                <div className="login-form-1">
                    <h3>Inicio de sesión</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control"
                                placeholder="Nombre de usuario *" name="name"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control"
                                placeholder="Contraseña *" name="password"/>
                        </div>
                        <div className="form-group" onClick={loginButton}>
                            <a className="btnSubmit">Iniciar sesión</a>
                            <a href="catalogo" id="catalogo" hidden></a>
                        </div>
                        <div className="form-group">
                            <a href="register" className="ForgetPwd">¡Regístrate ahora!</a>
                        </div>
                        <br/>
                        <Form.Select id="provider" onChange={changeProvider} aria-label="Default select example">
                            <option>Proveedor de solid</option>
                            <option value="1">Inrupt</option>
                            <option value="2">SolidCommunity</option>
                        </Form.Select>
                        <div className="form-group">
                            <input type="url" className="form-control"
                                placeholder="url del pod (opcional)" name="pod"/>
                            <p>Si no tienes uno lo puedes crear aqui: <a id="link" href="https://inrupt.net">Inrupt</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}
