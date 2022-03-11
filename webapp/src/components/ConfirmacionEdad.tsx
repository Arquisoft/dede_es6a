import './ConfirmacionEdad.css';
import { useNavigate } from 'react-router-dom';
import pez from '../images/pez.png';

function ConfirmacionEdad() {

    let navigate = useNavigate();
    const goToProducts = () => navigate("/products");
    const leavePage = () => window.open("https://www.toysrus.es/", "_self");

    return (
        <div className="App">
            <header className="App-header">
                <img src={pez} alt="logo" />
                <div>
                    <button onClick={goToProducts} className="botonRespuesta">Sí</button>
                    <button onClick={leavePage} className="botonRespuesta">No</button>
                </div>
            </header>
        </div>
    );
}

export default ConfirmacionEdad;

