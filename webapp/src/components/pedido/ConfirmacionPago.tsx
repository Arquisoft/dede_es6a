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
import toast from 'react-hot-toast';

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

    let pago: string = "error";

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
        buttonFinalizar.innerHTML = 'Confirmar pago';
        let form = document.createElement('form');
        form.id = 'formPago';
        form.className = 'form-group';

        switch (tipoPago){
            case("tarjeta"):
                form.innerHTML = ` <label for="numeroTarjeta">Numero de tarjeta</label>
                                    <input type="text" class="form-control" id="numeroTarjeta" maxlength="16" placeholder="Introduce el número de tarjeta (16 caracteres)" name="numeroTarjeta">
                                    <br>
                                    <label for="fechaCaducidad">Fecha de caducidad</label>
                                    <input type="date" class="form-control" id="fechaCaducidad" placeholder="Introduce la fecha de caducidad" name="fecha">
                                    <br>
                                    <label for="codigoSeguridad">Codigo de seguridad</label>
                                    <input type="text" class="form-control" id="codigoSeguridad" maxlength="3" placeholder="Introduce el codigo de seguridad" name="code">
                                    <br>`;
                buttonFinalizar.onclick = () => { comprobaciones("tarjeta"); }
                break;

            case("paypal"):
                form.innerHTML = `<div class="form-group">
                                        <label for="exampleInputEmail1">Correo electrónico</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Introduce el correo" name="email">
                                        <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu correo electrónico con nadie más.</small>
                                        <br><br>
                                        <label for="exampleInputPassword1">Contraseña</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Introduce tu contraseña (mínimo 5 caracteres)" name="password">
                                        </div>`;
                buttonFinalizar.onclick = () => { comprobaciones("paypal"); }
                break;

            case("transferencia"):
                form.innerHTML = ` <label for="numeroCuenta">Número de cuenta</label>
                                    <input type="text" class="form-control" id="numeroCuenta" maxlength="20" placeholder="Introduce el número de cuenta (20 caracteres)" name="numeroCuenta">
                                    <br/>`;

                buttonFinalizar.onclick = () => { comprobaciones("transferencia"); }
                break;
        }
        contenedor.appendChild(form);
        contenedor.appendChild(buttonFinalizar);
    }

    function redirect(){
        window.location.reload();
    }

    function comprobaciones(str:string){
        if(str == "tarjeta"){
            const numeroTarjetaElemento :HTMLInputElement  = document.querySelector("input[name='numeroTarjeta']") as HTMLInputElement;
            let numeroTarjeta = numeroTarjetaElemento.value;
            const fechaElemento :HTMLInputElement  = document.querySelector("input[name='fecha']") as HTMLInputElement;
            let fecha = fechaElemento.value;
            const codigoSeguridadElemento :HTMLInputElement  = document.querySelector("input[name='code']") as HTMLInputElement;
            let codigoSeguridad = codigoSeguridadElemento.value;

            if(codigoSeguridad == ""  && numeroTarjeta == "" && fecha == "")
                toast.error("Todos los campos estan vacíos", {duration:3500});
            else if(numeroTarjeta == "" || numeroTarjeta == null || numeroTarjeta == undefined || numeroTarjeta.length != 16 || isNaN(Number(numeroTarjeta)))
                toast.error('Número de la tarjeta inválido', {duration:3500})
            else if(fecha == "" || fecha == null || fecha == undefined || fecha.length != 10)
                toast.error('Fecha inválida', {duration:3500})
            else if(codigoSeguridad == "" || codigoSeguridad == null || codigoSeguridad == undefined || codigoSeguridad.length != 3 || isNaN(Number(codigoSeguridad)))
                toast.error('Código de seguridad inválido', {duration:3500})
            else
                finalizarPedido();
        } else if(str == "paypal"){
            const emailElemento :HTMLInputElement  = document.querySelector("input[name='email']") as HTMLInputElement;
            let email = emailElemento.value;
            const passwordElemento :HTMLInputElement  = document.querySelector("input[name='password']") as HTMLInputElement;
            let password = passwordElemento.value;

            if(email == "" && password == "")
                toast.error("Ambos campos vacíos", {duration:3500})
            else if(email == "" || email == null || email == undefined || email.length < 5 || !validarEmail(email))
                toast.error('Email inválido', {duration:3500})
            else if(password == "" || password == null || password == undefined || password.length < 5)
                toast.error('Contraseña inválida', {duration:3500})
            else
                finalizarPedido();
        } else if(str == "transferencia"){
            const numeroCuentaElemento :HTMLInputElement  = document.querySelector("input[name='numeroCuenta']") as HTMLInputElement;
            let numeroCuenta = numeroCuentaElemento.value;
            if(numeroCuenta == "" || numeroCuenta == null || numeroCuenta == undefined || numeroCuenta.length != 20 || isNaN(Number(numeroCuenta)))
                toast.error('Número de la cuenta inválido', {duration:3500})
            else
                finalizarPedido();
        }
    }

    function validarEmail(email:string){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
                        <Form.Label id="labelSelectTipo" className="labelTipoPago">Elige el tipo de pago:</Form.Label>
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

function Character(Character: any, isDigit: any) {
    throw new Error('Function not implemented.');
}
function isDigit(Character: (Character: any, isDigit: any) => void, isDigit: any) {
    throw new Error('Function not implemented.');
}

