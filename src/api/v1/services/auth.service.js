import mongoose from "mongoose";
import OperationFailure from "../../../utils/espress/operation.js";
import User from "./user.service.js";
import { z } from "zod";
import { validate } from "../../../utils/validator/index.js";

import VerificationModel from "./models/Verification.js";

export default class Auth {
    static _bearer = z.string().refine((value) => value.startsWith('Bearer '));
    static _pin = z.string().min(6).max(6).regex(/^\d+$/);
    static confirmEmail = z.object({ pin: this.pin }).required()


    static validate = {
        loginEmail: async (req) => await validate(req.body, z.object({
            email: User._email,
            password: User._password
        }).required(), 404),

        loginUsername: async (req) => await validate(req.body, z.object({
            username: User._username,
            password: User._password
        }).required(), 404),

        headerAuthorization: async (req) => validate(req.headers, z.object({
            authorization: this._bearer
        }).required(), 404),

        confirmEmail: async (req) => validate(req.body, z.object({
            pin: this._pin
        }).required(), 400),

    }

    static createEmailValidation = async (user, pin) => {
        try {
            // If user had email verification, update it. else create a new one;
            const filter = { subject: "email", owner: user.id };
            const update = {
                subject: "email",
                owner: user.id,
                data: {
                    pin: pin,
                    email: user.email,
                    expiration: Date.now() + 30 * 24 * 60 * 60 * 1000
                }
            };
            const options = { new: true, upsert: true, setDefaultsOnInsert: true }
            return await VerificationModel.findOneAndUpdate(filter, update, options);
        } catch (caught) {
            OperationFailure.autoCatch(caught);
        }
    }

    static validatEmailVerificatioon = async (user, pin) => {
        try {
            const verification = await VerificationModel.findOne({
                owner: mongoose.Types.ObjectId.createFromHexString(user.id)
            });
            console.log({ verification, pin })
            if (!verification) {
                throw new OperationFailure("confirmVerification", ["Verification never started"], 500);
            }
            if (pin !== verification.data.pin) {
                throw new OperationFailure("confirmVerification", ["PIN Incorrect"], 500);
            }
            await User.updateByID(user.id, { emailVerified: true });
        } catch (caught) {
            OperationFailure.autoCatch(caught);
        }
    }
}