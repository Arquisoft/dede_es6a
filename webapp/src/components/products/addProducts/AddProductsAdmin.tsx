import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddProducts.css';
import BarraNavegacion from '../../BarraNavegacion';

import {enviar} from './AddProductsUtils';

export default function AddProducts(){

   
        return(
            <>
            <BarraNavegacion />
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" name='name'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBrand">
                    <Form.Label>Marca del producto</Form.Label>
                    <Form.Control type="text" placeholder="Marca" name='brand'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" placeholder="Precio" name='price'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCat">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control type="text" placeholder="Categoria" name='cat'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescrip">
                    <Form.Label>Descripcion del producto</Form.Label>
                    <Form.Control type="text" placeholder="Descripcion" name='descr'/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={enviar}>Crear</Button>
            </Form>
            </>
        );
   
}