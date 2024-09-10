import express from "express";
import { Issue, ResponseFailure } from "../../api/v1/utils/index.js";

export default class Body {

    static config = {
        json: {
            verify: (req, res, buf, encoding) => {
                try {
                    JSON.parse(buf.toString(encoding));
                } catch (error) {
                    const issue = new Issue.InvalidRequest("Invalid JSON payload. Please ensure the request body is a valid JSON object.");
                    const { status, json } = new ResponseFailure(issue)
                    return res.status(status).json(json);
                }
            }
        }
    }


    static json = express.json(this.config.json);
}