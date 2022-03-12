import {User} from '../shared/shareddtypes';
import {Product} from '../shared/shareddtypes';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function addProduct(product: Product):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/products/add',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(
        {'nombre':product.nombre,
        'marca':product.marca,
        'precio':product.precio,
        'categoria':product.categoria,
        'description':product.descripcion
      })
  });
  if(response.status===200)
    return true;
  else
    return false;
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json();
}

export async function getProducts(filter:String = 'all'):Promise<Product[]>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint+'/catalogo/'+filter);
  return response.json();
}