import { Schema, model } from "mongoose";


const schema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        lowercase: true,
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
    timestamps: true,
    autoIndex: true
})


const UserModel = model("User", schema);


UserModel.createIndexes()
  .then(() => console.log('Indexes created'))
  .catch(err => console.error('Error creating indexes:', err));


export default  UserModel;
