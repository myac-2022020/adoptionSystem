'use strict'

import User from './user.model.js'// Unico que puede ir en Mayuscula
import { checkPassword, encrypt, checkUpdate} from '../utils/validator.js'
import { hash } from 'bcrypt'


export const test = (req, res)=>{
    return res.send('Hello world')
}

export const register = async(req, res)=>{
    try {
        // Capturar la informacion del cliente(Body)
        let data = req.body;
        console.log(data)
        // Encriptar la contraseña
        data.password = await encrypt(data.password)
        // Asignar rol por defecto
        data.role = 'CLIENT' //Si viene con otro valor o no viene, se le asigna a role client
        // Crear una instancia por modelo (schema)
        let user = new User(data)
        // Guardar la informacion
        await user.save()
        // Respuesta al usuario
        return res.send({message: 'Registered successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering user ',err})
    }
}

export const login = async(req, res) => {
    try{
        // Capturar los datos del body
        let { username, password } = req.body 
        // Validar que el usuario exista 
        let user = await User.findOne({username}) // buscar un solo registro 
        // Verifico que la contraseña coincida 
        if(user && await checkPassword(password, user.password)){
            let loggedUser = { 
                username: user.username,
                name: user.name,
                role: user.role
            }
            // Responde al usuario
            return res.send({message: `Welcome ${user.name}`, loggedUser})
        }
        return res.status(404).send({message: 'Invalid Credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const update =  async(req, res)=>{
    try {
        // Obtener el id del usuario logeado
        let { id } = req.params
        // Obtener los datos
        let data = req.body
        // Validar si trae datos al actualizar
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message:'Have submitted some data that canot be update or missing data'})
        // Validar si tiene permisos para actualizar (tokenizacion) Se vera la semana 5
        // Actualizamos los datos
        let updateUser = await User.findOneAndUpdate(
            {_id: id}, // ObjectId: <- Hexadecimal(Hora sys, version mongo, llave privada...)
            data, // Dstos que va a actualizar
            {new: true} // Objeto de la DB ya actualizado
        )
        // Validar si se actualizo
        if(!updateUser) if (!update ) return res.status(400).send({message: 'User not founf and not updated'})
        // Responder con el dato actualizado
            return res.send({message:'Update user', updateUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message:'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try {
        // Obtener el id
        let { id } = req.params    
        // Eliminar (deleteOne / findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({_id: id})
        // Verificar que se elimino
        if(!deletedUser) return res.status(404).send({message: 'The acount not found and not deleted'})
        // Responder
        return res.send({message:`Account whit username ${deletedUser.username} delete successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting acount'})
    }
}