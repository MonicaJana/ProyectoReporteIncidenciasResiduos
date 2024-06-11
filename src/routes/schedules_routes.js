import { Router } from "express";
import { getAllSchedules, createSchedule, getScheduleByAdressController, updateScheduleController, deleteScheduleController } from "../controllers/schedule_controller.js";

const router = Router()

router.get('/schedules', getAllSchedules)
router.get('/schedules/:address', getScheduleByAdressController)
router.post('/schedules',createSchedule)
router.put('/schedules/:id', updateScheduleController)
router.delete('/schedules/:id', deleteScheduleController)

export default router