import BarraNavegacion from '../BarraNavegacion';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import './aboutUs.css';

export default function(){

    return (
        <>
            <BarraNavegacion />
            <h1>About us</h1>
            <div id='cards'>
                <Card id='participante' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="../juan.png" />
                    <Card.Body>
                        <Card.Title>Juan Mera Menendez</Card.Title>
                        <Card.Text>
                            texto ejemplo :D
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Uo277406@uniovi.es</ListGroupItem>
                        <ListGroupItem>Universidad de Oviedo</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                <Card id='participante' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="../diego.png" />
                    <Card.Body>
                        <Card.Title>Diego Garcia Quiros</Card.Title>
                        <Card.Text>
                            texto ejemplo
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>uo@uniovi.es</ListGroupItem>
                        <ListGroupItem>Universidad de Oviedo</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                <Card id='participante' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="../perfil-default.jpg" />
                    <Card.Body>
                        <Card.Title>Daniel Machado Sanchez</Card.Title>
                        <Card.Text>
                            texto ejemplo
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>uo@uniovi.es</ListGroupItem>
                        <ListGroupItem>Universidad de Oviedo</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                <Card id='participante' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="../perfil-default.jpg" />
                    <Card.Body>
                        <Card.Title>David Maldonado Álvarez</Card.Title>
                        <Card.Text>
                            texto ejemplo
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>uo@uniovi.es</ListGroupItem>
                        <ListGroupItem>Universidad de Oviedo</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                <Card id='participante' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="../perfil-default.jpg" />
                    <Card.Body>
                        <Card.Title>Oscar</Card.Title>
                        <Card.Text>
                            texto ejemplo
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>uo@uniovi.es</ListGroupItem>
                        <ListGroupItem>Universidad de Oviedo</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>

      </>
    );

}
