import { checkUpdate, checkUpdateAnimal } from '../utils/validator.js'
import Animal from './animal.model.js'

export const keepAnimal = async(req, res)=>{
    try {
        let data = req.body
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: 'Registered Successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error when registering a pet'})
    }
}

export const updateAnimal = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdateAnimal(data, id)
        if(!update) return res.status(400).send({message:'The animal is not found, the data is not update'})
        let updatePet = await Animal.findOneAndUpdate(
            {_id: id}, 
            data,
            {new: true}
        )
        if(!updatePet) return res.status(401).send({message: 'Animal not found and update'})
        return res.send({message: 'The data by animal is update successfully', updatePet})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'The animal is not found'})
    }
}

export const deleteAnimal = async(req, res)=>{
    try {
        let { id } = req.params
        let deleteAnimal = await Animal.findOneAndDelete({_id: id})
        if(!deleteAnimal) return res.status(400).send({message:'Animal not found and deleting'})
        return res.send({message: `Animal with name ${deleteAnimal.name} delete successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'The Animal is not found'})
    }
}