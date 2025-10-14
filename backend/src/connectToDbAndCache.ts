import mongoose from "mongoose";
import env from "./util/validateEnv";

console.log('Connecting to Mongoose... ');

// --- start: replace direct mongoose.connect with cached connection for serverless ---
declare global {
    // allow storing a cache on global (Node globalThis)
    // eslint-disable-next-line @typescript-eslint/no-namespace
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

export function connectToMongooseAndCache() {
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

