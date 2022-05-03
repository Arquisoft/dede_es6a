import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from "react-router-dom";
import Catalogo from './Catalogo';

test('Acceso a la pantalla de catálogo', () => {

  const { getByText} = render(
    <Router>
      <Catalogo></Catalogo>
    </Router>
  );
  expect(getByText("Catálogo de productos")).toBeInTheDocument();
});


