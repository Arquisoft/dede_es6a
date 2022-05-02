import Footer from '../Footer';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {DataOrder} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ListaCarrito } from '../../shared/shareddtypes';
import './DatosPedido.css';
import ErrorPage from '../ErrorPage';
import {isLoggedType} from '../../shared/shareddtypes';
import {isLogged} from '../../api/api';
import toast from 'react-hot-toast';
import { handleIncomingRedirect, login, fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { SCHEMA_INRUPT, RDF, AS, FOAF, VCARD } from "@inrupt/vocab-common-rdf";
import {getAddressesFromPod} from './SolidUtils';

type DatosPedido = {
    
}

const DatosPedido: React.FC<DatosPedido> = () => {

    const [direcciones,setDirecciones] = useState<String[]>([]);

    let sessionCart = localStorage.getItem("listaCarrito");
    let listaCarrito:ListaCarrito[] = [];
    if(sessionCart)
        listaCarrito = JSON.parse(sessionCart);
    const [log,setIsLogged] = useState<boolean>();
    const refreshIsLogged =  () => {
        setIsLogged( isLogged());
    }
    useEffect(()=>{ refreshIsLogged(); loadStreets();}, []);

    function getPrecioTotal(): string {
        let precioTotal: number = 0;
        listaCarrito.forEach( (elem, i) => {
            precioTotal += listaCarrito[i].producto.precio * listaCarrito[i].unidades
        });
        let number:string = Number(precioTotal).toFixed(2);
        return number;
    }

    const saveData = () => {
        const nombre:HTMLInputElement  = document.querySelector("input[name='name']") as HTMLInputElement;
        const apellido: HTMLInputElement = document.querySelector("input[name='lastname']") as HTMLInputElement;
        const email: HTMLInputElement = document.querySelector("input[name='email']") as HTMLInputElement;
        const city: HTMLInputElement = document.querySelector("input[name='city']") as HTMLInputElement;
        const street: HTMLInputElement = document.querySelector("input[name='street']") as HTMLInputElement;
        const zipcode: HTMLInputElement = document.querySelector("input[name='zipcode']") as HTMLInputElement;
        let order:DataOrder = {
            name: nombre.value,
            lastname: apellido.value,
            email: email.value,
            city: city.value,
            street: street.value,
            zipcode: zipcode.value
        }

        let radio = document.querySelector('*[name=dir]:checked');
        if(radio){
           let label = document.querySelector("label[for='"+ radio.id +"']");
           if(label){
                let value = label.textContent;
                if(value){
                    let v = value.split(',');
                    order.city = v[1];
                    order.street = v[0];
                    order.zipcode = v[3];
                }
           }
        }
        if(order.city != "" && order.street != "" && order.zipcode != ""){
            localStorage.setItem("order",  JSON.stringify(order));
            toast.loading('procesando envio',{duration:4000});
            setTimeout(() => {
                (document.getElementById("pago") as HTMLAnchorElement).click();
            }, 4100);
        }else
            toast.error('calle, ciudad o código postal vacios', {duration:3500})
        
    }

    const loadStreets = () => {
        let direcciones = localStorage.getItem('direcciones');
        if ( direcciones != null ){
            let dirArray = direcciones.split('$');
            dirArray.pop();
            setDirecciones(dirArray);
        }
    }

    const getDataFromPod = async function(){
        await handleIncomingRedirect();
        if (!getDefaultSession().info.isLoggedIn) {
            await login({
              oidcIssuer: "https://inrupt.net/",
              redirectUrl: window.location.href,
              clientName: "dede-es6a"
            });
        }
        let element = document.getElementById('url') as HTMLInputElement;
        try{
            let dir:String = await getAddressesFromPod(element.value);
            let dirArray = dir.split('$');
            dirArray.pop();
            setDirecciones( dirArray );
        }catch(error){
            toast.error('url no valida', {duration: 3500});
        }
    }

    if(log){
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
                    <Form.Control className="inputPago" type="text" placeholder="Email" name="email"/>
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
                    <Button id="formButton" type="button" onClick={getDataFromPod}>Cargar</Button>
                </Form.Group>
                <Button id="formButton" type="button" onClick={saveData}>Siguiente</Button>
                <a href='/pago' id='pago' hidden></a>
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
                <h4 id='titulo-resumen'>Precio del pedido: {getPrecioTotal() + " €"}</h4>
            </div>

            <Footer/>
        </>
        );
    }else{
        return (
            <ErrorPage msg="Debes iniciar sesión para poder acceder"/>
        );
    }

}
export default DatosPedido;