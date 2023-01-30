import {Schema, model} from 'mongoose'
const shem = new Schema({
    name: {
        firstName: String,
        lastName: String
    },
    number: String

})


export default model('User', shem)