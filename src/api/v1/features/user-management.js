import { ResponseFailure, ResponseSuccess, Validate } from '../utils/index.js';

import Token from "../services/token.service.js";
import User from "../services/user.service.js";

export default class UserManagement {

    static createUser = async function (req, res) {
        try {
            const credentials = await Validate(req.body, User.schema.register);
            const user = await User.createOne(credentials, true);
            const accessToken = await Token.generateAccessToken(user, false);
            res.status(201).json(new ResponseSuccess("User created", { accessToken, user }));
        } catch (error) {
            const { json, status } = new ResponseFailure(error);
            res.status(status).json(json);
        }
    }

    static updateUser = async function (req, res) {
        res.status(200).json(new ResponseSuccess("User updated"));
    }

    static deleteUser = async function (req, res) {
        res.status(200).json(new ResponseSuccess("User deleted"));
    }

}