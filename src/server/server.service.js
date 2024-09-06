
const port = process.env.SERVER_PORT;

export default class Server {
    static connect = (app) => {
        app.listen(port, (err) => {
            if (err) {
                console.error(err);
                // TODO dev err
                throw new Error("Server connection error!!");
            }
            return console.info(`▶️▶️▶️ Server running on ${port}`)
        })
    }
}