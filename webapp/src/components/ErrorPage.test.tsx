import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from './ErrorPage';

test('Acceso a la ventana de error', () => {

  const { getByText} = render(
    <Router>
      <ErrorPage msg='mensaje de prueba'></ErrorPage>
    </Router>
  );
  expect(getByText("Oh vaya! mensaje de prueba")).toBeInTheDocument();
  expect(getByText("Te recomendamos que compres larios nuestra mejor ginebra al precio mas competitivo ;D")).toBeInTheDocument();
});

test("Click on Volver", async () => {
    const { container } = render(
        <Router>
        <ErrorPage msg='mensaje de test'></ErrorPage>
      </Router>
    );

    const addButton = getByTestId(container, "boton-volver");
    fireEvent.click(addButton);
    expect(window.location.pathname).toBe("/");
  });
