
import {DataOrder} from '../../shared/shareddtypes';
import './DatosPedido.css';
import toast from 'react-hot-toast';
import { ListaCarrito } from '../../shared/shareddtypes';
import { handleIncomingRedirect, login, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import {getAddressesFromPod} from './SolidUtils';


export const saveData = () => {
    const nombre:HTMLInputElement  = document.querySelector("input[name='name']") as HTMLInputElement;
    const apellido: HTMLInputElement = document.querySelector("input[name='lastname']") as HTMLInputElement;
    const email: HTMLInputElement = document.querySelector("input[name='email']") as HTMLInputElement;
    const city: HTMLInputElement = document.querySelector("input[name='city']") as HTMLInputElement;
    const street: HTMLInputElement = document.querySelector("input[name='street']") as HTMLInputElement;
    const zipcode: HTMLInputElement = document.querySelector("input[name='zipcode']") as HTMLInputElement;
    let order:DataOrder = {
        name: nombre.value,
        lastname: apellido.value,
        email: email.value,
        city: city.value,
        street: street.value,
        zipcode: zipcode.value
    }

    let radio = document.querySelector('*[name=dir]:checked');
    if(radio){
       let label = document.querySelector("label[for='"+ radio.id +"']");
       if(label){
            let value = label.textContent;
            if(value){
                let v = value.split(',');
                order.city = v[1];
                order.street = v[0];
                order.zipcode = v[3];
            }
       }
    }
    if(order.city !== "" && order.street !== "" && order.zipcode !== ""){
        localStorage.setItem("order",  JSON.stringify(order));
        toast.loading('Procesando envío',{duration:4000});
        setTimeout(() => {
            (document.getElementById("pago") as HTMLAnchorElement).click();
        }, 4100);
    }else
       toast.error('Calle, ciudad o código postal vacíos', {duration:3500})
}

export function getPrecioTotal(listaCarrito:ListaCarrito[]): string {
    let precioTotal: number = 0;
    listaCarrito.forEach( (elem, i) => {
        precioTotal += listaCarrito[i].producto.precio * listaCarrito[i].unidades
    });
    let number:string = Number(precioTotal).toFixed(2);
    return number;
}

export const getDataFromPod = async function() : Promise<string[]>{
    await handleIncomingRedirect();
    if (!getDefaultSession().info.isLoggedIn) {
        await login({
          oidcIssuer: "https://inrupt.net/",
          redirectUrl: window.location.href,
          clientName: "dede-es6a"
        });
    }
    let element = document.getElementById('url') as HTMLInputElement;
    try{
        let dir:String = await getAddressesFromPod(element.value);
        let dirArray = dir.split('$');
        dirArray.pop();
        return dirArray;
    }catch(error){
        toast.error('URL no valida', {duration: 3500});
    }
    return[];
}