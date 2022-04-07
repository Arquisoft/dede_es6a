import { render, screen } from '@testing-library/react';
import { Product } from '../shared/shareddtypes';
import App from './../App';





test('Test renderizado barra menú', () => {


  render(<App />);
  const logo = screen.getByAltText("logo");
  expect(logo).toBeInTheDocument();
  const botonSi = screen.getByText("Sí");
  expect(botonSi).toBeInTheDocument();
  const botonNo = screen.getByText("No");
  expect(botonNo).toBeInTheDocument();

  
});


