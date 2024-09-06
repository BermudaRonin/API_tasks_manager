import mongoose from 'mongoose';

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

}