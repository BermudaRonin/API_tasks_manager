import { ResponseFailure, ResponseSuccess, Issue, Validate } from '../utils/index.js';

import Password from "../services/pass.service.js";
import Token from "../services/token.service.js";
import User from "../services/user.service.js";

export default class UserAuthentication {

    static getUserMiddleware = async function (req, res, next) {
        try {
            const header = await Validate(req.headers, Token.schema.accessToken);
            const accessToken = header.authorization.split(" ")[1]

            const payload = await Token.decodeAccessToken(accessToken);

            let user = await User.getOneByID(payload.data.user.id, true);

            if (!user) {
                throw new Issue.NotFound("user");
            }

            req.user = user;
            next();

        } catch (error) {
            const { json } = new ResponseFailure(error);
            res.status(401).json(json);
        }
    }

    static loginUser = async function (req, res) {
        try {
            let credentials = {};
            let user = null;

            if ("username" in req.body) {
                credentials = await Validate(req.body, User.schema.loginUsername, false);
                user = await User.getOneByUsername(credentials.username);
                if (!user) {
                    throw new Issue.Validation([{ path: "username", message: "Username not found" }]);
                }
            }

            if ("email" in req.body && !user) {
                credentials = await Validate(req.body, User.schema.loginEmail, false);
                user = await User.getOneByEmail(credentials.email);
                if (!user) {
                    throw new Issue.Validation([{ path: "email", message: "Email not found" }]);
                }
            }

            const match = await Password.compare(credentials.password, user.hashedPassword);

            if (!match) {
                throw new Issue.Validation([{ path: "password", message: "Password incorrect" }]);
            }

            user = User.formatOne(user);

            const accessToken = await Token.generateAccessToken(user, credentials.rememberMe);

            res.status(200).json(new ResponseSuccess("User logged", { accessToken, user }));

        } catch (error) {
            const { json, status } = new ResponseFailure(error);
            res.status(status).json(json);
        }
    }

    static getUser = async function (req, res) {
        const user = req.user;
        return res.status(200).json(new ResponseSuccess("User fetched", { user }))
    }

}