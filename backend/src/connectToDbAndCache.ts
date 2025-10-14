import mongoose from "mongoose";
import env from "./util/validateEnv";

export function connectToMongooseAndCache() {
    console.log('Connecting to Mongoose... ');
    mongoose.set("strictQuery", false); // get rid of annoying warning about upcoming change in mongoose 7

    const cache = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

    const mongooseConnectOptions = {
        // tune poolSize / keepAlive as needed for Vercel
        // poolSize: 5, // optional
        // keepAlive: true,
        // bufferCommands: false, // recommended
    };

    if (!cache.promise) {
        cache.promise = mongoose.connect(env.MONGODB_URI, mongooseConnectOptions)
            .then((m) => {
                console.log("Mongoose connected (cached)");
                return m;
            })
            .catch(err => {
                console.error("MongoDB connection error (cached):", err);
                // Clear the cached promise so future attempts can retry
                cache.promise = null;
                throw err;
            });
    }

    // Optionally set cache.conn after promise resolves (not strictly required)
    cache.promise.then(m => (cache.conn = m)).catch(() => {/* already logged */ });
}

