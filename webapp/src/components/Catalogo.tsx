import React from 'react'
import {Producto} from '../shared/shareddtypes';
import ItemCatalogo from './Catalogo';



type CatalogoProps = {
    productos: Producto[];
  }
  


function Catalogo(props: CatalogoProps): JSX.Element {
    return (
      <li>
        
        {props.productos.map((producto)=>{
          return (
               
                producto.nombre
          )
        })}
        
        </li>
    

    );
  }
  

export default Catalogo;