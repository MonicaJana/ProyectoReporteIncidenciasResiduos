import { createToken } from '../middlewares/auth.js'; 
import bcrypt from 'bcrypt';
import User from '../models/users.js';

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ success: "Usuario registrado con éxito", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error en el registro de usuario" });
  }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "Username o password inválido" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // Generar token JWT
        const token = createToken({
          id: user._id,
          username: user.username,
        });
  
        // Retornar usuario y token
        res.json({ success: "Login exitoso", user, token });
      } else {
        res.status(400).json({ error: "Username o password inválido" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Error en el login" });
    }
  };

export {
    registerUser,
    loginUser
}