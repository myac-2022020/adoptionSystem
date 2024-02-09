// Encriptar. validar... diferentes datos
import { compare, hash } from 'bcrypt'

// user.controller

export const encrypt = (password)=>{
    try {
        return hash(password, 10) // Promedio de capas 8 a 10
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err)
    }
}

export const checkUpdate =(data, userId)=>{
    if(userId){
        if(
            Object.entries(data).length === 0 ||
            data.username ||
            data.username == '' ||
            data.password ||
            data.password == ''||
            data.role ||
            data.role == ''
            ) return false
            return true
    }else{
        return false
    }
}

// animal.controller

export const checkUpdateAnimal = (data, animalId)=>{
    if(animalId){
        if(
            Object.entries(data).length === 0 ||
            data.name == '' ||
            data.race == '' ||
            data.keeper == ''
        ) return false
        return true
    }else{
        return false
    }
}