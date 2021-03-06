import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import Product from './models/Product';
import User from './models/User';
import Order from './models/Order';
import {ProductType, UserType, ListaCarrito, SellType, login} from './types';


const api:Router = express.Router();
const crypto = require('crypto');
const shippo = require('shippo')('shippo_test_54074f336b3c2eb6d295fe272eb3584ee6457e4a');


// añadir usuarios a la BD
api.post("/users/add", async (req: Request, res: Response): Promise<Response> => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    if(username === null || username.trim() === '' || email == null || email.trim() === '' ){
      return res.sendStatus(500);
    }

    let hash = crypto.createHmac('sha256','abcdefg').update(password).digest('hex');
    const user = new User(
      {
        'username' : username,
        'email': email,
        'password': hash,
      }
    );
    if(username != "admin")
      await user.save();
    return res.sendStatus(201);
  }
);

api.get('/users/list', async (req, res):Promise<Response> => {
  var users: Array<UserType> =  await User.find();
  return res.status(200).send(users);
});

api.get('/users/:name', async (req, res):Promise<Response> => {
  const name:string = req.body.name; 
  var user =  await User.findOne({username: name.toString()});
  return res.status(200).send(user);
});

api.get('/users/delete/:name', async (req, res):Promise<Response> => {
  const name = req.body.name;
  await User.deleteOne({username: name.toString()});
  return res.status(200);
});

// añadir productos a la BD
api.post("/products/add",[
  check('nombre').isLength({min: 1}).trim().escape()
],
async (req: Request, res: Response):Promise<Response> =>{
  let nombre:String = req.body.nombre;
  let marca:String = req.body.marca;
  let precio:String = req.body.precio;
  let categoria:String = req.body.categoria;
  let descripcion:String = req.body.descripcion;
  let product = new Product({
     'nombre':nombre,
     'marca':marca, 
     'precio':precio, 
     'categoria':categoria, 
     'descripcion':descripcion,
     'rating': 2.5,
    });
  await product.save();
  return res.sendStatus(201);
});

// sacar productos de la BD
// parametro filter para filtrar productos por el atributo categoria
api.get("/catalogo/:filter", async (req: Request, res: Response): Promise<Response>=> {
  const filter = req.params.filter;
  
  if(filter === 'all'){
    var products: Array<ProductType> =  await Product.find();
  }else{
    var products: Array<ProductType> =  await Product.find({'categoria': filter});
  }
  return res.status(200).send(products);
});

api.post("/login", async (req, res) : Promise<Response<login>> => {
  var username = req.body.username;
  var password = req.body.password;
  var podUrl = req.body.podUrl;

  if(username == "")
    return res.status(401).send("Nombre de usuario no valido");
  const re = /^[a-zA-Z0-9_]*/;
  if(re.test(username) == false)
    return res.status(401).send("Nombre de usuario no valido");

  let hash = crypto.createHmac('sha256','abcdefg').update(password).digest('hex');
  let user:UserType = await User.findOne({"username": username.toString(),'password': hash}) as UserType;
  if(user != null){
    if(user.username == 'admin')
      return res.status(201).send({"user": "admin"});
    else
      return res.status(200).send({"user": user.username});
  }else{
    return res.status(401).send({"user": "error"});
  }
});

  api.post('/createOrder', async (req, res) =>{
    var addressFrom  = {
      "name": "Shawn Ippotle",
      "street1": "215 Clayton St.",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94117",
      "country": "US"
  };
  var addressTo = {
      "name": req.body.name,
      "street1": req.body.street,
      "city": req.body.city,
      "state": "ES",
      "zip": req.body.zipcode,
      "country": "ES"
  };
  var parcel = {
      "length": "5",
      "width": "5",
      "height": "5",
      "distance_unit": "in",
      "weight": "2",
      "mass_unit": "lb"
  };
  shippo.shipment.create({
      "address_from": addressFrom,
      "address_to": addressTo,
      "parcels": [parcel],
      "async": false
  }, function(err:any, shipment:any){
      if(err){
        return res.status(400).send(err);
      }else{
        return res.status(200).send(shipment);  
      }
  });
});


  api.post('/saveOrder', async (req, res) => {
    
    let username:string = req.query.username as string;
    let products:ListaCarrito[] = req.body.carrito;
    let prods:SellType[] = [];
    products.forEach(element => {
        let prod:SellType = {
          nombre: element.producto.nombre,
          quantity: element.unidades
        }
        prods.push(prod);
    });
    
    let order = new Order({
      username: username,
      products: prods,  
      precio: req.body.precio,
      estado: 'enviado' // enviado, reparto, entregado
    });
    await order.save();
    return res.sendStatus(200);   
  });

  api.get('/getOrdersBy', async (req, res):Promise<Response> => {
    let name:string = req.query.username as string;
    let orders;
    if(name == 'admin'){
      orders = await Order.find();
    }else {
      orders = await Order.find({username: name});
    }
    return res.status(200).send(orders);
  });

  api.get('/userlogged', async (req, res):Promise<Response> => {
    var username:string = req.query.username as string;
    let userlogged = await User.find({username: username.toString()});
    return res.status(200).send(userlogged);
  });

export default api;
