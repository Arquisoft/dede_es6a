import React from 'react';
import { render, screen } from '@testing-library/react';
import AddProducts from './AddProducts';


test('Acceso a la pantalla de añadir producto', () => {


  render(<AddProducts />);
  
 
  

  const hol = screen.getByText("Te recomendamos que compres larios nuestra mejor ginebra al precio mas competitivo ;D");
  expect(hol).toBeInTheDocument();

});


