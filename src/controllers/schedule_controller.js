import schedulesModels from "../models/schedules.js";
import {v4 as uuiv4} from 'uuid'

const getAllSchedules = async (req, res) => {

    try{

        const schedules = await schedulesModels.getAllSchedules()

        res.status(200).json(schedules)

    } catch(error){
        res.status(500).json(error)
    }

}

const createSchedule = async (req, res) => {
    const { address, schedule, frecuency, hours } = req.body;

    if (!address || !schedule || !frecuency || !hours) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newScheduleData = {
        id: uuiv4(),
        address,
        schedule,
        frecuency,
        hours
    };

    try {
        const schedule = await schedulesModels.createSchedule(newScheduleData);
        res.status(201).json(schedule);
    } catch (error) {
        console.error('Error al crear el horario:', error);
        res.status(500).json({ error: 'Error al crear el horario' });
    }
};

const getScheduleByAdressController = async (req,res)=>{
    try {
        const {address}=req.params
        const schedule = await schedulesModels.getScheduleByAdress(address)
        const status = schedule.error ? 404:200
        res.status(status).json(schedule)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateScheduleController = async (req,res)=>{
    try {

        const {id}=req.params
        const schedule = await schedulesModels.updateScheduleModel(id, req.body)
        const status = schedule.error ? 404:200

        res.status(status).json(schedule)
    } catch (error) {
        res.status(500).json(error)
        
    }
}

const deleteScheduleController = async(req,res)=>{
    try {
        const {id}=req.params
        const schedule = await schedulesModels.deleteScheduleModel(id)
        const status = schedule.error ? 404:200
        res.status(status).json(schedule)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

export {
    getAllSchedules,
    createSchedule,
    getScheduleByAdressController,
    updateScheduleController,
    deleteScheduleController
}