import { z } from "zod"
import OperationFailure from "../../../utils/espress/operation.js"
import { validate } from "../../../utils/validator/index.js";
import UserModel from "./models/User.js";


export default class User {
    static model = UserModel;

    static _email = z.string()
    static _username = z.string()
    static _password = z.string()

    static validate = {
        register: async (req) => await validate(req.body, z.object({
            email: this._email,
            username: this._username,
            password: this._password
        }).required()),
    }

    static format = {
        user: (user) => ({
            username: user.username,
            email: user.email,
            emailVerified: user.emailVerified,
            id: user.id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    }

    // Create

    static register = async (credentials, format = false) => {
        try {
            const user = await UserModel.create(credentials)
            if (!user) {
                throw new OperationFailure("Create user", ["User not created"], 500);
            }
            return format ? this.format.user(user) : user
        } catch (caught) {
            if (caught.name == "MongoServerError" && caught.code == 11000) {
                throw new OperationFailure("Create user", ["Email address already exists. Please try a different email address."], 409)
            }
            OperationFailure.autoCatch(caught);
        }
    }

    static getByUsername = async (username) => await this.model.findOne({ username: username })
    static getByEmail = async (email) => await this.model.findOne({ email: email })
    static getByID = async (id) => await this.model.findById(id)

    static updateByID = async (id, update) => await this.model.findByIdAndUpdate(id, { ...update }, { new: true })

}