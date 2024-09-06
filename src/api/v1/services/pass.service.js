import bcrypt from 'bcrypt';
import OperationFailure from '../../../utils/espress/operation.js';

const saltRounds = parseInt(process.env.SALT_ROUNDS)


export class PIN {
    static generate = async () => {
        try {
            const pin = Math.floor(100000 + Math.random() * 900000).toString();
            return pin;
        } catch (error) {
            throw new OperationFailure("PIN.generate()", [error.message])
        }
    };
}

export default class Password {

    static hash = async (plain) => {
        try {
            const hashed = await bcrypt.hash(plain, saltRounds)
            return hashed
        } catch (error) {
            throw new OperationFailure("Password.hash()", [error.message], 500)
        }
    };

    static compare = async (plain, hashed) => {
        try {
            const match = await bcrypt.compare(plain, hashed)
            return match
        } catch (error) {
            throw new OperationFailure("Password.compare()", [error.message], 400)
        }
    };

    static generate = async () => {
        try {
            const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
            return password;
        } catch (error) {
            throw new OperationFailure("Password.generate()", [error.message])
        }
    };

}

