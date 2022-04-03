
export type ProductType = {
    nombre:string;
    marca: string;
    precio: number;
    categoria: string;
    descripcion: string;
}

export type UserType = {
  username:string;
  email:string;
  pasword:string;
}

export type PersonalData = {
  name : string,
  lastname: string,
  email: string,
  city: string,
  street: string,
  postalcode: string
}

export type SellType = {
    nombre: string,
    quantity: number
}

export type OrderType = {
    userEmail: string,
    idProducts: string[],
    precio: number
}

export type ListaCarrito = {
  producto: ProductType;
  unidades: number;
}