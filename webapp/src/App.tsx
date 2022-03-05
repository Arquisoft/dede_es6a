import React, { useState, useEffect } from 'react';

import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import './App.css';
import {Producto} from './shared/shareddtypes';



function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }


  const producto1: Producto = {ID: "1", nombre:"Negrita", marca:"Negrita", precio:12.59, categoria:"Ron", descripcion:"¿Quién no ha probado un Negrita? Que levante la mano... El ron más popular en cualquier fiesta universitaria está especialmente recomendado para combinados y cócteles.", foto:"./negrita.jpg"}
  const producto2: Producto = {ID: "2", nombre:"Absolut", marca:"Absolut", precio:16.79, categoria:"Vodka", descripcion:"Se hace exclusivamente a partir de ingredientes naturales y, a diferencia de lo que ocurre con muchos otros vodkas, no contiene azúcar añadido. Tiene un sabor: rico, con cuerpo y complejo, pero suave y maduro, seguido de un toque a frutas secas.", foto:'./absolut.jpg'}
  const producto3: Producto = {ID: "3", nombre:"Anís Asturiana Dulce", marca:"Anís de la asturiana", precio:10.95, categoria:"Anisado", descripcion:"Anís Asturiana Dulce es un fantástico Anís de tipo Premium con un Grado alcohólico del 36.5% con origen España, sin duda un de los mejores de la categoría de Licores.", foto:"./anis-asturiana-dulce.jpg"}
  const producto4: Producto = {ID: "4", nombre:"Jagermeister", marca:"Jagermeister", precio:15.40, categoria:"Licor de hierbas", descripcion:"Producido en la ciudad de Wolfenbüttel, Alemania, Jägermeister deriva de 56 hierbas, especias, frutas y raíces de todo el mundo y lo está petando en todo el mundo.", foto:"./jagermeister.jpg"}

  const productos: Producto[] = [producto1, producto2, producto3, producto4];
  

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>

      
     
      <ul className="catalogo">
       {productos.map((producto)=>{
    
          return (
                <li className = "producto">    
                     <img src={producto.foto} className ="imagenProducto" alt={producto.nombre} />    
                     <p className ="nombreProducto">{producto.nombre}</p>
                </li>
          )
        })}
        </ul>
   
    </>
  );
}

export default App;
