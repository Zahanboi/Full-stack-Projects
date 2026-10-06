const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.plugin(passportLocalMongoose); //automatically includes username and password with hashing and salting makes authenticate, serializeUser and deserializeUser methods available on the User model we can also deifne them by ourselves if not using passport-local-mongoose

module.exports = mongoose.model("User", UserSchema);