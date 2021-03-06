import {createOrder, isLogged} from '../../api/api';
import {ListaCarrito, DataOrder} from '../../shared/shareddtypes';
import { useState, useEffect } from 'react';
import ErrorPage from '../ErrorPage';
import './ConfirmacionPago.css';
import ConfirmacionPagoAdmin from './ConfirmacionPagoAdmin';

type ConfirmacionPagoType = {
}

const ConfirmacionPago: React.FC<ConfirmacionPagoType> = () =>{
    let sessionCart = localStorage.getItem("listaCarrito");
    let listaCarrito:ListaCarrito[] = [];
    if(sessionCart)
        listaCarrito = JSON.parse(sessionCart);

    const orderDataStoraged = localStorage.getItem("order");
    let orderData: DataOrder;
    if(orderDataStoraged)
        orderData = JSON.parse(orderDataStoraged);

    const [order,setOrder] = useState<any>();
    const [log,setIsLogged] = useState<boolean>();

    const refreshOrder = async () => {
        setOrder(await createOrder(orderData));
    }
    const refreshIsLogged =  () => {
        setIsLogged(isLogged());
    }

    useEffect(()=>{ 
        refreshIsLogged(); refreshOrder(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if(log){
        return (
            <>
            <ConfirmacionPagoAdmin order={order} listaCarrito={listaCarrito}/>
        </>

        );
    }else{
        return(
            <ErrorPage msg="Debes iniciar sesión para poder acceder"/>
        );
    }

}
export default ConfirmacionPago;


