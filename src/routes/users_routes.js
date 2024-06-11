//importar elm Módulo router
import { Router } from "express";

import { loginUserController, registerUserController } from "../controllers/user_Controller.js";

//crear la instancia de Router
const router = Router();


router.post("/users/register", registerUserController)

//el token siempre va en medio de la ruta y el controlador ya que es un middleware
router.post("/users/login", loginUserController)



export default router;
