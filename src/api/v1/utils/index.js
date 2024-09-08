import { z } from "zod";
import { capitalize } from "./helpers.js";

export class Issue {
    constructor(status, message, errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    // DATA

    static Validation = class ValidationIssue extends this {
        constructor(errors) {
            super(400, "Validation error", errors)
        }
    }


    // DATABASE

    static Duplicates = class DuplicatesIssue extends this {
        constructor(errors) {
            super(409, "Duplicates error", errors)
        }
    }

    static NotFound = class NotFoundIssue extends this {
        constructor(item = "") {
            super(404, `${capitalize(item)} not found`)
        }
    }

    // AUTHENTICATION

    static TokenInvalid = class TokenInvalidIssue extends this {
        constructor(subject = "") {
            super(400, `${capitalize(subject)} token is invalid`)
        }
    }
    static TokenExpired = class TokenExpiredIssue extends this {
        constructor(subject = "") {
            super(400, `${capitalize(subject)} token has expired`)
        }
    }

    // MAILER

    static EmailNotSend = class EmailNotSendIssue extends this {
        constructor() {
            super(500, `Email not send!`)
        }
    }
    static NotCreated = class NotFoundIssue extends this {
        constructor(item = "") {
            super(500, `${capitalize(item)} not created`)
        }
    }
}

export class Exception {
    constructor(label, error) {
        this.label = label;
        this.error = error;
    }
}


/// Validation
export class Validation {
    static run = (v, s) => {
        try {
            const { success, data, error } = s.safeParse(v);
            if (!success) {
                const errors = error.issues.map(issue => ({ field: issue.path?.[0], message: issue.message }));
                throw new Issue.Validation(errors);
            } else {
                return data;
            }
        } catch (error) {
            throw error
        }
    }
    static obj = (v, s = {}) => this.run(v, z.object(s).required());
}


export const Validate = (v, s) => {
    const { success, data, error } = s.safeParse(v);
    if (!success) {
        const errors = error.issues.map(issue => ({ field: issue.path?.[0], message: issue.message }));
        throw new Issue.Validation(errors);
    } else {
        return data;
    }
}

// Response

export class ResponseSuccess {
    constructor(message = "", data) {
        this.success = true;
        this.data = data || null;
        this.errors = null;
        this.message = message;
    }
}
export class ResponseFailure {

    setErrors(error) {
        if (error instanceof ReferenceError) {
            console.warn(error);
            return null
        }
        if (error instanceof Issue) {
            const errors = error.errors;
            if (Array.isArray(errors) && errors.length > 0) return errors
            if (errors) return [errors];
        }
        return null
    }
    constructor(error) {
        this.json = {
            success: false,
            data: null,
            errors: this.setErrors(error),
            message: error instanceof Issue ? error.message : error instanceof Exception ? "Exception at : " + error.label : "..."
        }
        this.status = error instanceof Issue ? error.status : 500;
    }
}
