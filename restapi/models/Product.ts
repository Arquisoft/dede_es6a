import mongoose from 'mongoose';
import {ProductType} from './../types';

const { Schema } = mongoose;

const productSchema = new Schema({
    nombre: {type: String, required: true, unique: true},
    marca: String,
    precio: {type: Number, require:true},
    categoria: {type: String, required: true},
    descripcion: {type: String}
});
const Product:mongoose.Model<ProductType> = mongoose.model('product', productSchema);
export default Product; 