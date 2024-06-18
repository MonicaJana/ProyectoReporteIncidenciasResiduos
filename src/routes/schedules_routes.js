import { Router } from "express";
import { getAllSchedules, createSchedule, getScheduleByAdressController, updateScheduleController, deleteScheduleController } from "../controllers/schedule_controller.js";
import {verifyToken}  from "../middlewares/auth.js"

const router = Router()

router.get('/schedules', getAllSchedules)
router.get('/schedules/:id', getScheduleByAdressController)
router.post('/schedules',verifyToken,createSchedule)
router.put('/schedules/:id',verifyToken, updateScheduleController)
router.delete('/schedules/:id',verifyToken, deleteScheduleController)

export default router