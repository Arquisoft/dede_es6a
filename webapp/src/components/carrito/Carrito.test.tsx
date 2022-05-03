import React from 'react';
import { render, screen } from '@testing-library/react';
import Carrito from './Carrito';


test('Acceso a la pantalla del carrito', () => {
  render(<Carrito />);
  
  const tituloCarrito = screen.getByText("Carrito");
  expect(tituloCarrito).toBeInTheDocument();

  const botonVaciar = screen.getByText("Vaciar Carrito");
  expect(botonVaciar).toBeInTheDocument();

  const lbNombre = screen.getByText("NOMBRE");
  expect(lbNombre).toBeInTheDocument();
  const lbUnidades = screen.getByText("UNIDADES");
  expect(lbUnidades).toBeInTheDocument();
  const lbPrecio = screen.getByText("PRECIO");
  expect(lbPrecio).toBeInTheDocument();


  const precioTotal = screen.getByText("Precio total: 0.00€");
  expect(precioTotal).toBeInTheDocument();


  const btTramitarPedido = screen.getByText("Tramitar pedido");
  expect(btTramitarPedido).toBeInTheDocument();
  
  const enlaceContent = screen.getByText("Content");
  expect(enlaceContent).toBeInTheDocument();
});


