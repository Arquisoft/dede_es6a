import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import { addUser } from "./../../api/api";
import { User } from './../../shared/shareddtypes';

const enviar = () => {
  const username:HTMLInputElement  = document.querySelector("input[name='username']") as HTMLInputElement;
  const email: HTMLInputElement = document.querySelector("input[name='email']") as HTMLInputElement;
  const password: HTMLInputElement = document.querySelector("input[name='password']") as HTMLInputElement;

  let n:string ='',e:string='',p:string='';  
  if(username)
      n = username.value as string;
  if(email)
      e = email.value as string;
  if(password)
      p = password.value as string;
  const user:User = {'username':n,'email':e, 'password':p};
  addUser(user);
}

export default function RegisterForm () { 

    return (

      <div className="login-container">
            <div className="row">
                <div className="login-form-1">
                    <h3>Crear nueva cuenta</h3>
                    <form>
                    <div className="form-group">
                            <input type="text" className="form-control" name='username'
                                placeholder="Nombre de usuario *"/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" name='email'
                             placeholder="Correo (opcional) *"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control"  name='password'
                                placeholder="Contraseña *"/>
                        </div>
                        <div className="form-group">
                          <Button href="login" className="btnSubmit"  variant="primary" type="button" onClick={enviar}>Crear usuario</Button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    );
}