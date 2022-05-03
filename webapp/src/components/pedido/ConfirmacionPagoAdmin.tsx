import Form from 'react-bootstrap/Form'
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import './ConfirmacionPago.css';
import {getPrecioEnvio, getPrecioTotal, getDeliveryTerm, mostarDatosPago } from './ConfirmacionPagoUtils';

export default function ConfirmacionPagoAdmin(props:any){
   
        return (
            <>
            <h2 id="tituloPago">Trámite del pago</h2>

            <Card style={{ width: '18rem' }} id="detalles">
                <Card.Header>Pedido</Card.Header>
                <ListGroup variant="flush">
                {props.listaCarrito.map((carrito:any) => (
                        <ListGroup.Item><p>{carrito.producto.nombre}: {Number(carrito.unidades*carrito.producto.precio).toFixed(2)} €</p></ListGroup.Item>
                ))}
                <ListGroup.Item>Precio de envio: {getPrecioEnvio(props.order)} €</ListGroup.Item>
                <ListGroup.Item>Total: {getPrecioTotal(props.order, props.listaCarrito)} € (IVA incluido 21%)</ListGroup.Item> 
                <ListGroup.Item>Entrega: {getDeliveryTerm(props.order)}</ListGroup.Item>
                </ListGroup>
            </Card>
            <div id='container'>
                    <Form id="tipoPago">
                        <Form.Label id="labelSelectTipo" className="labelTipoPago">Elige el tipo de pago:</Form.Label>
                        <Form.Select  id="selectTipo" aria-label="Elige el tipo de pago">
                            <option value="tarjeta">Tarjeta</option>
                            <option value="paypal">PayPal</option>
                            <option value="transferencia">Transferencia bancaria</option>
                        </Form.Select>
                        <br/>
                        <Button id="formButton" type="button" onClick={()=>{mostarDatosPago(props.order, props.listaCarrito)}}>Siguiente</Button>
                    </Form>

                </div>
                <hr></hr>
                <Footer/>
        </>

        );
    

}


