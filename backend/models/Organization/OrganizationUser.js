import mongoose, { trusted } from "mongoose";

const organization_schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
       
        phone_number: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        }
    },

    {timestamps : true}
)

const organization_user = mongoose.model('organization_user' , organization_schema);

export default organization_user;

