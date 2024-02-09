'use strict'

import express from "express"

import { deleteAnimal, keepAnimal, search, updateAnimal } from "./animal.controller.js"

const api = express.Router()

api.post('/keepAnimal', keepAnimal)
api.post('/search', search)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)

export default api