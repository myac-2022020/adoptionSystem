// Configuracion a MongoDB


// ECMAScrpt modules
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'

// Configuraciones
const app = express() // Crear el servidor
config()
const port = process.env.PORT || 3200

// Configurar el servidor de express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) // Aceptar las solicitudes de diferentes origenes, entiendase de forma local o Framework. Basicamente son las politicas de acceso al servidor
app.use(helmet()) // Aplica capa de seguridad
app.use(morgan('dev')) // Crea logs de solicitudes al servidor HTTP

//Declaracion de rutas
app.use(userRoutes)
app.use(animalRoutes)

// Levatar el servidor

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}
