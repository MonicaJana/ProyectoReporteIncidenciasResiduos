//importar elm Módulo router
import { Router } from "express";

import { loginUser, registerUser } from "../controllers/user_Controller.js";

//crear la instancia de Router
const router = Router();


router.post("/users/register", registerUser)

router.post("/users/login", loginUser)



export default router;
