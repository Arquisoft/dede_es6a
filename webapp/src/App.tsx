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
import AboutUs from './components/aboutUs/AboutUs';

function App(): JSX.Element {

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfirmacionEdad />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="aboutus" element={<AboutUs />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
