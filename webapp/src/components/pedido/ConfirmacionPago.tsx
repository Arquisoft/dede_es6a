import Form from 'react-bootstrap/Form'
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import {createOrder, isLogged} from '../../api/api';
import {isLoggedType} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import ErrorPage from '../ErrorPage';

function ConfirmacionPago (): JSX.Element{  

    //const order = createOrder();
    //console.log(order);


    const [log,setIsLogged] = useState<isLoggedType>();
    const refreshIsLogged = async () => {
        setIsLogged(await isLogged());
    }
    useEffect(()=>{ refreshIsLogged(); }, []);
    
    if(log?.logged){
        return (
            <>
            <h2 id="tituloPago">Trámite del pago</h2>
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
                
                <Button id="formButton" type="button" >PAGAR</Button>
            </Form>

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