import BarraNavegacion from '../BarraNavegacion';
import Accordion from 'react-bootstrap/Accordion';
import {getOrdersByClientLogged} from '../../api/api';
import { useState, useEffect } from 'react';
import {isLoggedType, Order} from '../../shared/shareddtypes';

export default function Profile() {

    const [orders,setOrders] = useState<Order[]>([]);
    const refreshOrders = async () => {
        setOrders(await getOrdersByClientLogged());
    }
    useEffect(()=>{ refreshOrders(); }, []);

    console.log(orders);

    return(
        <>
            <BarraNavegacion />
            <h3>Pedidos</h3>
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                    <Accordion.Body>
                        pedido 1
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                        pedido 2
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}