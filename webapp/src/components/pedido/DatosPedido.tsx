import Footer from '../Footer';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {DataOrder} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { ListaCarrito } from '../../shared/shareddtypes';
import './DatosPedido.css';
import ErrorPage from '../ErrorPage';
import {isLoggedType} from '../../shared/shareddtypes';
import {isLogged} from '../../api/api';
import toast from 'react-hot-toast';
import {
    getSolidDataset, getStringNoLocale, getThing, Thing, getUrl,
    saveSolidDatasetAt, createSolidDataset, buildThing, createThing,
    setThing, addStringNoLocale, addUrl, saveSolidDatasetInContainer, getUrlAll
} from "@inrupt/solid-client";
import { handleIncomingRedirect, login, fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { SCHEMA_INRUPT, RDF, AS, FOAF, VCARD } from "@inrupt/vocab-common-rdf";

type DatosPedido = {
    
}

const DatosPedido: React.FC<DatosPedido> = () => {

    let sessionCart = localStorage.getItem("listaCarrito");
    let listaCarrito:ListaCarrito[] = [];
    if(sessionCart)
        listaCarrito = JSON.parse(sessionCart);
         
    const [log,setIsLogged] = useState<boolean>();
    const refreshIsLogged =  () => {
        setIsLogged( isLogged());
    }
    useEffect(()=>{ refreshIsLogged(); }, []);

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
        let checkbox = document.getElementById('solid') as HTMLInputElement;
        if(checkbox && checkbox.checked){
            saveOnPod(order.email, order.city, order.street, order.zipcode);
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

    const saveOnPod = async (email:string, city:string, street:string, zipcode:string) => {
        await handleIncomingRedirect();
        if (!getDefaultSession().info.isLoggedIn) {
            await login({
              oidcIssuer: "https://broker.pod.inrupt.com",
              redirectUrl: window.location.href,
              clientName: "My application"
            });
        }
        let courseSolidDataset = createSolidDataset();
        let data = buildThing(createThing({name: 'data'}))
            .build();
            data = addStringNoLocale(data, SCHEMA_INRUPT.email, email);
            data = addStringNoLocale(data, SCHEMA_INRUPT.PostalAddress, street);
            data = addStringNoLocale(data, SCHEMA_INRUPT.postalCode, zipcode);
            data = addStringNoLocale(data, SCHEMA_INRUPT.addressLocality, city);
        courseSolidDataset = setThing(courseSolidDataset, data);
        let element = document.getElementById('url') as HTMLInputElement;
        await saveSolidDatasetInContainer(
            element.value,
            courseSolidDataset, {
            fetch: fetch
        });
    }

    const getDataFromPod = async function(){
        await handleIncomingRedirect();
        if (!getDefaultSession().info.isLoggedIn) {
            await login({
              oidcIssuer: "https://broker.pod.inrupt.com",
              redirectUrl: window.location.href,
              clientName: "My application"
            });
        }
        let element = document.getElementById('url') as HTMLInputElement;
        try{
            let myDataset = await getSolidDataset(element.value+"a37c0a84-568d-42ff-b44d-21647322b913", { fetch: fetch });
            const profile = getThing( myDataset, element.value+"a37c0a84-568d-42ff-b44d-21647322b913#data");
            const email: HTMLInputElement = document.querySelector("input[name='email']") as HTMLInputElement;
            const city: HTMLInputElement = document.querySelector("input[name='city']") as HTMLInputElement;
            const street: HTMLInputElement = document.querySelector("input[name='street']") as HTMLInputElement;
            const zipcode: HTMLInputElement = document.querySelector("input[name='zipcode']") as HTMLInputElement;
            email.value = getStringNoLocale(profile as Thing, SCHEMA_INRUPT.email) as string;
            city.value =  getStringNoLocale(profile as Thing, SCHEMA_INRUPT.addressLocality) as string;
            street.value = getStringNoLocale(profile as Thing, SCHEMA_INRUPT.PostalAddress) as string;
            zipcode.value = getStringNoLocale(profile as Thing, SCHEMA_INRUPT.postalCode) as string;
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
                    <Form.Control className="inputPago" type="text" placeholder="name" name="name"/>
                </Form.Group>
                <Form.Group controlId="apellidos">
                    <Form.Control className="inputPago" type="text" placeholder="lastname" name="lastname"/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Control className="inputPago" type="text" placeholder="email" name="email"/>
                </Form.Group>
                <Form.Group  controlId="city">
                    <Form.Control className="inputPago" type="text" placeholder="city" name="city"/>
                </Form.Group>
                <Form.Group controlId="street">
                    <Form.Control className="inputPago" type="text" placeholder="street" name="street"/>
                </Form.Group>
                <Form.Group controlId="zipcode">
                    <Form.Control className="inputPago" type="text" placeholder="zipcode" name="zipcode"/>
                </Form.Group>
                <Form.Group className="mb-3" id='checkbox' controlId="formBasicCheckbox">
                    <Form.Check id='solid' type="checkbox" label="Guardar datos con solid" />
                    <Form.Control className="inputPago" id='url' type="url" placeholder="pod url" name="podurl"/>
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
                                <Card.Img variant="top" src={carrito.producto.nombre+".jpg"} />
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