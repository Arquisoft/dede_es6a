import mongoose from 'mongoose';
import {UserType} from './../types';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, unique: true},
    email: {type:String, unique: true},
    password: {type: String}
});
const User:mongoose.Model<UserType> = mongoose.model('user', userSchema);
export default User; 