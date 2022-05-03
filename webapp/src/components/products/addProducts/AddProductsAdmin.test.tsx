import React from 'react';
import { render, screen } from '@testing-library/react';
import AddProductsAdmin from './AddProductsAdmin';


test('Acceso a la pantalla de añadir producto administrador', () => {


  render(<AddProductsAdmin />);
  
 
  

  const nombre = screen.getByText("Nombre del producto");
  expect(nombre).toBeInTheDocument();

  const marca = screen.getByText("Marca del producto");
  expect(marca).toBeInTheDocument();

  const precio = screen.getByText("Precio");
  expect(precio).toBeInTheDocument();

  const categoria = screen.getByText("Categoria");
  expect(categoria).toBeInTheDocument();

  const descripcion = screen.getByText("Descripcion del producto");
  expect(descripcion).toBeInTheDocument();

  const btCrear = screen.getByText("Crear");
  expect(btCrear).toBeInTheDocument();
});


