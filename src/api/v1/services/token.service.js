
import jwt from 'jsonwebtoken';
import OperationFailure from '../../../utils/espress/operation.js';

const jwtPrivate = process.env.JWT_PRIVATE

class Token {
    static generate = async payload => {
        try {
            const token = jwt.sign(payload, jwtPrivate);
            return token;
        } catch (error) {
            throw new OperationFailure("Token.generate()", [error.message], 400)
        }
    };

    static parse = async token => {
        try {
            const payload = jwt.verify(token, jwtPrivate)
            return payload;
        } catch (error) {
            throw new OperationFailure("Token.parse()", [error.message], 403)
        }
    };

}

export class AccessToken extends Token {

}

export class RefreshToken extends Token {

}

export class PasswordToken extends Token {

}