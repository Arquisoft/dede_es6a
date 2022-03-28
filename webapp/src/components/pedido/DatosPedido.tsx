import Footer from '../Footer';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ConfirmacionPago from './ConfirmacionPago';
//import {getUserData, setUserData} from '../../api/api';
import {PersonalData} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Input } from 'reactstrap';

function DatosPedido (): JSX.Element{

    
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
            <Button id="formButton" type="button">guardar datos</Button>
        </Form>
        <br></br>
        <ConfirmacionPago/ >
        <hr></hr>
        <Footer/>
      </>
    );

}
export default DatosPedido;