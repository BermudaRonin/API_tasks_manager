import { object, z } from "zod"
import { model, Schema } from "mongoose";

import Database from "./database.service.js";
import Password from "./pass.service.js";

const UserModel = model("User", new Schema({
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
}))


export default class User {

    static schema = class {
        // Enhance ValidationError = field, condition, message
        static email = z
            .string({ message: "Email must be a string" })
            .email("Wrong email address format")
            .min(8, "Email must be 8 chars min")
            .max(50, "Email must be 50 chars max")
            .toLowerCase()
            .trim()


        static username = z
            .string({ message: "Username must be a string" })
            .min(6, "Username must be 6 chars min")
            .max(50, "Username must be 50 chars max")
            .toLowerCase()
            .trim()

        static password = z
            .string()
            .regex(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, "Password must include at least 1 special character")
            .regex(/^(?=.*\d).*$/, "Password must  include at least 1 number")
            .regex(/^(?=.*[A-Z]).*$/, "Password must include at least 1 uppercase letter")
            .min(8, "Password must be 8 chars min")
            .max(50, "Password must be 50 chars max")

        static register = z.object({
            email: this.email,
            username: this.username,
            password: this.password
        });

        static loginEmail = z.object({
            email: this.email,
            password: this.password,
        });

        static loginUsername = z.object({
            username: this.username,
            password: this.password,
        });
    };

    static formatOne = (user = {}) => ({
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    })

    static createOne = async (credentials, format = false) => {
        try {
            const plainPassword = credentials.password;
            const hashedPassword = await Password.hash(plainPassword);
            const data = { ...credentials, hashedPassword }
            const user = await Database.createOne("user", UserModel, data, format ? this.formatOne : null);
            return user;
        } catch (error) {
            throw error;
        }
    }

    static getOneByEmail = async (email, format = false) =>
        await Database.getOne("user", UserModel, { email }, format ? this.formatOne : null);

    static getOneByUsername = async (username, format = false) =>
        await Database.getOne("user", UserModel, { username }, format ? this.formatOne : null);

    static getOneByID = async (id, format = false) =>
        await Database.getOne("user", UserModel, { id }, format ? this.formatOne : null);


    static updateOneByID = async (id, update = {}) => {
        try {
            const _update = {};

            if (Object.keys(update).length === 0) return null;

            if (update.password) {
                _update.password = await Password.hash(update.password);
                delete update.password; // remove password from original update object
            }

            // Copy non-password fields from update to _update
            Object.assign(_update, update);

            // Update user
            const user = await Database.updateOne(UserModel, { id }, _update);

            console.log({ user })
            return user;

        } catch (error) {
            throw error
        }
    }

    static _updateOne = async (id, update) => await UserModel.findByIdAndUpdate(id, { ...update }, { new: true })

}