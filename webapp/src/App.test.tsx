import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('Acceso a la pantalla de inicio', () => {
  render(<App />);
  const botonSi = screen.getByText("Sí");
  expect(botonSi).toBeInTheDocument();
  const botonNo = screen.getByText("No");
  expect(botonNo).toBeInTheDocument();
  
});

test('Acceso al catálogo', () => {
  render(<App />);
  const botonSi = screen.getByText("Sí");
  expect(botonSi).toBeInTheDocument();
  botonSi.click();
  const tituloCatalogo = screen.getByText("Catálogo de productos");
  expect(tituloCatalogo).toBeInTheDocument();

  const desplegable = screen.getByText("Bebidas destiladas");
  expect(desplegable).toBeInTheDocument();
  desplegable.click();
  const filtroRon = screen.getByText("Ron");
  expect(filtroRon).toBeInTheDocument();
  filtroRon.click();
});

