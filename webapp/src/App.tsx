import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import AddProducts from './components/products/addProducts/AddProducts';
import ConfirmacionEdad from './components/ConfirmacionEdad';
import { useState } from 'react';
import Producto from './components/Producto';
import { ListaCarrito, Product } from './shared/shareddtypes';
import Carrito from './components/carrito/Carrito';
import ConfirmacionPago from './components/ConfirmacionPago';
import AboutUs from './components/aboutUs/AboutUs';
import Login from "./components/loginApp/FormLogin"
import Register from './components/Register/FormRegister';

const App = () => {

  const [listaCarrito,setListaCarrito] = useState<ListaCarrito[]>([]);

  const cargarCarrito = () => {
    const sessionCart = localStorage.getItem("listaCarrito");
    if (sessionCart)
        setListaCarrito(JSON.parse(sessionCart));
  }

  const addToCarrito = (product: Product) => {
    cargarCarrito();

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

    localStorage.setItem("listaCarrito", JSON.stringify(productosLista));
    setListaCarrito(productosLista);
  };

  const removeFromCarrito = (product: Product) => {
    cargarCarrito();

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

    localStorage.setItem("listaCarrito", JSON.stringify(productosLista));
    setListaCarrito(productosLista);
  }

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfirmacionEdad />} />
        <Route path="catalogo" element={<Catalogo  addToCarrito={addToCarrito}/>} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="carrito" element={<Carrito listaCarrito={listaCarrito} addToCarrito={addToCarrito} removeFromCarrito={removeFromCarrito} />} />
        <Route path="pago" element={<ConfirmacionPago  />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
