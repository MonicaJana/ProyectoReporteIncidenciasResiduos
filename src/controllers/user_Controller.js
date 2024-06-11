import userModel from "../models/users.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid";
import { createToken } from "../middlewares/auth.js";

const registerUserController = async (req, res) => {
    //punto 1
    //desestructuración y operador rest
    const { password, names, address, email, username } = req.body
    const hashedpassword = await bcrypt.hash(password, 10)

    if (!password || !names || !address || !email || !username) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const userData = {
        id: uuidv4(),
        username,
        password: hashedpassword,
        names,
        address,
        email
    }
    const user = await userModel.registerUserModel(userData)
    //punto 3
    res.status(201).json(user)
}

const loginUserController = async (req, res) => {
    //punto 1
    const { username, password } = req.body
    try {
        //punto 2

        if (!username || !password) {
            return res.status(400).json({ error: 'username y password son obligatorios' });
        }

        const user = await userModel.loginUserModel(username, password)
        res.status(200).json(user)


        //punto 3
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export {
    registerUserController, loginUserController
}