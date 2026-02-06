import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema(
    {
        name:{
          type: String,
          required: true
        },

        phone_number:{
            type: String,
            required:true,
            unique: true
        },

        email:{
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps : true,
    }
);

const Institution_user = mongoose.model('Institution_user' , institutionSchema);

export default Institution_user;

