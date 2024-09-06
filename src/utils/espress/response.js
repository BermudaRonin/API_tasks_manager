
import config from './config.js';

export default class Response {
    constructor(success, message, data, errors) {
        this.success = success;
        this.message = message;
        this.data = data ? config.response.formatData(data) : config.response.emptyData;
        this.errors = errors ? config.response.formatErrors(errors) : config.response.emptyErrors;
    }

    static OK = (res, status, message, data) => {
        return res.status(status).json(new Response(true, message, data, null))
    }
    static KO = (res, status, message, errors) => {
        return res.status(status).json(new Response(false, message, null, errors))
    }
}