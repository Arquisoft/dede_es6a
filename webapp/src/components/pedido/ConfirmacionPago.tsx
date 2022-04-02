import Form from 'react-bootstrap/Form'
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {createOrder, isLogged} from '../../api/api';
import {isLoggedType, ListaCarrito, Order} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import ErrorPage from '../ErrorPage';
import './ConfirmacionPago.css';

type ConfirmacionPago = {
    listaCarrito: ListaCarrito[];
  }

const ConfirmacionPago: React.FC<ConfirmacionPago> = ({listaCarrito}) =>{  
    const sessionCart = localStorage.getItem("listaCarrito");
    if (sessionCart)
        listaCarrito = JSON.parse(sessionCart);

    const orderDataStoraged = localStorage.getItem("order");
    let orderData: Order;
    if(orderDataStoraged)
        orderData = JSON.parse(orderDataStoraged);

    const [order,setOrder] = useState<any>();
    const [log,setIsLogged] = useState<isLoggedType>();

    const refreshOrder = async () => {
        setOrder(await createOrder(orderData));
    }
    const refreshIsLogged = async () => {
        setIsLogged(await isLogged());
    }

    useEffect(()=>{ refreshIsLogged(); refreshOrder(); }, []);

    function getPrecioEnvio():number {
        if(order != undefined){
            return order["rates"][0]["amount"];
        }
        return 0;
    }

    function getDeliveryTerm(): string {
        if(order != undefined){
            return order["rates"][0]["duration_terms"]
        }
        return "no disponible";
    }

    function getPrecio(): number {
        let precioTotal: number = 0;
        listaCarrito.forEach( (elem, i) => {
            precioTotal += listaCarrito[i].producto.precio * listaCarrito[i].unidades
        });
        return precioTotal;
    }

    function getPrecioTotal(): number {
        return Number(getPrecio())+ Number(getPrecioEnvio());
    }

    function finalizarPedido() {
        localStorage.setItem("listaCarrito", "");
        document.getElementById('formPago')?.remove();
        let contenedor = document.getElementById('container') as Element;
        contenedor.innerHTML = "<h4>Pedido realizado con éxito</h4>";
        contenedor.innerHTML += "<a href='catalogo'>Seguir comprando</a>"
    }
    
    if(log?.logged){
        return (
            <>
            <h2 id="tituloPago">Trámite del pago</h2>

            <Card style={{ width: '18rem' }} id="detalles">
                <Card.Header>Pedido</Card.Header>
                <ListGroup variant="flush">
                {listaCarrito.map(carrito => (
                        <ListGroup.Item>{carrito.producto.nombre}:     {carrito.unidades*carrito.producto.precio} €</ListGroup.Item>
                ))}
                <ListGroup.Item>Precio de envio:    {getPrecioEnvio()} €</ListGroup.Item>
                <ListGroup.Item>Total:    {getPrecioTotal()} €</ListGroup.Item> 
                <ListGroup.Item>Entrega: {getDeliveryTerm()}</ListGroup.Item>
                </ListGroup>
            </Card>
            <div id='container'>
                <Form id="formPago">
                    <Form.Group  controlId="formNumeroTarjeta">
                        <Form.Label className="labelPago">Número de Tarjeta:</Form.Label>
                        <Form.Control className="inputPago" type="text" placeholder="1111-1111-1111-1111" name="formNumeroTarjeta"/>
                    </Form.Group>
                    <Form.Group controlId="formFechaCaducidad">
                        <Form.Label className="labelPago">Fecha de Caducidad:</Form.Label>
                        <Form.Control className="inputPago" type="text" placeholder="01/01" name="formFechaCaducidad"/>
                    </Form.Group>
                    <Form.Group controlId="formCodigoSeguridad">
                        <Form.Label className="labelPago">Código de Seguridad:</Form.Label>
                        <Form.Control className="inputPago" type="number" placeholder="111" name="formCodigoSeguridad"/>
                    </Form.Group>
                    
                    <Button id="formButton" type="button" onClick={finalizarPedido}>PAGAR</Button>
                </Form>

                <hr></hr>
                <Footer/>
            </div>
        </>
        );
    }else{
        return( 
            <ErrorPage msg="Debes iniciar sesión para poder acceder"/>
        );
    }

}
export default ConfirmacionPago;