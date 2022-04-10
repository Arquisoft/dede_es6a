import mongoose from 'mongoose';
import {OrderType} from './../types';

const { Schema } = mongoose;

const orderSchema = new Schema({
    username: {type: String, required: true},
    products: {type: Object, required: true},
    precio: {type: Number, require:true},
    estado: {type: String}
});
const Product:mongoose.Model<OrderType> = mongoose.model('order', orderSchema);
export default Product; 