// import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { mongooseConnect } from "./connectToDb";
import { connectToMongooseAndCache } from "./connectToDbAndCache";

const app = express();

console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("REACT_APP_MONOREPO_FRONTEND_URL: " + process.env.REACT_APP_MONOREPO_FRONTEND_URL);
console.log("MONGODB_URI", env.MONGODB_URI);

// mongooseConnect();
connectToMongooseAndCache();

app.set('trust proxy', 1);

// Configure cookies based on environment
const cookieOptions: session.CookieOptions = {
    maxAge: 60 * 60 * 1000,
};
if (env.NODE_ENV === 'production') {
    cookieOptions.sameSite = 'none'; // Required for cross-origin requests,
    cookieOptions.secure = true;     // Required when sameSite is 'none', needs HTTPS (stops working on localhost i think)
}

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: cookieOptions,
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGODB_URI
    }),
}));

// Note on CORS origin: Vercel generates 3 URLS, one of which changes per deployment.
const corsOptions = {
    origin: [env.REACT_APP_MONOREPO_FRONTEND_URL], // Allow requests only from these origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies, if your application uses them
    optionsSuccessStatus: 204,
};
console.log('Allowed CORS origins: ', corsOptions.origin.join(', '));
app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public'))); // Send the favicon/public files

console.log('session middleware configured');

app.get('/', (req, res) => {
    res.send('Hello from Vercel Express Mongoose!');
});
app.use("/api/users", userRoutes);
// app.use("/api/notes", requiresAuth, notesRoutes);
app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

console.log('post 404 middleware');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

console.log('post 500 middleware');

// In production this is instead handled by Vercel because I've defined a vercel.json file
if (env.NODE_ENV === 'development') {
    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`);
    });
}


export default app;