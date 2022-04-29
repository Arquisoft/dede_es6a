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
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255946/juan_vxrndv.png' 
                    descr='texto ejemplo :D'
                    />
                <Developer 
                    name='Diego Garcia Quiros' 
                    email='uo@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255945/diego_rukkyl.png' 
                    descr='texto ejemplo'
                    />
                <Developer 
                    name='Daniel Machado Sanchez' 
                    email='uo@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255944/perfil-default_xegqfy.jpg' 
                    descr='texto ejemplo'
                    />
                <Developer 
                    name='David Maldonado Álvarez' 
                    email='uo@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255944/perfil-default_xegqfy.jpg' 
                    descr='texto ejemplo'
                    />    
                <Developer 
                    name='Oscar' 
                    email='uo@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255944/perfil-default_xegqfy.jpg' 
                    descr='texto ejemplo'
                    />  
            </div>

      </>
    );

}
