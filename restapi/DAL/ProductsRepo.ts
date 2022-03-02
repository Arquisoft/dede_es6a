import { Service } from "typedi";


@Service()
export default class ProductsRepo {

    constructor(

    ){}

    public find(id: string){
        return {"id":1,"marca": "kenevep", "categoria": "vozka"};
    }
}