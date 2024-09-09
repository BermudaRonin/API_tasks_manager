import mongoose from "mongoose";
import { Issue, Exception } from '../utils/index.js';


const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    clusterURL: process.env.DB_CLUSTER_URL,
    clusterName: process.env.DB_CLUSTER_NAME,
    dbName: process.env.DB_NAME,
}

export default class Database {

    static async connect() {
        const { username, password, clusterURL, clusterName, dbName } = config;

        const connectionString = `mongodb+srv://${username}:${password}@${clusterURL}/?retryWrites=true&w=majority&appName=${clusterName}`;
        const connectionOptions = { dbName };

        try {
            await mongoose.connect(connectionString, connectionOptions);
            console.info(`▶️▶️▶️ MongoDB Database connected - ${mongoose.connection.db.databaseName}`);
        } catch (error) {
            console.error(`▶️▶️▶️ MongoDB Database connection error!! - ${error.message}`);
        }
    }


    static createOne = async (label, model, data = {}, format) => {
        try {
            const created = await model.create(data)
            // if (!created) {
            //     throw new Issue.NotCreated(label);
            // }
            return format ? format(created) : created;

        } catch (error) {
            throw error;
            // if (error.name == "MongoServerError" && error.code == 11000) {
            //     // TODO: Get duplicated fields from the error; 
            //     console.log(error.keyValue);
            //     console.log(error.keyPattern);
            //     console.log(error.index);
            //     // console.log(error.errorResponse);
            //     throw new Issue.Duplicates()

            // } else if (error.name == "ValidationError") {

            //     throw new Exception(`Database.createOne(${label})`, error)

            // } else {

            //     throw error;

            // }
        }

    }

    static getOne = async (label = "", model, query = {}, format) => {
        try {
            let found = null;

            if (Object.keys(query).length == 1 && "id" in query) {
                found = await model.findById(query.id);
            } else if (Object.keys(query).length > 0) {
                found = await model.findOne(query)
            }

            if (found) return format ? format(found) : found;
            return null
        } catch (error) {
            throw new Exception("Database.getOne()", error);
        }
    }


    static updateOne = async (model, query = {}, data = {}) => {
        try {
            const options = { new: true }

            if (Object.keys(query).length > 0 && Object.keys(data).length > 0) {

                let updated = null;

                if (Object.keys(query).length == 1 && "id" in query) {
                    updated = await model.findByIdAndUpdate(query.id, data, options);
                } else if (Object.keys(query).length > 0) {
                    updated = await model.findOneAndUpdate(query, data, options);
                }

                return updated;

            } 

        } catch (error) {
            throw error;
        }
    }


    static updateOrCreateOne = async (model, query = {}, data = {}) => {
        try {
            const options = { new: true, upsert: true, setDefaultsOnInsert: true }

            let updatedOrCreated = null;

            if (Object.keys(query).length == 1 && "id" in query) {
                updatedOrCreated = await model.findByIdAndUpdate(query.id, data, options);
            } else if (Object.keys(query).length > 0) {
                updatedOrCreated = await model.findOneAndUpdate(query, data, options);
            }

            return updatedOrCreated;

        } catch (error) {
            throw error;
        }
    }


}