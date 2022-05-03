import React from 'react';
import { render, screen } from '@testing-library/react';
import FormRegister from './FormRegister';


test('Acceso a la pantalla de registro', () => {
  render(<FormRegister />);
  
  const tituloCuentaNueva = screen.getByText("Crear nueva cuenta");
  expect(tituloCuentaNueva).toBeInTheDocument();
  const campoUsername = screen.getByPlaceholderText("Nombre de usuario *")
  expect(campoUsername).toBeInTheDocument();
  const campoEmail = screen.getByPlaceholderText("Correo *")
  expect(campoEmail).toBeInTheDocument();
  const campoPassword = screen.getByPlaceholderText("Contraseña *")
  expect(campoPassword).toBeInTheDocument();
  const campoConfirmacionPassword = screen.getByPlaceholderText("Confirmar Contraseña *")
  expect(campoConfirmacionPassword).toBeInTheDocument();
  const botonCrearCuenta = screen.getByText("Crear Cuenta");
  expect(botonCrearCuenta).toBeInTheDocument();
  const botonInicioSesion = screen.getByText("¿Ya tienes una cuenta? ¡Inicia sesión!");
  expect(botonInicioSesion).toBeInTheDocument();
  const imgOjoCerradoPassword = screen.getByAltText("imagenPsw")
  expect(imgOjoCerradoPassword).toBeInTheDocument();
  const imgOjoCerradoConfirmacionPassword = screen.getByAltText("imagenCnf")
  expect(imgOjoCerradoConfirmacionPassword).toBeInTheDocument();
});
