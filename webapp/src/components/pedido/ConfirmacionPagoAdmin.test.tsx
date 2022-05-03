import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfirmacionPagoAdmin from './ConfirmacionPagoAdmin';
import {isLoggedType} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import {ListaCarrito, DataOrder, Order, Product} from '../../shared/shareddtypes';


test('Acceso a la pantalla de confirmacion pago admin', () => {
 

  let order:any;
  let listaCarrito:ListaCarrito[] = [];
  const producto1:Product ={id:"id", nombre:"nombre", marca:"marca", precio:10.0, categoria:"rubia", descripcion:"descripcion",rating:3,imagen:"imagen" };
  const elemento:ListaCarrito ={ producto:producto1, unidades:3};
  listaCarrito.push(elemento);
  render(<ConfirmacionPagoAdmin order={order} listaCarrito={listaCarrito}/>);

 
  const tramite = screen.getByText("Trámite del pago");
  expect(tramite).toBeInTheDocument();
 
  const pedido = screen.getByText("Pedido");
  expect(pedido).toBeInTheDocument();

  const nombre = screen.getByText("nombre: 30.00 €");
  expect(nombre).toBeInTheDocument();

  const precioEnvio = screen.getByText("Precio de envio: 0 €");
  expect(precioEnvio).toBeInTheDocument();

  const total = screen.getByText("Total: 30.00 € (IVA incluido 21%)");
  expect(total).toBeInTheDocument();

  const entrega = screen.getByText("Entrega: no disponible");
  expect(entrega).toBeInTheDocument();

  const tipoPago = screen.getByText("Elige el tipo de pago:");
  expect(tipoPago).toBeInTheDocument();

  const tarjeta = screen.getByText("Tarjeta");
  expect(tarjeta).toBeInTheDocument();

  const paypal = screen.getByText("PayPal");
  expect(paypal).toBeInTheDocument();

  const transferencia = screen.getByText("Transferencia bancaria");
  expect(transferencia).toBeInTheDocument();


  const btSiguiente = screen.getByText("Siguiente");
  expect(btSiguiente).toBeInTheDocument();
});


