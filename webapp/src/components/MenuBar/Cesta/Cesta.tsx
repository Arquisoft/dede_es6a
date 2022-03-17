import  "./Cesta.css"
import CestaCompra from "./../../../assets/cesta.png"

export default function Cesta() {
  return (
    <div className="Cesta">
        <img className="carrito" src={CestaCompra} alt="Cesta compra"></img>
    </div>
  )
}
