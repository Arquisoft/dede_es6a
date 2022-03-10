import './ConfirmacionEdad.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import logo from '../logo.svg';

function ConfirmacionEdad() {

    let navigate = useNavigate();
    const goToProducts = () => navigate("/products");
    const leavePage = () => window.open("https://www.toysrus.es/", "_self");

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    {/* Botón de aceptar */}
                    <Button color='dark' size='lg' className='m-2' onClick={goToProducts}>Sí</Button>
                    {/* Botón de rechazar */}
                    <Button color='dark' size='lg' className='m-2'onClick={leavePage}>No</Button>
                </div>
            </header>
        </div>
    );
}

export default ConfirmacionEdad;

