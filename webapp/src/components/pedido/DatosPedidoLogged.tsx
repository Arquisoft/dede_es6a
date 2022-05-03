import Footer from '../Footer';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ListaCarrito } from '../../shared/shareddtypes';
import './DatosPedido.css';
import {saveData, getPrecioTotal, getDataFromPod} from './DatosPedidoUtils';

export default function Profile() {

    const [direcciones,setDirecciones] = useState<String[]>([]);
    let sessionCart = localStorage.getItem("listaCarrito");
    let listaCarrito:ListaCarrito[] = [];
    if(sessionCart)
        listaCarrito = JSON.parse(sessionCart);

    useEffect(()=>{ loadStreets();}, []);

    const loadStreets = () => {
        let direcciones = localStorage.getItem('direcciones');
        if ( direcciones != null ){
            let dirArray = direcciones.split('$');
            dirArray.pop();
            setDirecciones(dirArray);
        }
    }
    const getDirs  = async () => {
        setDirecciones( await getDataFromPod() );
    }

    return (
        <>
        <h2 id="tituloPago">Trámite de pedido</h2>
        <Form id="formPago">
            <Form.Group  controlId="nombre">
                <Form.Control className="inputPago" type="text" placeholder="Nombre" name="name"/>
            </Form.Group>
            <Form.Group controlId="apellidos">
                <Form.Control className="inputPago" type="text" placeholder="Apellidos" name="lastname"/>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Control className="inputPago" type="text" placeholder="Correo electrónico" name="email"/>
            </Form.Group>
            <Form.Group  controlId="city">
                <Form.Control className="inputPago" type="text" placeholder="Ciudad" name="city"/>
            </Form.Group>
            <Form.Group controlId="street">
                <Form.Control className="inputPago" type="text" placeholder="Calle" name="street"/>
            </Form.Group>
            <Form.Group controlId="zipcode">
                <Form.Control className="inputPago" type="text" placeholder="Código postal" name="zipcode"/>
            </Form.Group>
            <Form.Group className="mb-3" id='checkbox' controlId="formBasicCheckbox">
                
            <ButtonGroup>
                {direcciones.map(d => (
                    <Form.Check type="radio" label={d} id={"default-radio-"+direcciones.indexOf(d)} name='dir'/>
                ))}
            </ButtonGroup>
                <Form.Control className="inputPago" id='url' type="url" placeholder="POD URL" name="podurl"/>
                <Button id="formButton" type="button" onClick={getDirs}>Cargar</Button>
            </Form.Group>
            <Button id="formButton" type="button" onClick={saveData}>Siguiente</Button>
            <a href='/pago' id='pago' hidden>Content</a>
        </Form>
        <div id='resumen'>
            <h3 id='titulo-resumen'>Resumen de compra</h3>
            <div id='productos'>
                {listaCarrito.map(carrito => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Img variant="top" src={carrito.producto.imagen} />
                            <Card.Title>{carrito.producto.nombre}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Unidades: {" " + carrito.unidades + " "}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Precio total: {" " + Number(carrito.unidades*carrito.producto.precio).toFixed(2) + " €"}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <h4 id='titulo-resumen'>Precio del pedido: {getPrecioTotal(listaCarrito) + " €"}</h4>
        </div>

        <Footer/>
    </>
    );
}