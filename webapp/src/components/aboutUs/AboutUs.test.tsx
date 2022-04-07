import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutUs from './AboutUs';


test('test AboutUs', () => {
    
  render(<AboutUs />);
  
  const titulo = screen.getByText("About us");
  expect(titulo).toBeInTheDocument();
  



  

});


