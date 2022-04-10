import BarraNavegacion from '../BarraNavegacion';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import {getOrdersByClientLogged} from '../../api/api';
import { useState, useEffect } from 'react';
import {isLoggedType, OrderFromDB} from '../../shared/shareddtypes';

export default function Profile() {

    const [orders,setOrders] = useState<OrderFromDB[]>([]);
    const refreshOrders = async () => {
        setOrders(await getOrdersByClientLogged());
    }
    useEffect(()=>{ refreshOrders(); }, []);

    return(
        <>
            <BarraNavegacion />
            <h3>Pedidos realizados</h3>
            <Accordion defaultActiveKey="0" flush>
                

                {orders.map((order)=>{   
                    return(
                        <Accordion.Item eventKey={orders.indexOf(order)+""}>
                            <Accordion.Header>pedido {orders.indexOf(order)+1}</Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>nombre</th>
                                        <th>cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {order.products.map((prod)=>{ 
                                        return(
                                            <tr>
                                                <td>{order.products.indexOf(prod)}</td>
                                                <td>{prod.nombre}</td>
                                                <td>{prod.quantity}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                                <h5>Precio total: {order.precio} €</h5>
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </>
    );
}