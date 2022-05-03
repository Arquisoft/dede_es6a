import './ConfirmacionEdad.css';
import {goToProducts, leavePage, showAngryFish, showDefaultFish, showHappyFish} from './ConfirmacionEdadUtils';
import pezDisimulando from '../images/pezDisimulando.png';

function ConfirmacionEdad() {

    return (
        <div className="App">
            <header className="App-header divConfirmacionEdad">
                <img id="fishImage" src={pezDisimulando} alt="logo" />
                <div>
                    <button 
                    id = "botonSi"
                    data-testid='boton-si'
                    onClick={goToProducts} 
                    onMouseEnter={showHappyFish}
                    onMouseLeave={showDefaultFish}
                    className="botonRespuesta">Sí</button>
                    <button 
                    onClick={leavePage} 
                    data-testid='boton-no'
                    onMouseEnter={showAngryFish}
                    onMouseLeave={showDefaultFish}
                    className="botonRespuesta">No</button>
                </div>
                <a href='/catalogo' id='catalogo' hidden>content</a>
            </header>
        </div>
    );
}

export default ConfirmacionEdad;

