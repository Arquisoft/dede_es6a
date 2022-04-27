import BarraNavegacion from '../BarraNavegacion';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import './aboutUs.css';
import Developer from './Developer';

export default function(){

    return (
        <>
            <BarraNavegacion />
            <h1>Sobre nosotros</h1>
            <div id='cards'>
                <Developer 
                    name='Juan Mera Menéndez' 
                    email='Uo277406@uniovi.es' 
                    img='../juan.png' 
                    descr='texto ejemplo :D'
                    />
                <Developer 
                    name='Diego García Quirós' 
                    email='UO276688@uniovi.es' 
                    img='../diego.png' 
                    descr='texto ejemplo'
                    />
                <Developer 
                    name='Daniel Machado Sánchez' 
                    email='uo@uniovi.es' 
                    img='../perfil-default.jpg' 
                    descr='texto ejemplo'
                    />
                <Developer 
                    name='David Maldonado Álvarez' 
                    email='uo@uniovi.es' 
                    img='../perfil-default.jpg' 
                    descr='texto ejemplo'
                    />    
                <Developer 
                    name='Oscar López González' 
                    email='uo@uniovi.es' 
                    img='../perfil-default.jpg' 
                    descr='texto ejemplo'
                    />  
            </div>
      </>
    );
}
