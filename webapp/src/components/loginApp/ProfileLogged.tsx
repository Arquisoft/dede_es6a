import BarraNavegacion from '../BarraNavegacion';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import {getOrdersByClientLogged, getUserLoggeed, logout} from '../../api/api';
import { useState, useEffect } from 'react';
import { OrderFromDB, User} from '../../shared/shareddtypes';

import toast from 'react-hot-toast';
import './profile.css';



export default function Profile() {

    const [orders,setOrders] = useState<OrderFromDB[]>([]);
    const refreshOrders = async () => {
        setOrders(await getOrdersByClientLogged());
    }
    const [user,setUser] = useState<User[]>([]);
    const refreshUser = async () => {
        setUser(await getUserLoggeed());
    }
    useEffect(()=>{ refreshOrders(); refreshUser(); }, []);

    const logoutButton = async () => {
        await logout();
        toast.success('Sesión cerrada', {duration: 800});
        setTimeout(() => {
            (document.getElementById("navigate") as HTMLAnchorElement).click();
        }, 1000);
    }

    const setUserData = () => {
        if(user[0]){
            return(
                <>
                    <ListGroup.Item>{user[0].username}</ListGroup.Item>
                    <ListGroup.Item>{user[0].email}</ListGroup.Item>
                </>
            );
        }
    }

    const setEstado = (estado:string) => {
        if(estado === "enviado")
            return(<ProgressBar now={33.33} label={'enviado'} />);
        else if(estado === "reparto")
            return(<ProgressBar now={66.66} label={'reparto'} />);
        else if(estado === "entregado")
            return(<ProgressBar now={100} label={'entregado'} />);
        else
            return(<p>Error</p>);
    }

    return(
        <>
            <div id='userdata'>
                <BarraNavegacion />
                <h3>Usuario</h3>
                <ListGroup>
                    {setUserData()}
                </ListGroup>
                <Button id='logout' variant="primary" data-testid='boton-cerrarsesion' onClick={logoutButton}>Cerrar sesión</Button>{' '}
                <a href='/catalogo' id='navigate' hidden>Content</a>
            </div>
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
                                <h5>Estado del pedido: {order.estado} </h5>
                                {setEstado(order.estado)}
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </>
    );
}