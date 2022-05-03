import './ConfirmacionEdad.css';
import pezDisimulando from '../images/pezDisimulando.png';
import pezContento from '../images/pezContento.png';
import pezEnfadado from '../images/pezEnfadado.png';

function ConfirmacionEdad() {

    const goToProducts = () => {
        document.getElementById('catalogo')?.click();
    };
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
            <header className="App-header divConfirmacionEdad">
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
                <a href='/catalogo' id='catalogo' hidden>content</a>
            </header>
        </div>
    );
}

export default ConfirmacionEdad;

