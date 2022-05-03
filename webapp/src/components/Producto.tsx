
import {Product} from '../shared/shareddtypes';
import ReactStars from 'react-stars';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './catalogo.css';
import toast from 'react-hot-toast';

type ProductoType = {
    props: Product;
    addToCarrito: (prod: Product) => void;
  }

//function Producto (props: Producto, addToCarrito: void): JSX.Element{
const Producto: React.FC<ProductoType> = ({props, addToCarrito}) => {

    let precio = "";
    var arrayCadenas = props.precio.toString().split('.');
    if(arrayCadenas.length > 1 && arrayCadenas[1].length === 1){
        precio = props.precio + "0 €";
    } else if(arrayCadenas.length === 1){
        precio = props.precio + ".00 €";
    } else {
        precio = props.precio + " €";
    }

    return (
        <>
        <Card id='producto' as="div">
            <Card.Img variant="top" src={props.imagen} id='img-top'/>
            <Card.Body>
                <Card.Title as="h2">{props.nombre}</Card.Title>
                <hr></hr>
                <ReactStars className='estrellas' count={5} value={props.rating} onChange={() => {
                    toast.success('Gracias por su valoración', {duration: 3500});
                }} size={24} color2={'#ffd700'} />
                <Card.Text>
                {props.descripcion}
                </Card.Text>
                <hr></hr>
            </Card.Body>
            
            <Card.Footer as="h2" className="precioProducto">
                {precio}
            </Card.Footer>
            <Button className="bt-Añadir" id='boton-añadir' onClick={() => addToCarrito(props)}>
                <svg xmlns="./cart.svg " width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
            </Button>
        </Card>
        </>
      
    );

}
export default Producto;

