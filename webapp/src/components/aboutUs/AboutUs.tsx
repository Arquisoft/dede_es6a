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
            <h1>About us</h1>
            <div id='cards'>
                <Developer 
                    name='Juan Mera Menendez' 
                    email='Uo277406@uniovi.es' 
                    img='../juan.png' 
                    descr='texto ejemplo :D'
                    />
                <Developer 
                    name='Diego Garcia Quiros' 
                    email='uo@uniovi.es' 
                    img='../diego.png' 
                    descr='texto ejemplo'
                    />
                <Developer 
                    name='Daniel Machado Sanchez' 
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
                    name='Oscar' 
                    email='uo@uniovi.es' 
                    img='../perfil-default.jpg' 
                    descr='texto ejemplo'
                    />  
            </div>

      </>
    );

}
