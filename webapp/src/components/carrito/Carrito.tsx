import { ListaCarrito } from '../../shared/shareddtypes';
import './Carrito.css';
import BarraNavegacion from '../BarraNavegacion';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import React, { useEffect, useState } from "react";
import {vaciarCarrito, addToCarrito, removeFromCarrito} from './utilsCarrito';

type Carrito = {
}

const Carrito: React.FC<Carrito> = () => {

    let sessionCart = localStorage.getItem("listaCarrito");
    let aux:ListaCarrito[] = [];
    if(sessionCart)
        aux = JSON.parse(sessionCart);
    let [listaCarrito,setListaCarrito] = useState<ListaCarrito[]>(aux);
    
    function GetPrecio(unidades:number, precio:number): number{
        return unidades*precio;
    }

    function GetPrecioTotal(): number {
        let precioTotal: number = 0;
        listaCarrito.forEach( (elem, i) => {
            precioTotal += listaCarrito[i].producto.precio * listaCarrito[i].unidades
        });
        return precioTotal;
    }

    return (
        <>
        <h1 >Carrito</h1>
        <BarraNavegacion />
        <Button id="btVaciar" onClick={() => setListaCarrito( vaciarCarrito() )}>Vaciar Carrito</Button>
        <Table striped bordered hover id='listaCarrito'>
            <thead>
                <tr>
                <th>NOMBRE</th>
                <th>UNIDADES</th>
                <th>PRECIO</th>
                </tr>
            </thead>
            <tbody>
            {listaCarrito.map(carrito => (
                <tr>
                    <th>{carrito.producto.nombre}</th>
                    <th><Button id="btAñadir" variant="success" onClick={() =>setListaCarrito(addToCarrito(carrito.producto))}>+</Button>
                    {" " + carrito.unidades + " "}
                    <Button id="btEliminar" variant="danger" onClick={ () => setListaCarrito( removeFromCarrito(carrito.producto))}>-</Button></th>
                    <th>{GetPrecio(carrito.unidades, carrito.producto.precio).toFixed(2)}€</th>
                </tr>
            ))}
            </tbody>
        </Table>
      <h3>Precio total: {GetPrecioTotal().toFixed(2)}€</h3>
      <Button id="btTramitarPedido" href='http://localhost:3000/pedido'>Tramitar pedido</Button>
      </>
    );

  };
  export default Carrito;