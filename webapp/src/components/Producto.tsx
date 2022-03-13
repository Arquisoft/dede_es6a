
import {Product} from '../shared/shareddtypes';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Carrito from './carrito/Carrito';
import './catalogo.css';

type Producto = {
    producto: Product;
  }

function Producto (props: Producto): JSX.Element{

    const url = "./"+props.producto.nombre+".jpg";
    let precio = "";
    if(props.producto.precio.toString().length == 4){
        precio = props.producto.precio + "0 €";
    } else {
        precio = props.producto.precio + " €";
    }    

    return (
        <>
        <Card as="div">
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title as="h2">{props.producto.nombre}</Card.Title>
                <hr></hr>
                <Card.Text>
                {props.producto.descripcion}
                </Card.Text>
                <hr></hr>
            </Card.Body>
            
            <Card.Footer as="h2">
                {precio}
            </Card.Footer>
            <Button className="bt-Añadir" >
                <svg xmlns="./cart.svg " width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
            </Button>
        </Card>
        </>
      
    );

}
export default Producto;

