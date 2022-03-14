import React, { useState } from "react";
import "./FormLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Abierto from "./../../assets/ojo_abierto.png"
import Cerrado from "./../../assets/ojo_cerrado.png"
import Botellas from "./../../assets/botellas.png"

export default function LoginForm( Login: any, error: any ) {

    const [shown, setShown] = React.useState(false);
const switchShown = () => setShown(!shown);

const [password, setPassword] = React.useState('');
const onChange = (currentTarget: any) => {setPassword(currentTarget.value)};

  return (
      <div className="login-container">
            <div className="row">
                <div className="login-form-1">
                    <h3>Inicio de sesión</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control"
                             placeholder="Nombre de usuario *"/>
                        </div>
                        <div className="form-group">
                            <div className="formContraseña">
                                <input 
                                    type={shown ? 'text' : 'password'} 
                                    className="form-control"
                                    placeholder="Contraseña*"  onChange={onChange}
                                    value={password}/>
                                <button className="btnOjo" onClick={switchShown}>
                                    {shown ? 
                                    <img src={Abierto} className="ojo"/> :
                                    <img src={Cerrado} className="ojo"/>}
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btnSubmit" 
                            value="Acceder">Acceder</button>
                        </div>
                        <div className="form-group">
                            <a href="register" className="ForgetPwd">¡Registrate ahora!</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}