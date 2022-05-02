import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import { addUser } from "./../../api/api";
import { User } from './../../shared/shareddtypes';
import ojoabierto from "./../../assets/ojo_abierto.png"
import ojocerrado from "./../../assets/ojo_cerrado.png"
import toast from "react-hot-toast";
import "./FormRegister.css"

const verContrasena = () => {
  const element = document.querySelector<HTMLInputElement>("input[name='password']")!    //input
  const elementImg = document.querySelector<HTMLInputElement>("img[id='imagenPsw']")!
  if (element.type == 'password'){
    element.type = 'text';
    elementImg.src = ojoabierto
  }
  else{
    element.type = 'password';
    elementImg.src = ojocerrado
  }
}

const verConfirmacion = () => {
  const element = document.querySelector<HTMLInputElement>("input[name='confirmPwd']")!    //input
  const elementImg = document.querySelector<HTMLInputElement>("img[id='imagenCnf']")!
  if (element.type == 'password'){
    element.type = 'text';
    elementImg.src = ojoabierto
  }
  else{
    element.type = 'password';
    elementImg.src = ojocerrado
  }
}

const enviar = () => {
  const username:HTMLInputElement  = document.querySelector("input[name='username']") as HTMLInputElement;
  const email: HTMLInputElement = document.querySelector("input[name='email']") as HTMLInputElement;
  const password: HTMLInputElement = document.querySelector("input[name='password']") as HTMLInputElement;
  const confirmPassword: HTMLInputElement = document.querySelector("input[name='confirmPwd']") as HTMLInputElement;
  
    let n:string ='',e:string='',p:string='', cp:string=''; 
    if(username)
        n = username.value as string; 
    if(password)
        p = password.value as string;
    if(confirmPassword)
        cp = confirmPassword.value as string;
    if(email)
        e = email.value as string;
    if(cp == p && p.length >= 6){
    const user:User = {'username':n,'email':e, 'password':p};
    addUser(user);
    toast.success("Usuario creado correctamente", {duration: 700}); 
    setTimeout(() => 1000);
    window.location.href = '/login'
    }
    else{
      toast.error("No se ha podido crear el usuario", {duration: 1000}); 
    }
  }

export default function FormRegister() {
  const formSchema = Yup.object().shape({   
    password: Yup.string()
      .required('Introduzca una contraseña')
      .min(6, 'Mínimo 6 caracteres'),
    confirmPwd: Yup.string()
      .required('Confirme la contraseña')
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit() {
    return false
  }
  
  return (
    
    <div className="login-container">
        <div className="row">
            <div className="login-form-1">
            <h3>Crear nueva cuenta</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                    <input type="text" className="form-control" name='username'
                        placeholder="Nombre de usuario *"/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" name='email'
                     placeholder="Correo *"/>
                </div>
            <div id="campo" className="form-group">
            
                <input
                    type="password"
                    {...register('password')}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    name="password"
                    placeholder="Contraseña *"
                    
                />
                <button className="btnOjo" onClick={verContrasena}>
                    <img src={ojocerrado} id="imagenPsw" alt="imagenPsw"/>
                </button>
            <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
        <div id="campo"className="form-group">
          
                <input
                    type="password"
                    {...register('confirmPwd')}
                    className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                    name="confirmPwd"
                    placeholder="Confirmar Contraseña *"
                />
                                <button className="btnOjo" onClick={verConfirmacion}>
                    <img src={ojocerrado} id="imagenCnf" alt="imagenCnf"/>
                </button>
                
            <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
            </div>
        <div className="mt-3">
          <button id="btnSubmit" type="submit" onClick={enviar} className="btn btn-primary">
            Crear Cuenta
            
          </button>
          <a className="btnLogin" href="login">¿Ya tienes una cuenta? ¡Inicia sesión!</a>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}