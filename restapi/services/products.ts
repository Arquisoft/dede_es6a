import { Service, Container } from 'typedi'
import ProductsRepo from "../DAL/ProductsRepo";

const pRepo : ProductsRepo = Container.get(ProductsRepo);

@Service()
export default class BotellaService {

    constructor(
        
    ){}

     findById(id: string){
         // sacar la botella del repositorio 
        return pRepo.find(id);
     }   
    
}