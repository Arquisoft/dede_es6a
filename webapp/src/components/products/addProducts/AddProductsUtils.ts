import {addProduct, isAdmin} from '../../../api/api';
import {Product} from '../../../shared/shareddtypes';

export  function getPrecioEnvio(order:any):number {
    if(order !== undefined){
        return order["rates"][0]["amount"];
    }
    return 0;
}


export const enviar = () => {
    const nombre:HTMLInputElement  = document.querySelector("input[name='name']") as HTMLInputElement;
    const marca: HTMLInputElement = document.querySelector("input[name='brand']") as HTMLInputElement;
    const precio: HTMLInputElement = document.querySelector("input[name='price']") as HTMLInputElement;
    const cat: HTMLInputElement = document.querySelector("input[name='cat']") as HTMLInputElement;
    const descr: HTMLInputElement = document.querySelector("input[name='descr']") as HTMLInputElement;
    const id: HTMLInputElement = document.querySelector("input[name='id']") as HTMLInputElement;
    let n:string ='',m:string='',p:number=0.0,c:string='',d:string='', i:string='';
    if(id)
        i = id.value as string;
    if(nombre)
        n = nombre.value as string;
    if(marca)
        m = marca.value as string;
    if(precio)
        p = Number.parseFloat( precio.value );
    if(cat)
        c = cat.value as string;
    if(descr)
        d = descr.value as string;
    const product:Product = {'id':i, 'nombre':n,'marca':m,'precio':p,'categoria':c,'descripcion':d, 'rating': 2.5, 'imagen':''};
    addProduct(product);
}