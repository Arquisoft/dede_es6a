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
