
import React, { useState } from 'react';
import {getProducts} from '../api/api';
import {Product} from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from '@mui/icons-material/ContactPage';

import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


import Producto from './Producto';

  const producto1: Product = { nombre:"Negrita", marca:"Negrita", precio:12.59, categoria:"Ron", descripcion:"¿Quién no ha probado un Negrita? Que levante la mano... El ron más popular en cualquier fiesta universitaria está especialmente recomendado para combinados y cócteles."}
  const producto2: Product = { nombre:"Absolut", marca:"Absolut", precio:16.79, categoria:"Vodka", descripcion:"Se hace exclusivamente a partir de ingredientes naturales y, a diferencia de lo que ocurre con muchos otros vodkas, no contiene azúcar añadido."}
  const producto3: Product = { nombre:"Anís Asturiana Dulce", marca:"Anís de la asturiana", precio:10.95, categoria:"Anisado", descripcion:"Anís Asturiana Dulce es un fantástico Anís de tipo Premium con un Grado alcohólico del 36.5% con origen España, sin duda un de los mejores de la categoría de Licores."}
  const producto4: Product = { nombre:"Jagermeister", marca:"Jagermeister", precio:15.4, categoria:"Licor de hierbas", descripcion:"Producido en la ciudad de Wolfenbüttel, Alemania, Jägermeister deriva de 56 hierbas, especias, frutas y raíces de todo el mundo y lo está petando en todo el mundo."}
  const producto5: Product = { nombre:"Johnnie Walker", marca:"Johnnie Walker", precio:24.20, categoria:"Whisky", descripcion:"Rico y suave. BLACK LABEL es una reconocida obra maestra de la destilación cuya profundidad de sabor se debe a la selección de más de 40 whiskies."}

  const productos: Product[] = [producto1, producto2, producto3, producto4, producto5];


function Catalogo (): JSX.Element{
    return (
        <>
        <h1 >Catálogo de productos</h1>
        <ListGroup >

            {productos.map((producto)=>{
              return (
                      <>
                     
                      <Producto producto={producto} />
                      </>
              )
              
            })}
      </ListGroup>

      </>
    );

}
export default Catalogo;