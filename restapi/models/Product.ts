import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {type: String, required: true},
    marca: String,
    precio: Number,
    categoria: {type: String, required: true},
    descripcion: {type: String}
});
const Product = mongoose.model('product', productSchema);
export default Product; 