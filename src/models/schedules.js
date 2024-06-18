import {Schema, model} from 'mongoose'
import bcrypt from "bcrypt"

const scheduleSchema = new Schema({
    direccion:{
        type:String,
        require:true,
        trim:true
    },
    horario:{
        type:String,
        require:true,
        trim:true
    },
    frecuencia:{
        type:String,
        require:true,
        trim:true
    },
    horas:{
        type:String,
        require:true,
        trim:true
    },

},{
    timestamps:true
})

export default model('Schedule',scheduleSchema)