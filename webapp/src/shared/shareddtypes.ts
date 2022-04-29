export type User = {
    username:string;
    email:string;
    password:string;
  }

export type Product = {
    id: string;
    nombre:string;
    marca: string;
    precio: number;
    categoria: string;
    descripcion: string;
    rating:number;
}

export type ListaCarrito = {
    producto: Product;
    unidades: number;
}

export type isLoggedType = {
    logged: boolean;
}

export type PersonalData = {
    name : string,
    lastname: string,
    email: string,
    city: string,
    street: string,
    postalcode: string
}

export type DataOrder = {
    name: string,
    lastname: string,
    email: string,
    city: string,
    street: string,
    zipcode: string
}

export type Order = {
    carrito: ListaCarrito[],
    precio: number
}

export type ProductToOrder = {
    nombre: string,
    quantity: number
}

export type OrderFromDB = {
    username: string,
    products: ProductToOrder[],
    precio: number,
    estado: string
}


