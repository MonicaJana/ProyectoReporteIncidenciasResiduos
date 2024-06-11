import bcrypt from "bcrypt"
import { createToken } from "../middlewares/auth.js";

const userModel = {

    async registerUserModel(newUser) {
        const url = "http://localhost:4000/users"
        const peticion = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" }
        })
        const data = peticion.json()
        return data;
    },

    async loginUserModel(userName, password) {
        //punto 1
        const url = "http://localhost:4000/users"
        const response = await fetch(url)
        const users = await response.json()
        const user = users.find(user => user.username === userName)
        if (!user) {
            return { error: "Username o password invalido" }
        }
        const passwordMatch= await bcrypt.compare(password, user.password)

            if (user && passwordMatch) {
                //punto 2
                //crear token cuando se loguea correctamente con datos validos de usuario y contraseña 
                const token = createToken(user)
                return {user,token}
            }else{
                return { error: "Username o password invalido" }
            }
    }

}

export default userModel