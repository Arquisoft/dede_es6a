
import {getProducts} from '../api/api';
import {Product} from '../shared/shareddtypes';
import ListGroup from 'react-bootstrap/ListGroup'
import { useState, useEffect } from 'react';
import Producto from './Producto';
import BarraNavegacion from './BarraNavegacion';
import Footer from './Footer';
import { useSearchParams } from 'react-router-dom';
import {addToCarrito} from './carrito/utilsCarrito';

type Catalogo = {
}

const Catalogo: React.FC<Catalogo> = () => {
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
        <ListGroup id='listaProductos' className="listaProductos">
            {products.map((producto,productoId)=>{
                return(
                  <Producto props={producto} key={productoId} addToCarrito={addToCarrito}/> 
                );
            })}
      </ListGroup>
      <hr></hr>
      <Footer/>
      </>
    );

}
export default Catalogo;