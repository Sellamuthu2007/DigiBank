import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        isverified: {
            type: Boolean,
            default: false,
        }
    },
     { timestamps: true }
)

const user = mongoose.model("Auth", userSchema);

export default user;