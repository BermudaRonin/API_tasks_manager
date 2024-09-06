import { model, Schema } from "mongoose";

const VerificationSchema = new Schema({
    subject: {
        type: Schema.Types.String,
        required: true,
        enum: ["email"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    data: {
        email: Schema.Types.String,
        pin: Schema.Types.String,
        expiration: Schema.Types.Date,
    },

})

const VerificationModel = model("Verification", VerificationSchema)

export default VerificationModel;
