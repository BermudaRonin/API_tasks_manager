import bcrypt from 'bcrypt';

import { Issue, Exception } from '../utils/index.js';

const saltRounds = parseInt(process.env.SALT_ROUNDS)

export class PIN {
    static generate = async () => {
        try {
            const pin = Math.floor(100000 + Math.random() * 900000).toString();
            return pin;
        } catch (error) {
            throw new Exception("PIN.generate()", error);
        }
    };
}

export default class Password {

    static hash = async (plain) => {
        try {
            return await bcrypt.hash(plain, saltRounds)
        } catch (error) {
            throw new Exception("Password.hash()", error);
        }
    };

    static compare = async (plain, hashed) => {
        try {
            const match = await bcrypt.compare(plain, hashed)
            if (!match) {
                throw new Issue.Validation({ field: "password", message: "Incorrect password" })
            }
            return match
        } catch (error) {
            throw new Exception("Password.compare()", error);
        }
    };

    static generate = async () => {
        try {
            const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
            return password;
        } catch (error) {
            throw new Exception("Password.generate()", error);
        }
    };

}

