import Footer from '../Footer';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ConfirmacionPago from './ConfirmacionPago';
//import {getUserData, setUserData} from '../../api/api';
import {PersonalData} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Input } from 'reactstrap';
import { ListaCarrito } from '../../shared/shareddtypes';
import './DatosPedido.css';
import ErrorPage from '../ErrorPage';
import {isLoggedType} from '../../shared/shareddtypes';
import {isLogged} from '../../api/api';

type DatosPedido = {
    listaCarrito: ListaCarrito[];
  }

const DatosPedido: React.FC<DatosPedido> = ({listaCarrito}) => {
    const sessionCart = localStorage.getItem("listaCarrito");
    if (sessionCart)
        listaCarrito = JSON.parse(sessionCart);
    
    const [log,setIsLogged] = useState<isLoggedType>();
    const refreshIsLogged = async () => {
        setIsLogged(await isLogged());
    }
    useEffect(()=>{ refreshIsLogged(); }, []);

    if(log?.logged){
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
                <Button id="formButton" type="button" href='/pago'>Siguiente</Button>
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
                            </Card.Body>
                        </Card>
                    ))}
                </div>
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