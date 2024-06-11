import { Router } from "express";

import { createClaim, getClaim, getClaimByIdController, updateClaimController, deleteClaimController } from "../controllers/reclamo_controller.js";
import {verifyToken}  from "../middlewares/auth.js"

const router = Router()

router.get('/claims',verifyToken, getClaim)
router.get('/claims/:id', verifyToken,getClaimByIdController)
router.post('/claims',verifyToken, createClaim)
router.put('/claims',verifyToken,updateClaimController)
router.delete('/claims/:id',verifyToken,deleteClaimController)




export default router

