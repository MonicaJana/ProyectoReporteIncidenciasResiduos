import express from 'express'
import morgan from 'morgan'
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'

import reclamosRoute from './routes/reclamos_routes.js'
import usuariosRoute from './routes/users_routes.js'
import schedulesRoute from './routes/schedules_routes.js'
dotenv.config()

//inicializaciones
const app = express()
app.use(morgan('dev'))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.use( fileUpload ( { 
    useTempFiles : true , 
    tempFileDir : './uploads' 
})) ;

app.set('port', process.env.port || 3000)

app.use(express.json())

app.get('/', (req,res) => res.send("Server on"))


app.use('/api/v1',reclamosRoute)
app.use('/api/v1',usuariosRoute)
app.use('/api/v1',schedulesRoute)

export default app 