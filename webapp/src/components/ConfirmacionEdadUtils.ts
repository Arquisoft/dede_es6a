import pezDisimulando from '../images/pezDisimulando.png';
import pezContento from '../images/pezContento.png';
import pezEnfadado from '../images/pezEnfadado.png';

export const goToProducts = () => {
    document.getElementById('catalogo')?.click();
};
export const leavePage = () => window.open("https://www.toysrus.es/", "_self");

export function showHappyFish(){
    let fishImage = document.getElementById("fishImage") as HTMLImageElement;
    fishImage.src = pezContento;
}

export function showAngryFish(){
    let fishImage = document.getElementById("fishImage") as HTMLImageElement;
    fishImage.src = pezEnfadado;
}

export function showDefaultFish(){
    let fishImage = document.getElementById("fishImage") as HTMLImageElement;
    fishImage.src = pezDisimulando;
}