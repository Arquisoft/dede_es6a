import { Console } from 'console';
import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { userInfo } from 'os';
import Product from './models/Product';

const api:Router = express.Router()

interface User {
    name: string;
    email: string;
}
interface ProductType{
  nombre:string;
    marca: string;
    precio: number;
    categoria: string;
    descripcion: string;
}


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

api.get("/catalogo", async (req: Request, res: Response): Promise<Response>=> {
  var products: Array<ProductType> =  await Product.find();
  products = [{nombre:'keneveb',marca:'keneveb',precio:4.50,categoria:'vozka',descripcion:'el mejor vozka'}];
  return res.status(200).send(products);
});

export default api;
