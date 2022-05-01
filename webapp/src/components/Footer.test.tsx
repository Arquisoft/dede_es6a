import React from 'react';
import { render, screen } from '@testing-library/react';
import Catalogo from './Catalogo';
import { ListaCarrito, Product } from '../shared/shareddtypes';
import Footer from './Footer';


test('Acceso a la pantalla de catálogo', () => {
  render(<Footer />);
  const texto = screen.getByText("2021-2022");
  expect(texto).toBeInTheDocument();
  const daniel = screen.getByText("Daniel Machado Sánchez");
  expect(daniel).toBeInTheDocument();
  const david = screen.getByText("David Maldonado Álvarez");
  expect(david).toBeInTheDocument();
  const diego = screen.getByText("Diego García Quirós");
  expect(diego).toBeInTheDocument();
  const juan = screen.getByText("Juan Mera Menéndez");
  expect(juan).toBeInTheDocument();
  const oscar = screen.getByText("Óscar López González");
  expect(oscar).toBeInTheDocument();
 
});


