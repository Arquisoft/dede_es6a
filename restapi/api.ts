import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import Product from './models/Product';
import User from './models/User';
import {ProductType, UserType} from './types';

const api:Router = express.Router();
const bcrypt:any = require('bcryptjs');

// añadir usuarios a la BD
api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('password','invalid pasword').isLength({ min: 6 }),
    check('confirmPassword', 'invalid password').isLength({ min: 6 })
    .custom((value,{req}) => {
        if (value !== req.body.confirmPassword) {
            // error si las contraseñas no coinciden
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    })
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name; 
    let email = req.body.email;
    let password = req.body.password;
    
    var salt = bcrypt.genSaltSync(10);
    var hash:String = bcrypt.hashSync(password, salt);

    const user = new User(
      {
        'name' : name,
        'email': email,
        'password': hash
      }
    );
    await user.save();
    return res.sendStatus(200);
  }
);

// añadir productos a la BD
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

export default api;
