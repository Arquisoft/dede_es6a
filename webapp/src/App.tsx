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

function App(): JSX.Element {
//const App = () => {

  //const [listaCarrito,setListaCarrito] = useState<ListaCarrito[]>([]);
  const [listaCarrito,setListaCarrito] = useState([] as ListaCarrito[]);

  const addToCarrito = (prod: Product) =>{
    console.log(prod);
    console.log(listaCarrito);
    setListaCarrito(prev => {
      const estaEnElCarrito = prev.find(item => item.producto.nombre == prod.nombre);
      console.log(estaEnElCarrito);
      if (estaEnElCarrito) {
        console.log("Ya esta en el carrito y se suma 1");
        return prev.map(item => item.producto.nombre === prod.nombre ? {'producto':prod, 'unidades':item.unidades+1 } : item);
      }
      console.log("No esta en el carrito y se crea");
      var c:ListaCarrito = {'producto':prod, 'unidades':1};
      return [...prev, c];
    });
  }; 

  const removeFromCarrito = (nombre: string) => {
      setListaCarrito(prev =>
          prev.reduce((ack, item) => {
          if (item.producto.nombre === nombre) {
              if (item.unidades === 1) return ack;
              return [...ack, { ...item, amount: item.unidades - 1 }];
          } else {
              return [...ack, item];
          }
          }, [] as ListaCarrito[])
      );
  };

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfirmacionEdad />} />
        <Route path="catalogo" element={<Catalogo  addToCarrito={addToCarrito}/>} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="carrito" element={<Carrito listaCarrito={listaCarrito} addToCarrito={addToCarrito} removeFromCarrito={removeFromCarrito} />} />
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
