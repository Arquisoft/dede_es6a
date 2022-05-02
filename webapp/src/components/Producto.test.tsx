import { render, screen } from '@testing-library/react';
import { Product } from '../shared/shareddtypes';
import Producto from './Producto';





test('Test renderizado producto', () => {


  const productoParaTest: Product={id:"1", nombre:"ProductoPrueba", marca:"Nike", precio:10.0, categoria:"Testing", descripcion:"Producto de test para verificar el correcto funcionamiento de la app.", rating: 2.5, imagen: ""};
  render(<Producto props={productoParaTest} addToCarrito={()=>null}/> );

  const nombre = screen.getByText("ProductoPrueba");
  expect(nombre).toBeInTheDocument();
  const precio = screen.getByText("10 €");
  expect(precio).toBeInTheDocument();
  const descripción = screen.getByText("Producto de test para verificar el correcto funcionamiento de la app.");
  expect(descripción).toBeInTheDocument();
 
});


