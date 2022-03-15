
import {getProducts} from '../api/api';
import {Product} from '../shared/shareddtypes';
import ListGroup from 'react-bootstrap/ListGroup'
import { useState, useEffect } from 'react';
import Producto from './Producto';
import './catalogo.css';
import BarraNavegacion from './BarraNavegacion';
import { useSearchParams } from 'react-router-dom';

function Catalogo (): JSX.Element{

  const [searchParams, setSearchParams] = useSearchParams();
  var filter : String = 'all';
  if(searchParams.get('filter')){
    filter = searchParams.get('filter') as String;
  }
  const [products,setProducts] = useState<Product[]>([]);
  const refreshProducts = async () => {
    setProducts(await getProducts(filter));
  }
  useEffect(()=>{ refreshProducts(); }, []);

    return (
        <>
        <h1 >Catálogo de productos</h1>
        <BarraNavegacion />
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