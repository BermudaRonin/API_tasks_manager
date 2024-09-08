import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { Issue, Exception } from '../utils/index.js';

const jwtPrivate = process.env.JWT_PRIVATE;

export default class Token {

    static schema = class {
        static token = z.string().regex(/^[\w-]+\.[\w-]+\.[\w-]+$/)

        static accessToken = z.object({
            authorization: z.string().refine((value) => value.startsWith('Bearer '))
        }).required();

        static emailToken = z.object({
            emailToken: this.token
        }).required();


    }

    static lifetime = {
        default: "30d",
        access: "7d",
        accessExtended: "30d",
        email: "30m",
        password: "30m",
    }

    static subject = {
        default: "custom",
        access: "access",
        email: "email",
        password: "password",
    }

    static generate = async (subject, data = {}, lifetime) => {
        try {
            const payload = { data: data }
            const options = {
                algorithm: "HS256",
                expiresIn: lifetime || this.lifetime.default,
                subject: subject || this.subject.default,
            }
            return jwt.sign(payload, jwtPrivate, options);
        } catch (error) {
            throw new Exception("Token.generate()", error);
        }
    }

    static parse = async (subject, token) => {
        try {
            return jwt.verify(token, jwtPrivate);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Issue.TokenExpired(subject);
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Issue.TokenInvalid(subject);
            }
            throw new Exception("Token.parse()", error);
        }
    }

    static generateAccessToken = (user, rememberMe) => this.generate(this.subject.access, { user }, rememberMe ? this.lifetime.accessExtended : this.lifetime.access);
    static generateEmailToken = (id, email) => this.generate(this.subject.email, { id, email }, this.lifetime.email);
    // static generatePasswordToken = (user) => this.generate(this.subject.password, { user }, this.lifetime.password);

    static decodeAccessToken = (token) => Token.parse(this.subject.access, token);
    static decodeEmailToken = (token) => Token.parse(this.subject.email, token);
    // static decodePasswordToken = (token) => Token.parse(this.subject.password, token);
}
