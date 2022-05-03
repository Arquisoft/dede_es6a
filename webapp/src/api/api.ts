import {User, Product, isLoggedType, Order, DataOrder, OrderFromDB} from '../shared/shareddtypes';

let uri = 'https://dd6a-restapi.herokuapp.com/api';

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


export async function loginApp(username:string, password:string):Promise<boolean>{
  const apiEndPoint=  process.env.REACT_APP_API_URI ||'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(
      {
       'username':username,
       'password':password,
       'podUrl': ""
      })
  });  
  if(response.status === 200){
    let r:Promise<isLoggedType> = response.json()
    localStorage.setItem('user',(await r).user);
    return true;
  }else if(response.status === 201){
    localStorage.setItem('user','admin');
    return true;
  }else{
    return false;
  }
}

export async function logout():Promise<void>{
  localStorage.removeItem('user');
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

export function isLogged():boolean{
  if(localStorage.getItem('user') != null)
    return true;
  else
    return false;
}

export function isAdmin():boolean{
  if(localStorage.getItem('user') === 'admin')
    return true;
  else
    return false;
}

export async function createOrder(DataOrder:DataOrder):Promise<JSON>{
  const apiEndPoint = uri || 'http://localhost:5000/api';
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
  let response = await fetch(apiEndPoint+'/saveOrder?username='+localStorage.getItem('user'),{
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

export async function getOrdersByClientLogged():Promise<OrderFromDB[]>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint+'/getOrdersBy?username='+localStorage.getItem('user'));
  return response.json();
}

export async function getUserLoggeed():Promise<User[]>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
  let response = await fetch(apiEndPoint+'/userlogged?username='+localStorage.getItem('user'));
  return response.json();
}

