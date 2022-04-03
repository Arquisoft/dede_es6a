import { login } from '@inrupt/solid-client-authn-browser';
import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import Product from './models/Product';
import User from './models/User';
import {ProductType, UserType} from './types';


const api:Router = express.Router();
const session = require('express-session');
const crypto = require('crypto');
const shippo = require('shippo')('shippo_test_54074f336b3c2eb6d295fe272eb3584ee6457e4a');
const { 
  getSessionFromStorage,
  getSessionIdFromStorageAll,
  Session
} = require("@inrupt/solid-client-authn-node");

// añadir usuarios a la BD
api.post(
  "/users/add",[
    check('username').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('password','invalid pasword').isLength({ min: 6 }),
    check('confirmPassword', 'invalid password').isLength({ min: 6 })
    .custom((value: any,req: any) => {
        if (value !== req.body.confirmPassword) {
            // error si las contraseñas no coinciden
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }
   )
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let username = req.body.username; 
    let email = req.body.email;
    let password = req.body.password;
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

// añadir productos a la BD
api.post("/products/add",[
  check('nombre').isLength({min: 1}).trim().escape(),
  //check('precio').exists().bail().if((value:number) => {value >= 0.0}),
  //check('categoria').exists().bail().isIn(['vozka','ginebra','ron']),
],
async (req: Request, res: Response):Promise<Response> =>{
  let nombre:String = req.body.nombre;
  let marca:String = req.body.marca;
  let precio:String = req.body.precio;
  let categoria:String = req.body.categoria;
  let descripcion:String = req.body.descripcion;
  let product = new Product(
    {'nombre':nombre,
     'marca':marca, 
     'precio':precio, 
     'categoria':categoria, 
     'descripcion':descripcion}
  );
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

api.post("/login", async (req, res): Promise<Response>=> {
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
    session.user = user.username;
    session.podUrl = podUrl;
    const sessionSolid = new Session();
    session.sessionId = sessionSolid.info.sessionId;
    const redirectToSolidIdentityProvider = () => {
      res.redirect("http://localhost:3000/catalogo");
    };
    await sessionSolid.login({
      redirectUrl: `http://localhost:${3000}/redirect-from-solid-idp`,
      oidcIssuer: "https://broker.pod.inrupt.com",
      clientName: "novendoagua",
      handleRedirect: redirectToSolidIdentityProvider,
    });
    return res.status(200);
  }else{
    session.user = null;
    return res.status(401).send("error");
  }
});

api.get('/logout', async (req, res) => {
  session.user = null;
  res.status(200).send("Usuario desconectado");
});

api.get('/islogged', async (req, res) =>{
  if(session.user != null && session.user != "undefined")
    return res.status(200).send({logged: true})
  else
    return res.status(200).send({logged: false})
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

api.get('/isadmin', async (req, res) =>{
  if(session.user != null && session.user == "admin")
    return res.status(200).send({logged: true})
  else
    return res.status(200).send({logged: false})
  });

export default api;
