import './ConfirmacionEdad.css';
import { useNavigate } from 'react-router-dom';
import pezDisimulando from '../images/pezDisimulando.png';
import pezContento from '../images/pezContento.png';
import pezEnfadado from '../images/pezEnfadado.png';

function ConfirmacionEdad() {

    let navigate = useNavigate();
    const goToProducts = () => navigate("/catalogo");
    const leavePage = () => window.open("https://www.toysrus.es/", "_self");

    function showHappyFish(){
        let fishImage = document.getElementById("fishImage") as HTMLImageElement;
        fishImage.src = pezContento;
    }

    function showAngryFish(){
        let fishImage = document.getElementById("fishImage") as HTMLImageElement;
        fishImage.src = pezEnfadado;
    }

    function showDefaultFish(){
        let fishImage = document.getElementById("fishImage") as HTMLImageElement;
        fishImage.src = pezDisimulando;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img id="fishImage" src={pezDisimulando} alt="logo" />
                <div>
                    <button 
                    id = "botonSi"
                    onClick={goToProducts} 
                    onMouseEnter={showHappyFish}
                    onMouseLeave={showDefaultFish}
                    className="botonRespuesta">Sí</button>
                    <button 
                    onClick={leavePage} 
                    onMouseEnter={showAngryFish}
                    onMouseLeave={showDefaultFish}
                    className="botonRespuesta">No</button>
                </div>
            </header>
        </div>
    );
}

export default ConfirmacionEdad;

