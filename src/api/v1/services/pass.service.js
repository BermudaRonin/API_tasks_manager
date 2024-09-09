import bcrypt from 'bcrypt';
import { Exception } from '../utils/index.js';

const saltRounds = parseInt(process.env.SALT_ROUNDS);

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
            return await bcrypt.compare(plain, hashed)
        } catch (error) {
            throw new Exception("Password.compare()", error);
        }
    };

}

