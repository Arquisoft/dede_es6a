import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddProducts.css';
import {addProduct} from '../../../api/api';
import {Product} from '../../../shared/shareddtypes';

export default function(){

    const enviar = () => {
        const nombre:HTMLInputElement  = document.querySelector("input[name='name']") as HTMLInputElement;
        const marca: HTMLInputElement = document.querySelector("input[name='brand']") as HTMLInputElement;
        const precio: HTMLInputElement = document.querySelector("input[name='price']") as HTMLInputElement;
        const cat: HTMLInputElement = document.querySelector("input[name='cat']") as HTMLInputElement;
        const descr: HTMLInputElement = document.querySelector("input[name='descr']") as HTMLInputElement;
        let n:string ='',m:string='',p:number=0.0,c:string='',d:string='';  
        if(nombre)
            n = nombre.value as string;
        if(marca)
            m = marca.value as string;
        if(precio)
            p = Number.parseFloat( precio.value );
        if(cat)
            c = cat.value as string;
        if(descr)
            d = descr.value as string;
        const product:Product = {'nombre':n,'marca':m,'precio':p,'categoria':c,'descripcion':d};
        addProduct(product);
    }

    return(
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

    );
}