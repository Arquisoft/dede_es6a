import { ListaCarrito, Product } from '../../shared/shareddtypes';
import toast from 'react-hot-toast';

export function removeFromCarrito (product: Product):ListaCarrito[] {
    let listaCarrito = cargarCarrito();
    let productosLista = listaCarrito.slice();
    let encontrado: boolean = false;
    for(let i=0; i<= productosLista.length; i++){
      if(!encontrado)
        if(productosLista[i].producto.nombre === product.nombre){
          encontrado = true;
          productosLista[i].unidades -= 1;
          if (productosLista[i].unidades === 0)
              productosLista.splice(i, 1);
        }
    }

    toast.error(product.nombre +': Eliminada una unidad del carrito', {duration: 3500});

    localStorage.setItem("listaCarrito", JSON.stringify(productosLista));
    guardarCarrito(productosLista);
    return productosLista;
}
 
export function addToCarrito (product: Product):ListaCarrito[] {
    let listaCarrito = cargarCarrito();

    let productosLista = listaCarrito.slice();
    let encontrado: boolean = false;
    for(let i=0; i< productosLista.length; i++){
      if(productosLista[i].producto.nombre === product.nombre){
        productosLista[i].unidades += 1;
        encontrado = true;
      }
    }
    if(!encontrado){
      var c:ListaCarrito = {'producto':product, 'unidades':1};
      productosLista.push(c);
    }

    toast.success(product.nombre + ': Añadida una unidad al carrito', {duration: 3500});

    localStorage.setItem("listaCarrito", JSON.stringify(productosLista));
    guardarCarrito(productosLista);
    return productosLista;
  };

  export function vaciarCarrito():ListaCarrito[] {
    localStorage.setItem("listaCarrito", JSON.stringify([]));
    toast.error('Carrito vaciado', {duration:3500});
    return [];
  };

  function cargarCarrito():ListaCarrito[] {
    let sessionCart = localStorage.getItem("listaCarrito");

    let listaCarrito:ListaCarrito[] = [];
    if(sessionCart)
        listaCarrito = JSON.parse(sessionCart);
    return listaCarrito;
  }

  function guardarCarrito(carrito:ListaCarrito[]){
      localStorage.setItem("listaCarrito", JSON.stringify(carrito));
  }