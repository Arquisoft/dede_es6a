import React from 'react';
import { render, screen } from '@testing-library/react';
import DatosPedido from './DatosPedido';
import {isLoggedType} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';


test('Acceso a la pantalla de datos pedido', () => {
    let log = {
      logged: true
    }

  render(<DatosPedido />);
  
 
  

  const textoFin = screen.getByText("Te recomendamos que compres larios nuestra mejor ginebra al precio mas competitivo ;D");
  expect(textoFin).toBeInTheDocument();

});


