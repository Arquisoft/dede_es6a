import { Carrito } from '../../shared/shareddtypes';
import { Product } from '../../shared/shareddtypes';
import ListGroup from 'react-bootstrap/ListGroup'
import { useState, useEffect } from 'react';
import './Carrito.css';
import BarraNavegacion from '../BarraNavegacion';
import Producto from '../Producto';
import { Button, Card } from 'react-bootstrap';

//function Carrito (): JSX.Element{
export default function(): JSX.Element{

    const [listaCarrito,setListaCarrito] = useState<Carrito[]>([]);

    const addToCarrito = (prod: Product) =>{
            setListaCarrito( prev => {
            const estaEnElCarrito = prev.find(p => p.producto.id===prod.id);
            if(estaEnElCarrito) {
                return prev.map(item => item.producto.id === prod.id ? { producto: item.producto, unidades: item.unidades + 1 } : item);
            } else {
                const c:Carrito = {'producto':prod, 'unidades':1};
                return [c];
            }
        });
    };

    const removeFromCarrito = (id: string) => {
        setListaCarrito(prev =>
            prev.reduce((ack, item) => {
            if (item.producto.id === id) {
                if (item.unidades === 1) return ack;
                return [...ack, { ...item, amount: item.unidades - 1 }];
            } else {
                return [...ack, item];
            }
            }, [] as Carrito[])
        );
    };

    return (
        <>
        <BarraNavegacion />
        <h1 >Carrito</h1>
        <Card>
        <Card.Header id="cardHeader">Productos</Card.Header>
        <ListGroup id='listaCarrito'>
            {listaCarrito.map((carrito)=>{   
                return(
                    <ListGroup.Item>
                        Nombre: {carrito.producto.nombre}
                        <Button id="btAñadir" variant="success">+</Button>
                        Unidades: {carrito.unidades}
                        <Button id="btEliminar" variant="danger">-</Button>
                        Precio = ({carrito.unidades}*{carrito.producto.precio})€
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
      </Card>
      <h3>Precio total: *funcion para calcular el precio total*</h3>
      <Button id="btTramitarPedido">Tramitar pedido</Button>
      </>
    );

  };
  //export default Carrito;