import {Product} from '../../shared/shareddtypes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from '@mui/icons-material/ContactPage';

type Products = {
    products: Product[];
  }

  export default function Catalogo (props: Products): JSX.Element{

    return (
      <>
        <h1>Catalogo de productos</h1>
        <List>
          {props.products.map((prod,i)=>{
            return (
              <ListItem key={prod.nombre}>
                <ListItemIcon>
                  <ContactPageIcon/>
                </ListItemIcon>
                <ListItemText primary={prod.nombre} secondary={prod.precio}/>
              </ListItem>
            )
          })}
        </List>
      </>
    );

}