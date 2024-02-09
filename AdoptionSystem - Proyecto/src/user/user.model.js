import mongoose, { trusted } from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true, //Solo puede existir un usuario unico
        lowercase: true,
        required: true,
    },
    password:{
        type: String,
        minLenth: [8, 'Password must be 8 characters'],
        required: true
    },
    phone:{
        type: String,
        minLenth: 8,
        maxLength: 8,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type: String,
        uppercase: true,
        enum: ['ADMIN','CLIENT'], // Solo aquellos datos dentro del arreglo son validos
        required: true
    }

})

// Pre mongoose
                            // Pluralizar
export default mongoose.model('user', userSchema)