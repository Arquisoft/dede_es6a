import "./FormLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {loginApp} from '../../api/api';
import {Form, Button } from 'react-bootstrap/';
import toast from "react-hot-toast";
import { LoginButton, SessionProvider } from "@inrupt/solid-ui-react";
import { useState, useEffect } from "react";
import { handleIncomingRedirect, login, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import {getAddressesFromPod} from '../pedido/SolidUtils';

export default function LoginForm() {

    const loginButton = async () => {
        
        const username  = (document.querySelector("input[name='name']") as HTMLInputElement).value;
        const password = (document.querySelector("input[name='password']") as HTMLInputElement).value;
        let res:boolean = await loginApp(username, password);
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
        if(select.value === '2'){
            link.href = "https://solidcommunity.net";
            setIdp("https://solidcommunity.net");
            link.text = "SolidCommunity";
        }else{
            link.href = "https://inrupt.net";
            setIdp("https://inrupt.net");
            link.text = "Inrupt";
        }
    }

    const getDataFromPod = async function(){
        await handleIncomingRedirect();
        if (!getDefaultSession().info.isLoggedIn) {
            await login({
              oidcIssuer: "https://inrupt.net/",
              redirectUrl: window.location.href,
              clientName: "dede-es6a"
            });
        }
        let element = document.getElementById('url') as HTMLInputElement;
        try{
            let dir:string = await getAddressesFromPod(element.value);
            console.log(dir)
            localStorage.setItem('direcciones',dir);
        }catch(error){
            toast.error('url no valida', {duration: 3500});
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
                            <Button id="inicio-sesion" className="btnSubmit">Iniciar sesión</Button>
                            <a href="/catalogo" id="catalogo" hidden>Content</a>
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
                        <Form.Group className="mb-3" id='checkbox' controlId="formBasicCheckbox">
                            <Form.Control className="inputPago" id='url' type="url" placeholder="pod url" name="podurl"/>
                            <Button id="formButton" type="button" onClick={getDataFromPod}>Cargar</Button>
                        </Form.Group>
                    </form>
                </div>
            </div> 
        </div>
  );
}