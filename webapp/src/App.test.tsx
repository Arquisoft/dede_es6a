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
  const botonNo = screen.getByText("No");
  expect(botonNo).toBeInTheDocument();
  const imagenPez = screen.getByAltText("logo")
  expect(imagenPez).toBeInTheDocument();
});

