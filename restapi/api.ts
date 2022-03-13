import { Console } from 'console';
import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { userInfo } from 'os';
import Product from './models/Product';
import {User, ProductType} from './types';


const api:Router = express.Router()

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [{name: "paco", email: "paco@uniovi.es"}];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name; 
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

api.post("/products/add",[
  check('nombre').isLength({min: 1}).trim().escape(),
  check('precio').exists().bail().if((value:number) => {value >= 0.0}),
  check('categoria').exists().bail().isIn(['vozka','ginebra','ron']),
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
  return res.sendStatus(200);
});

api.get("/catalogo", async (req: Request, res: Response): Promise<Response>=> {
  var products: Array<ProductType> =  await Product.find();
  //products = [{nombre:'keneveb',marca:'keneveb',precio:4.50,categoria:'vozka',descripcion:'el mejor vozka'}];
  return res.status(200).send(products);
});

export default api;
