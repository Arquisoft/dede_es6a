import { ListaCarrito } from '../../shared/shareddtypes';
import { Product } from '../../shared/shareddtypes';
import ListGroup from 'react-bootstrap/ListGroup'
import './Carrito.css';
import BarraNavegacion from '../BarraNavegacion';
import { Button, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

type Carrito = {
    listaCarrito: ListaCarrito[];
    addToCarrito: (prod: Product) => void;
    removeFromCarrito: (prod: Product) => void;
}

//export default function(listaCarrito, addToCarrito, removeFromCarrito): JSX.Element{
const Carrito: React.FC<Carrito> = ({listaCarrito, addToCarrito, removeFromCarrito}) => {

    const GetListaCarrito = () => {
        const sessionCart = localStorage.getItem("listaCarrito");
        if (sessionCart)
            listaCarrito= JSON.parse(sessionCart);
        console.log("Metodo")
        console.log(listaCarrito)
    }

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
        {GetListaCarrito()}
        <Table striped bordered hover id='listaCarrito'>
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Unidades</th>
                <th>Precio</th>
                </tr>
            </thead>
            <tbody>
            {listaCarrito.map(carrito => (
                <tr>
                    <th>{carrito.producto.nombre}</th>
                    <th><Button id="btAñadir" variant="success" onClick={() => addToCarrito(carrito.producto)}>+</Button>
                    {carrito.unidades}
                    <Button id="btEliminar" variant="danger" onClick={() => removeFromCarrito(carrito.producto)}>-</Button></th>
                    <th>{GetPrecio(carrito.unidades, carrito.producto.precio).toFixed(2)}€</th>
                    {GetListaCarrito()}
                </tr>
            ))}
            </tbody>
        </Table>
      <h3>Precio total: {GetPrecioTotal().toFixed(2)}€</h3>
      <Button id="btTramitarPedido">Tramitar pedido</Button>
      </>
    );

  };
  export default Carrito;