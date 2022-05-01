import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';

export default function(props:any){

    return (
        <Card id='participante' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={props.img} />
                    <Card.Body>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text>
                            {props.descr}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{props.email}</ListGroupItem>
                        <ListGroupItem>Universidad de Oviedo</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
    );
}