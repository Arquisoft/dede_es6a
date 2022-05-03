import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import ProfileLogged from './ProfileLogged';
import { BrowserRouter as Router } from "react-router-dom";

test('Acceso a la pantalla de profile', () => {
    const { getByText} = render(
        <Router>
          <ProfileLogged></ProfileLogged>
        </Router>
      );

      expect(getByText("Usuario")).toBeInTheDocument();
      expect(getByText("Pedidos realizados")).toBeInTheDocument();
      expect(getByText("Cerrar sesión")).toBeInTheDocument();
});

test("Click on cerrar sesion", async () => {
    const { container } = render(
        <Router>
        <ProfileLogged></ProfileLogged>
      </Router>
    );

    const addButton = getByTestId(container, "boton-cerrarsesion");
    fireEvent.click(addButton);
    expect(window.location.pathname).toBe("/");
});