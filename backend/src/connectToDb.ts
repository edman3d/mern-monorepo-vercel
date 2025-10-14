import mongoose from "mongoose";
import env from "./util/validateEnv";

export function mongooseConnect() {
    console.log('Connecting to Mongoose... ');
    mongoose.set("strictQuery", false); // get rid of annoying warning about upcoming change in mongoose 7
    mongoose.connect(env.MONGODB_URI)
        .then(() => {
            console.log("Mongoose connected");
        })
        .catch(err => console.error('MongoDB connection error:', err));


    console.log('post-connection hello');

    const conn = mongoose.connection;

    conn.on('connecting', () => console.log('Mongoose: connecting...'));
    conn.on('connected', () => console.log('Mongoose: connected'));
    conn.once('open', () => console.log('Mongoose: connection open'));
    conn.on('reconnected', () => console.log('Mongoose: reconnected'));
    conn.on('error', (err) => console.error('Mongoose: connection error:', err));
    conn.on('disconnected', () => console.warn('Mongoose: disconnected'));
    conn.on('close', () => console.log('Mongoose: connection closed'));
    conn.on('reconnectFailed', () => console.error('Mongoose: reconnect failed'));
}