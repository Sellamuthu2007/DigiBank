import mongoose, { trusted } from "mongoose";

const organization_schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
       
        phone_number: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    },

    {timestamps : true}
)

