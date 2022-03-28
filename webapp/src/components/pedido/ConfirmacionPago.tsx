import Form from 'react-bootstrap/Form'
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';

function ConfirmacionPago (): JSX.Element{


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

}
export default ConfirmacionPago;