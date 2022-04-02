import "./FormLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {login} from '../../api/api';


export default function LoginForm() {

    const loginButton = async () => {
        
        const username  = (document.querySelector("input[name='name']") as HTMLInputElement).value;
        const password = (document.querySelector("input[name='password']") as HTMLInputElement).value;
        let res = await login(username, password);
        alert(res);
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
                            <a href="catalogo" className="btnSubmit">Iniciar sesión</a>
                        </div>
                        <div className="form-group">
                            <a href="register" className="ForgetPwd">¡Regístrate ahora!</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}
