import "./FormLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {login} from '../../api/api';
import {Form } from 'react-bootstrap/';
import toast from "react-hot-toast";
import { LoginButton, SessionProvider } from "@inrupt/solid-ui-react";
import { useState, useEffect } from "react";

export default function LoginForm() {

    const loginButton = async () => {
        
        const username  = (document.querySelector("input[name='name']") as HTMLInputElement).value;
        const password = (document.querySelector("input[name='password']") as HTMLInputElement).value;
        let res:boolean = await login(username, password);
        if(res){
             toast.success("Usuario logeado correctamente", {duration: 700}); 
             setTimeout(() => {
                (document.getElementById("catalogo") as HTMLAnchorElement).click();
            }, 1000);
            
        }
        else{
            toast.error('No se ha podido iniciar sesión', {duration: 3500});
        }
    }

    const [idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");
  
    useEffect(() => {
      setCurrentUrl(window.location.href);
    }, [setCurrentUrl]);

    const changeProvider = () => {
        let link: HTMLAnchorElement = document.getElementById('link') as HTMLAnchorElement;
        let select: HTMLInputElement = document.getElementById('provider') as HTMLInputElement;
        if(select.value == '2'){
            link.href = "https://solidcommunity.net";
            setIdp("https://solidcommunity.net");
            link.text = "SolidCommunity";
        }else{
            link.href = "https://inrupt.net";
            setIdp("https://inrupt.net");
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
                            <a href="/catalogo" id="catalogo" hidden></a>
                        </div>
                        <div className="form-group">
                            <a href="/register" className="ForgetPwd">¡Regístrate ahora!</a>
                        </div>
                        <br/>
                        <Form.Select id="provider" onChange={changeProvider} aria-label="Default select example">
                            <option>Proveedor de solid</option>
                            <option value="1">Inrupt</option>
                            <option value="2">SolidCommunity</option>
                        </Form.Select>
                        <div className="form-group">
                            <input type='url' placeholder="Identity Provider" value={idp} onChange={(e) => setIdp(e.target.value)}></input>
                                <div id="botonsolid">
                                    <SessionProvider>
                                        <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                                            Login con solid
                                        </LoginButton>
                                    </SessionProvider>
                                </div>
                            <p>Si no tienes uno lo puedes crear aqui: <a id="link" href="https://inrupt.net">Inrupt</a></p>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
  );
}