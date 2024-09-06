import OperationFailure from "../espress/operation.js";


export const validate = async (values, schema, code = 400) => {
    const { success, data , error } = schema.safeParse(values);
    if (!success) {
        const errors = error.issues.map(issue => ({
            message: issue.message,
            field: issue.path?.[0],
            code: issue.code
        }))
        throw new OperationFailure("Validator", errors, code);
    } else {
        return data;
    }
}
