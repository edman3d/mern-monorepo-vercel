import "dotenv/config";
// import dotenv from "dotenv";
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
const app = express();

console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
console.log("process.env.REACT_APP_MONOREPO_FRONTEND_URL: " + process.env.REACT_APP_MONOREPO_FRONTEND_URL);
console.log("env.SESSION_SECRET", env.SESSION_SECRET);
console.log("env.MONGODB_URI", env.MONGODB_URI);

console.log('trying to connect to mongo at: ' + env.MONGODB_URI);

mongoose.connect(env.MONGODB_URI)
    .then(() => {
        console.log("Mongoose connected");
        // app.listen(port, () => {
        //     console.log("Server running on port: " + port);
        // });
    })
    .catch(err => console.error('MongoDB connection error:', err));


console.log('post-connection hello');

// const corsOptions = {
//     origin: [env.REACT_APP_MONOREPO_FRONTEND_URL, 'http://localhost:3000'], // Allow requests only from these origins
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Allow cookies, if your application uses them
//     optionsSuccessStatus: 204,
//     // headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
// };
// console.log('CORS origins: ', corsOptions.origin.join(', '));
// app.use(cors(corsOptions));
app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

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

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});

export default app;