import Form from 'react-bootstrap/Form'
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {createOrder, isLogged, saveOrder} from '../../api/api';
import {isLoggedType, ListaCarrito, DataOrder, Order} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import ErrorPage from '../ErrorPage';
import './ConfirmacionPago.css';
import {useHref} from "react-router-dom";
import {red} from "@mui/material/colors";

type ConfirmacionPago = {
}

const ConfirmacionPago: React.FC<ConfirmacionPago> = () =>{
    let sessionCart = localStorage.getItem("listaCarrito");
    let listaCarrito:ListaCarrito[] = [];
    if(sessionCart)
        listaCarrito = JSON.parse(sessionCart);

    const orderDataStoraged = localStorage.getItem("order");
    let orderData: DataOrder;
    if(orderDataStoraged)
        orderData = JSON.parse(orderDataStoraged);

    const [order,setOrder] = useState<any>();
    const [log,setIsLogged] = useState<boolean>();

    const refreshOrder = async () => {
        setOrder(await createOrder(orderData));
    }
    const refreshIsLogged =  () => {
        setIsLogged(isLogged());
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

    function getPrecio(): string {
        let precioTotal: number = 0;
        listaCarrito.forEach( (elem, i) => {
            precioTotal += listaCarrito[i].producto.precio * listaCarrito[i].unidades
        });
        return precioTotal.toFixed(2);
    }

    function getPrecioTotal(): string {
        return (Number(getPrecio())+ Number(getPrecioEnvio())).toFixed(2);
    }

    function mostarDatosPago() {
        var tipo = document.getElementById("selectTipo") as HTMLSelectElement;
        var tipoPago = tipo.options[tipo.selectedIndex].value;
        document.getElementById('formPago')?.remove();
        let contenedor = document.getElementById('container') as Element;
        contenedor.innerHTML = ``;

        let buttonVolver = document.createElement('button');
        buttonVolver.className = 'btn btn-primary';
        buttonVolver.id = 'buttonVolver';
        buttonVolver.onclick = () => { redirect(); }
        buttonVolver.innerHTML = 'Volver';
        contenedor.appendChild(buttonVolver);

        let buttonFinalizar = document.createElement('button');
        buttonFinalizar.className = 'btn btn-primary';
        buttonFinalizar.id = 'buttonFinalizar';
        buttonFinalizar.onclick = () => { finalizarPedido(); }
        buttonFinalizar.innerHTML = 'Confirmar pago';
        let form = document.createElement('form');
        form.id = 'formPago';
        form.className = 'form-group';

        switch (tipoPago){
            case("tarjeta"):
                form.innerHTML = ` <label for="numeroTarjeta">Numero de tarjeta</label>
                                    <input type="text" class="form-control" id="numeroTarjeta" placeholder="Numero de tarjeta">
                                    <br>
                                    <label for="fechaCaducidad">Fecha de caducidad</label>
                                    <input type="text" class="form-control" id="fechaCaducidad" placeholder="Fecha de caducidad">
                                    <br>
                                    <label for="codigoSeguridad">Codigo de seguridad</label>
                                    <input type="text" class="form-control" id="codigoSeguridad" placeholder="Codigo de seguridad">
                                    <br>`;
                break;

            case("paypal"):
                form.innerHTML = `<div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                        <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu correo electrónico con nadie más.</small>
                                        <br><br>
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                                        </div>`;
                break;

            case("transferencia"):
                form.innerHTML = ` <label for="numeroCuenta">Numero de cuenta</label>
                                    <input type="text" class="form-control" id="numeroCuenta" placeholder="Numero de cuenta">
                                    <br/>`;

                break;
        }
        contenedor.appendChild(form);
        contenedor.appendChild(buttonFinalizar);
    }

    function redirect(){
        //window.location.href = '/#/pago';
        window.location.reload();
    }

    async function finalizarPedido() {
        localStorage.setItem("listaCarrito", "");
        document.getElementById('formPago')?.remove();
        let contenedor = document.getElementById('container') as Element;
        contenedor.innerHTML = "<h4>Pedido realizado con éxito</h4>";
        contenedor.innerHTML += "<a href='/#/catalogo'>Seguir comprando</a>"

        // guardar pedido
        let precio = getPrecioTotal();
        let order: Order = {
            carrito: listaCarrito,
            precio: Number(precio)
        }
        await saveOrder(order);
    }
    
    if(log){
        return (
            <>
                <h2 id="tituloPago">Trámite del pago</h2>
                <Card style={{ width: '18rem' }} id="detalles">
                    <Card.Header>Pedido</Card.Header>
                    <ListGroup variant="flush">
                        {listaCarrito.map(carrito => (
                            <ListGroup.Item>{carrito.producto.nombre}:     {Number(carrito.unidades*carrito.producto.precio).toFixed(2)} €</ListGroup.Item>
                        ))}
                        <ListGroup.Item>Precio de envio:    {getPrecioEnvio()} €</ListGroup.Item>
                        <ListGroup.Item>Total:    {getPrecioTotal()} €</ListGroup.Item>
                        <ListGroup.Item>Entrega: {getDeliveryTerm()}</ListGroup.Item>
                    </ListGroup>
                </Card>

                <div id='container'>
                    <Form id="tipoPago">
                        <Form.Label className="labelTipoPago">Elige el tipo de pago:</Form.Label>
                        <Form.Select  id="selectTipo" aria-label="Elige el tipo de pago">
                            <option value="tarjeta">Tarjeta</option>
                            <option value="paypal">PayPal</option>
                            <option value="transferencia">Transferencia bancaria</option>
                        </Form.Select>
                        <br/>
                        <Button id="formButton" type="button" onClick={mostarDatosPago}>Siguiente</Button>
                    </Form>

                </div>
                <hr></hr>
                <Footer/>
            </>
        );
    }else{
        return(
            <ErrorPage msg="Debes iniciar sesión para poder acceder"/>
        );
    }

}
export default ConfirmacionPago;