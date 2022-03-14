import { ListaCarrito } from '../../shared/shareddtypes';
import { Product } from '../../shared/shareddtypes';
import ListGroup from 'react-bootstrap/ListGroup'
import { useState, useEffect } from 'react';
import './Carrito.css';
import BarraNavegacion from '../BarraNavegacion';
import Producto from '../Producto';
import { Button, Card } from 'react-bootstrap';

type Carrito = {
    listaCarrito: ListaCarrito[];
    addToCarrito: (prod: Product) => void;
    removeFromCarrito: (id: string) => void;
}

//export default function(listaCarrito, addToCarrito, removeFromCarrito): JSX.Element{
const Carrito: React.FC<Carrito> = ({listaCarrito, addToCarrito, removeFromCarrito}) => {

    return (
        <>
        <h1 >Carrito</h1>
        <BarraNavegacion />
        <Card>
        <Card.Header id="cardHeader">Productos</Card.Header>
        {listaCarrito.length === 0 ? <p>No hay productos en el carrito.</p> : null}
        <ListGroup id='listaCarrito'>
            {listaCarrito.map(carrito => (   
                <ListGroup.Item>
                    Nombre: {carrito.producto.nombre}
                    <Button id="btAñadir" variant="success" onClick={() => addToCarrito(carrito.producto)}>+</Button>
                    Unidades: {carrito.unidades}
                    <Button id="btEliminar" variant="danger" onClick={() => removeFromCarrito(carrito.producto.nombre)}>-</Button>
                    Precio = ({carrito.unidades}*{carrito.producto.precio})€
                </ListGroup.Item>
            ))}
        </ListGroup>
      </Card>
      <h3>Precio total: *funcion para calcular el precio total*</h3>
      <Button id="btTramitarPedido">Tramitar pedido</Button>
      </>
    );

  };
  export default Carrito;