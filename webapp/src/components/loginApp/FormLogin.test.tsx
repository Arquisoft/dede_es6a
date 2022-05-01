import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormLogin from './FormLogin';


test('Acceso a la pantalla de login', () => {
  render(<FormLogin />);
  
  const tituloInicioSesion = screen.getByText("Inicio de sesión");
  expect(tituloInicioSesion).toBeInTheDocument();


  const campoUsername = screen.getByPlaceholderText("Nombre de usuario *")
  expect(campoUsername).toBeInTheDocument();


  const campoPassword = screen.getByPlaceholderText("Contraseña *")
  expect(campoPassword).toBeInTheDocument();


  const enlaceInicioSesion = screen.getByText("Iniciar sesión")
  expect(enlaceInicioSesion).toBeInTheDocument();
  const enlaceRegistro = screen.getByText("¡Regístrate ahora!");
  expect(enlaceRegistro).toBeInTheDocument();


  const urlPod = screen.getByPlaceholderText("url del pod (opcional)")
  expect(urlPod).toBeInTheDocument();

  fireEvent.change(campoUsername, { target: { value: "admin" } });
  fireEvent.change(campoPassword, { target: { value: "123456" } });
  fireEvent.submit(screen.getByText("Iniciar sesión"));



  expect(screen.getByText("¡Regístrate ahora!").closest('a')).toHaveAttribute('href', 'register');

});


