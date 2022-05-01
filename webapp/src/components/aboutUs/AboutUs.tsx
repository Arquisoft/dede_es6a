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
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255946/juan_vxrndv.png'
                    descr='texto ejemplo :D'
                    />
                <Developer 
                    name='Diego García Quirós'
                    email='UO276688@uniovi.es'
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255945/diego_rukkyl.png'
                    descr=''
                    />
                <Developer 
                    name='Daniel Machado Sanchez' 
                    email='UO276257@uniovi.es'
                    img='../dani.png'
                    descr=''
                    />
                <Developer 
                    name='David Maldonado Álvarez' 
                    email='uo@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255944/perfil-default_xegqfy.jpg'
                    descr='texto ejemplo'
                    />    
                <Developer 
                    name='Oscar López González'
                    email='uo@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255944/perfil-default_xegqfy.jpg'
                    descr='texto ejemplo'
                    />  
            </div>

      </>
    );

}
