import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    hashedPassword: {
        type: Schema.Types.String,
        required: true
    },
    emailVerified: {
        type: Schema.Types.Boolean,
        default: false
    },
}, {
    timestamps: true
})

const UserModel = model("User", userSchema)


export default UserModel;