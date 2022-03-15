import "./FormLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { addUser } from "./../../api/api";
import { User } from './../../shared/shareddtypes';

export default function LoginForm() {

    const enviar = () => {
        const name:HTMLInputElement  = document.querySelector("input[name='name']") as HTMLInputElement;
        const email: HTMLInputElement = document.querySelector("input[name='email']") as HTMLInputElement;
        const password: HTMLInputElement = document.querySelector("input[name='password']") as HTMLInputElement;
        let n:string ='',e:string='',p:string='';  
        if(name)
            n = name.value as string;
        if(email)
            e = email.value as string;
        if(password)
            p = password.value as string;
        const user:User = {'username':n,'email':e, 'password':p};
        addUser(user);
    }

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
                            <input type="password" className="form-control"
                                placeholder="Contraseña *"/>
                        </div>
                        <div className="form-group">
                        <a href="catalogo" className="btnSubmit">Iniciar sesion</a>
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
