import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Developer from './Developer';


test('test Developer', () => {
    
  render(<Developer name='Nombre' 
  email='email@email.es' 
  img='../perfil-default.jpg' 
  descr='descripcion'/>);
  
  const nombre = screen.getByText("Nombre");
  expect(nombre).toBeInTheDocument();
  const email = screen.getByText("email@email.es");
  expect(email).toBeInTheDocument();
  const descripcion = screen.getByText("descripcion");
  expect(descripcion).toBeInTheDocument();
  const universidad = screen.getByText("Universidad de Oviedo");
  expect(universidad).toBeInTheDocument();
  const cardLink = screen.getByText("Card Link");
  expect(cardLink).toBeInTheDocument();
  const anotherLink = screen.getByText("Another Link");
  expect(anotherLink).toBeInTheDocument();




  

});


