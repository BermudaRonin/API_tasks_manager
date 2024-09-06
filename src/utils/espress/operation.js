import config from "./config.js";

export default class OperationFailure {
    constructor(name, errors, code) {
        this.name = name;
        this.code = code;
        this.errors = errors ? config.operation.formatErrors(errors) : config.operation.emptyErrs;
    }


    // TODO: 
    static manualCatch = () => null

    static autoCatch = (caught) => {
        if (caught instanceof OperationFailure) {
            throw caught;
        } else {
            const name = this.name;
            const errors = []
            throw new OperationFailure(name, errors, 500);
        }
    }
}