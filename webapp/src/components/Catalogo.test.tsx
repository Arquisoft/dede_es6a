import React from 'react';
import { render, screen } from '@testing-library/react';
import Catalogo from './Catalogo';
import { ListaCarrito, Product } from '../shared/shareddtypes';
import App from '../App';


test('Acceso a la pantalla de catálogo', () => {
  render(<App />);
  const linkElement = screen.getByText("Sí");
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  const catalogoTitulo = screen.getByText("Catálogo de productos");
  expect(catalogoTitulo).toBeInTheDocument();
  
});


