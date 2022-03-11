import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import AddProducts from './components/products/addProducts/AddProducts';

function App(): JSX.Element {

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="inicio" element={<Inicio />} />
        <Route path="catalogo" element={<Catalogo  />} />
        <Route path="products/add" element={<AddProducts />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
