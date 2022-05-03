import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutUs from './AboutUs';


test('test AboutUs', () => {
    
  render(<AboutUs />);
  
  const juanNombre = screen.getByText("Juan Mera Menéndez");
  expect(juanNombre).toBeInTheDocument();
  const juanCorreo = screen.getByText("UO277406@uniovi.es");
  expect(juanCorreo).toBeInTheDocument();
  const juanImagen = screen.getByAltText("Imagen Juan");
  expect(juanImagen).toBeInTheDocument();

  const diegoNombre = screen.getByText("Diego García Quirós");
  expect(diegoNombre).toBeInTheDocument();
  const diegoCorreo = screen.getByText("UO276688@uniovi.es");
  expect(diegoCorreo).toBeInTheDocument();
  const diegoImagen = screen.getByAltText("Imagen Diego");
  expect(diegoImagen).toBeInTheDocument();

  const danielNombre = screen.getByText("Daniel Machado Sánchez");
  expect(danielNombre).toBeInTheDocument();
  const danielCorreo = screen.getByText("UO276257@uniovi.es");
  expect(danielCorreo).toBeInTheDocument();
  const danielImagen = screen.getByAltText("Imagen Daniel");
  expect(danielImagen).toBeInTheDocument();

  const davidNombre = screen.getByText("David Maldonado Álvarez");
  expect(davidNombre).toBeInTheDocument();
  const davidCorreo = screen.getByText("UO259893@uniovi.es");
  expect(davidCorreo).toBeInTheDocument();
  const davidImagen = screen.getByAltText("Imagen David");
  expect(davidImagen).toBeInTheDocument();

  const oscarNombre = screen.getByText("Oscar López González");
  expect(oscarNombre).toBeInTheDocument();
  const oscarCorreo = screen.getByText("UO269489@uniovi.es");
  expect(oscarCorreo).toBeInTheDocument();
  const oscarImagen = screen.getByAltText("Imagen Oscar");
  expect(oscarImagen).toBeInTheDocument();




  

});


