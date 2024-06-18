import Schedule from "../models/schedules.js";
import {v4 as uuidv4} from 'uuid'

import mongoose from 'mongoose';

const getAllSchedules = async (req, res) => {
    try{
        const schedules = await Schedule.find({}).select("direccion horario frecuencia horas")
        res.status(200).json(schedules)
    } catch(error){
        res.status(500).json(error)
    }
}

const createSchedule = async (req, res) => {

    const schedule = await Schedule.create(req.body)
    res.status(200).json({msg:`Registro exitoso del horario ${schedule._id}`,schedule})
};

const getScheduleByAdressController = async (req,res)=>{
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById(id);

        if (!schedule) {
            return res.status(404).json({ error: 'Horario no encontrado' });
        }

        res.status(200).json(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener horario por ID' });
    }

}

const updateScheduleController = async (req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el horario ${id}`})
    await Schedule.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del horario"})
}

const deleteScheduleController = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe ese horario`})
    await Schedule.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Horario eliminado exitosamente"})
}

export {
    getAllSchedules,
    createSchedule,
    getScheduleByAdressController,
    updateScheduleController,
    deleteScheduleController
}