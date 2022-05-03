import {ListaCarrito, DataOrder, Order} from '../../shared/shareddtypes';
import toast from 'react-hot-toast';

import {createOrder, isLogged, saveOrder} from '../../api/api';
export  function getPrecioEnvio(order:any):number {
    if(order !== undefined){
        return order["rates"][0]["amount"];
    }
    return 0;
}


export  function getPrecioTotal(order:any, listaCarrito:any): string {
    return (Number(getPrecio(listaCarrito))+ Number(getPrecioEnvio(order))).toFixed(2);
}


export  function getDeliveryTerm(order:any): string {
    if(order !== undefined){
        return order["rates"][0]["duration_terms"]
    }
    return "no disponible";
}

function getPrecio(listaCarrito:any): string {
    let precioTotal: number = 0;
    listaCarrito.forEach( (elem:any, i:any) => {
        precioTotal += listaCarrito[i].producto.precio * listaCarrito[i].unidades
    });
    return precioTotal.toFixed(2);
}

export async function finalizarPedido(order:any, listaCarrito:any) {
    localStorage.setItem("listaCarrito", "");
    document.getElementById('formPago')?.remove();
    let contenedor = document.getElementById('container') as Element;
    contenedor.innerHTML = "<h4>Pedido realizado con éxito</h4>";
    contenedor.innerHTML += "<a href='/catalogo'>Seguir comprando</a>"

    // guardar pedido
    let precio = getPrecioTotal(order, listaCarrito);
    let orderr: Order = {
        carrito: listaCarrito,
        precio: Number(precio)
    }
    await saveOrder(orderr);
}


function redirect(){
    window.location.reload();
}


export function mostarDatosPago(order: any, listaCarrito:any) {
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
            buttonFinalizar.onclick = () => { comprobaciones("tarjeta", order, listaCarrito); }
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
            buttonFinalizar.onclick = () => { comprobaciones("paypal", order, listaCarrito); }
            break;

        case("transferencia"):
            form.innerHTML = ` <label for="numeroCuenta">Número de cuenta</label>
                                <input type="text" class="form-control" id="numeroCuenta" maxlength="20" placeholder="Introduce el número de cuenta (20 caracteres)" name="numeroCuenta">
                                <br/>`;

            buttonFinalizar.onclick = () => { comprobaciones("transferencia", order, listaCarrito); }
            break;
    }
    contenedor.appendChild(form);
    contenedor.appendChild(buttonFinalizar);
}

function comprobaciones(str:string, order:any, listaCarrito:any){
    if(str === "tarjeta"){
        const numeroTarjetaElemento :HTMLInputElement  = document.querySelector("input[name='numeroTarjeta']") as HTMLInputElement;
        let numeroTarjeta = numeroTarjetaElemento.value;
        const fechaElemento :HTMLInputElement  = document.querySelector("input[name='fecha']") as HTMLInputElement;
        let fecha = fechaElemento.value;
        const codigoSeguridadElemento :HTMLInputElement  = document.querySelector("input[name='code']") as HTMLInputElement;
        let codigoSeguridad = codigoSeguridadElemento.value;

        if(codigoSeguridad === ""  && numeroTarjeta === "" && fecha === "")
            toast.error("Todos los campos estan vacíos", {duration:3500});
        else if(numeroTarjeta === "" || numeroTarjeta === null || numeroTarjeta === undefined || numeroTarjeta.length !== 16 || isNaN(Number(numeroTarjeta)))
            toast.error('Número de la tarjeta inválido', {duration:3500})
        else if(fecha === "" || fecha === null || fecha === undefined || fecha.length !== 10)
            toast.error('Fecha inválida', {duration:3500})
        else if(codigoSeguridad === "" || codigoSeguridad === null || codigoSeguridad === undefined || codigoSeguridad.length !== 3 || isNaN(Number(codigoSeguridad)))
            toast.error('Código de seguridad inválido', {duration:3500})
        else
            finalizarPedido(order, listaCarrito);
    } else if(str === "paypal"){
        const emailElemento :HTMLInputElement  = document.querySelector("input[name='email']") as HTMLInputElement;
        let email = emailElemento.value;
        const passwordElemento :HTMLInputElement  = document.querySelector("input[name='password']") as HTMLInputElement;
        let password = passwordElemento.value;

        if(email === "" && password === "")
            toast.error("Ambos campos vacíos", {duration:3500})
        else if(email === "" || email === null || email === undefined || email.length < 5 || !validarEmail(email))
            toast.error('Email inválido', {duration:3500})
        else if(password === "" || password === null || password === undefined || password.length < 5)
            toast.error('Contraseña inválida', {duration:3500})
        else
            finalizarPedido(order, listaCarrito);
    } else if(str === "transferencia"){
        const numeroCuentaElemento :HTMLInputElement  = document.querySelector("input[name='numeroCuenta']") as HTMLInputElement;
        let numeroCuenta = numeroCuentaElemento.value;
        if(numeroCuenta === "" || numeroCuenta === null || numeroCuenta === undefined || numeroCuenta.length !== 20 || isNaN(Number(numeroCuenta)))
            toast.error('Número de la cuenta inválido', {duration:3500})
        else
            finalizarPedido(order, listaCarrito);
    }
}


    function validarEmail(email:string){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
