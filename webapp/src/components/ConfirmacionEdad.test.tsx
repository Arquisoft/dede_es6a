import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from "react-router-dom";
import ConfirmacionEdad from './ConfirmacionEdad';




test('Test renderizado barra menú', () => {

  render(<App />);
  const logo = screen.getByAltText("logo");
  expect(logo).toBeInTheDocument();
  const botonSi = screen.getByText("Sí");
  expect(botonSi).toBeInTheDocument();
  const botonNo = screen.getByText("No");
  expect(botonNo).toBeInTheDocument();

});

test("Click on si", async () => {
  const { container } = render(
      <Router>
      <ConfirmacionEdad></ConfirmacionEdad>
    </Router>
  );

  const addButton = getByTestId(container, "boton-si");
  fireEvent.click(addButton);
  expect(window.location.pathname).toBe("/");
});

test("Click on no", async () => {
  const { container } = render(
      <Router>
      <ConfirmacionEdad></ConfirmacionEdad>
    </Router>
  );

  const addButton = getByTestId(container, "boton-no");
  fireEvent.click(addButton);
  expect(window.location.pathname).toBe("/");
});
