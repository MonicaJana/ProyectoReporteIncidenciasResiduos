import userModel from "../models/users.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid";
import { createToken } from "../middlewares/auth.js";

const registerUserController = async (req, res) => {
    const { password, names, address, email, username } = req.body;

    if (!password || !names || !address || !email || !username) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const lowercaseNames = names.toLowerCase();
        const lowercaseAddress = address.toLowerCase();
        const lowercaseEmail = email.toLowerCase();

        const userData = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            names: lowercaseNames,
            address: lowercaseAddress,
            email: lowercaseEmail
        };

        const user = await userModel.registerUserModel(userData);

        res.status(201).json(user);
    } catch (error) {
        console.error('Error en el registro de usuario:', error);
        res.status(500).json({ error: 'Error en el registro de usuario' });
    }
};

export default registerUserController;

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