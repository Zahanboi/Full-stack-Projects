import { Schema } from "mongoose";

const userSchema = new Schema(
    {
       name: {type: String, required: true},
       userName: {type: String, required: true, unique: true},
       password: { type: String , required: true },
       token: { type: String, required: true }
    }

)

const User = mongoose.model("User", meetingSchema);

export { User };