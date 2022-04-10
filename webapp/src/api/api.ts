import {User, Product, isLoggedType, Order, DataOrder} from '../shared/shareddtypes';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(
          {'username':user.username,
           'email':user.email,
           'password':user.password,
          })
      });  
      if (response.status===201)
      return true;
    else
      return false;
}

export async function login(username:string, password:string):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(
      {
       'username':username,
       'password':password
      })
  });  
  if(response.status === 200){
    return true;
  }else{
    return false;
  }
}

export async function logout():Promise<void>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    await fetch(apiEndPoint+'/logout');
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
  if(response.status===201)
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

export async function isLogged():Promise<isLoggedType>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint+'/islogged');
  return response.json();
}

export async function isAdmin():Promise<isLoggedType>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint+'/isadmin');
  return response.json();
}

export async function createOrder(DataOrder:DataOrder):Promise<JSON>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint+'/createOrder',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      'name': DataOrder.name,
      'lastname': DataOrder.lastname,
      'email': DataOrder.email,
      'city': DataOrder.city,
      'street': DataOrder.street,
      'zipcode': DataOrder.zipcode
    })
  });
  return response.json();
}

export async function saveOrder(order: Order):Promise<boolean>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint+'/saveOrder',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      'carrito': order.carrito,
      'precio': order.precio
    })
  });
  if(response.status === 200)
    return true;
  else
    return false;
}

export async function getOrdersByClientLogged():Promise<Order>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint+'/getOrdersBy');
  return response.json();
}

