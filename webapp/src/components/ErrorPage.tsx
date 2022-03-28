
import BarraNavegacion from './BarraNavegacion';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function(){
    
    return(
        <>
        <BarraNavegacion />
        <Alert variant="danger" onClose={() => {document.getElementById('volver')?.click()}} dismissible>
        <Alert.Heading>Oh vaya! No cuentas con los permisos necesarios para entrar aqui!</Alert.Heading>
            <p>
            Te recomendamos que compres larios nuestra mejor ginebra al precio mas competitivo ;D
            </p>
        </Alert>
        <Button variant="success" id='volver' href='/catalogo'>Volver</Button>{' '}
        </>
    );
}