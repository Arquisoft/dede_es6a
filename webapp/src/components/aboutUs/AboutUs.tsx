import BarraNavegacion from '../BarraNavegacion';
import './aboutUs.css';
import Developer from './Developer';

export  default  function AboutUs() {

    return (
        <>
            <BarraNavegacion />
            <h1>Sobre nosotros</h1>
            <div id='cards'>
                <Developer 
                    name='Juan Mera Menéndez' 
                    email='UO277406@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255946/juan_vxrndv.png' 
                    descr=''
                    />
                <Developer 
                    name='Diego García Quirós'
                    email='UO276688@uniovi.es'
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651255945/diego_rukkyl.png'
                    descr=''
                    />
                <Developer 
                    name='Daniel Machado Sánchez' 
                    email='UO276257@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651484429/dani_zgiji9.jpg' 
                    descr=''
                    />
                <Developer 
                    name='David Maldonado Álvarez' 
                    email='UO259893@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651484549/90855360_lxlbn2.jpg' 
                    descr=''
                    />    
                <Developer 
                    name='Oscar López González' 
                    email='UO269489@uniovi.es' 
                    img='https://res.cloudinary.com/dnuyp5afa/image/upload/v1651484550/foto-dni_upx8go.png' 
                    descr=''
                    />  
            </div>

      </>
    );
}
