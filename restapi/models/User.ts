import mongoose from 'mongoose';
import {UserType} from './../types';

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type:String},
    password: {type: String, required:true}
});
const User:mongoose.Model<UserType> = mongoose.model('user', userSchema);
export default User; 