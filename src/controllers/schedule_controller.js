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

const createSchedule = async(req,res)=>{

    const newScheduleData={
        id: uuiv4(),
        ...req.body
    }
    try {

        const schedule = await schedulesModels.createSchedule(newScheduleData)

        res.status(201).json(schedule)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
}

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