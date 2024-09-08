import { Issue, ResponseFailure, ResponseSuccess, Validate, Validation } from '../utils/index.js';

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
        try {
            const user = req.user;
            let schema = {};

            // Add 'build update schema' in Database;

            if ("email" in req.body) {
                schema.email = User.schema.email;
            }
            if ("username" in req.body) {
                schema.username = User.schema.username;
            }
            if ("password" in req.body) {
                schema.password = User.schema.password;
            }

            if (Object.keys(schema).length > 0) {

                const update = await Validation.obj(req.body, schema);

                await User.updateOneByID(user.id, update)

                res.status(200).json(new ResponseSuccess("User updated"));

            } else {
                throw new Issue.InvalidRequest()
            }
        } catch (error) {
            const { json, status } = new ResponseFailure(error);
            res.status(status).json(json);
        }
    }

    static deleteUser = async function (req, res) {
        res.status(200).json(new ResponseSuccess("User deleted"));
    }

}