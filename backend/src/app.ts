// import "dotenv/config";
// // import dotenv from "dotenv";
// import express, { NextFunction, Request, Response } from "express";
// import notesRoutes from "./routes/notes";
// import userRoutes from "./routes/users";
// import morgan from "morgan";
// import createHttpError, { isHttpError } from "http-errors";
// import session from "express-session";
import env from "./util/validateEnv";
// import MongoStore from "connect-mongo";
// import { requiresAuth } from "./middleware/auth";
// import cors from "cors";

// const app = express();

// console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
// console.log("process.env.REACT_APP_MONOREPO_FRONTEND_URL: " + process.env.REACT_APP_MONOREPO_FRONTEND_URL);
// console.log("env.SESSION_SECRET", env.SESSION_SECRET);
// console.log("env.MONGODB_URI", env.MONGODB_URI);

// const corsOptions = {
//     origin: [env.REACT_APP_MONOREPO_FRONTEND_URL, 'http://localhost:3000'], // Allow requests only from these origins
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Allow cookies, if your application uses them
//     optionsSuccessStatus: 204,
//     // headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
// };

// console.log('CORS origins: ', corsOptions.origin.join(', '));


// app.use(cors(corsOptions));
// // app.use(cors());

// app.use(morgan("dev"));

// app.use(express.json());

// // Cookies stop working as soon as we stop using the localhost domain
// app.use(session({
//     secret: env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 60 * 60 * 1000,
//     },
//     rolling: true,
//     store: MongoStore.create({
//         mongoUrl: env.MONGODB_URI
//     }),
// }));

// console.log('session middleware configured');

// app.use("/api/users", userRoutes);
// // app.use("/api/notes", requiresAuth, notesRoutes);
// app.use("/api/notes", notesRoutes);

// app.use((req, res, next) => {
//     next(createHttpError(404, "Endpoint not found"));
// });

// console.log('post 404 middleware');

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
//     console.error(error);
//     let errorMessage = "An unknown error occurred";
//     let statusCode = 500;
//     if (isHttpError(error)) {
//         statusCode = error.status;
//         errorMessage = error.message;
//     }
//     res.status(statusCode).json({ error: errorMessage });
// });

// console.log('post 500 middleware');

// export default app;

// Use "type: module" in package.json to use ES modules
import express from 'express';
import mongoose from "mongoose";
const app = express();

const port = env.PORT;

console.log('trying to connect to mongo at: ' + env.MONGODB_URI);

mongoose.connect(env.MONGODB_URI)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch(console.error);


console.log('post-connection hello');

// Define your routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express on Vercel!' });
});



// Export the Express app
export default app;