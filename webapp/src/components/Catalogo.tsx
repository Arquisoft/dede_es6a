
import {getProducts} from '../api/api';
import {Product} from '../shared/shareddtypes';
import ListGroup from 'react-bootstrap/ListGroup'
import { useState, useEffect } from 'react';
import Producto from './Producto';
import './catalogo.css';
import BarraNavegacion from './BarraNavegacion';

function Catalogo (): JSX.Element{

  const [products,setProducts] = useState<Product[]>([]);
  const refreshProducts = async () => {
    setProducts(await getProducts());
  }
  useEffect(()=>{ refreshProducts(); }, []);

    return (
        <>
        <BarraNavegacion />
        <h1 id='titulo'>Catálogo de productos</h1>
        <ListGroup id='listaProductos'>
            {products.map((producto)=>{   
                return(
                  <Producto producto={producto} /> 
                );
            })}
      </ListGroup>

      </>
    );

}
export default Catalogo;