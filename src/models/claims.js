import mongoose from 'mongoose';

const { Schema } = mongoose;


const claimSchema = new Schema({
    direccion: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now }, 
    imagen: { type: String }, 
    public_id:{type: String, required: true}
});

const Claim = mongoose.model('Claim', claimSchema);

export default Claim;
