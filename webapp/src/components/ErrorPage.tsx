
import BarraNavegacion from './BarraNavegacion';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


type ErrorPageType = {
    msg: string;
}

const ErrorPage: React.FC<ErrorPageType> = ({msg}) => {
    
    return(
        <>
        <BarraNavegacion />
        <Alert variant="danger" onClose={() => {document.getElementById('volver')?.click()}} dismissible>
        <Alert.Heading>Oh vaya! {msg}</Alert.Heading>
            <p>
            Te recomendamos que compres larios nuestra mejor ginebra al precio mas competitivo ;D
            </p>
        </Alert>
        <Button variant="success" id='volver' href='/catalogo'>Volver</Button>{' '}
        </>
    );
}
export default ErrorPage;