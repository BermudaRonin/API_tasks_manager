import { z } from "zod"
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
        static email = z.string();
        static username = z.string();
        static password = z.string();

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


    static _updateOne = async (id, update) => await UserModel.findByIdAndUpdate(id, { ...update }, { new: true })

}