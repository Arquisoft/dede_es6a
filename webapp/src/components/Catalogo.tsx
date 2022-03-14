
import {getProducts} from '../api/api';
import {Product} from '../shared/shareddtypes';
import ListGroup from 'react-bootstrap/ListGroup'
import { useState, useEffect } from 'react';
import Producto from './Producto';
import BarraNavegacion from './BarraNavegacion';
import Footer from './Footer';


function Catalogo (): JSX.Element{

  const [products,setProducts] = useState<Product[]>([]);
  const refreshProducts = async () => {
    setProducts(await getProducts());
  }
  useEffect(()=>{ refreshProducts(); }, []);

    return (
        <>
        <h1 >Catálogo de productos</h1>
        <BarraNavegacion />
        <ListGroup id='listaProductos' className="listaProductos">
            {products.map((producto)=>{   
                return(
                  <Producto producto={producto} /> 
                );
            })}
      </ListGroup>
      <hr></hr>
      <Footer/>
      </>
    );

}
export default Catalogo;