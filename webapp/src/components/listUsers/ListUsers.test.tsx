import React from 'react';
import { render, screen } from '@testing-library/react';
import ListUsers from './ListUsers';


test('Acceso a la lista de usuarios no admin', () => {
  render(<ListUsers />);
  
  const tituloPagina = screen.getByText("No Vendo Agua");
  expect(tituloPagina).toBeInTheDocument();

  const aviso = screen.getByText("Te recomendamos que compres larios nuestra mejor ginebra al precio mas competitivo ;D");
  expect(aviso).toBeInTheDocument();



  
});


