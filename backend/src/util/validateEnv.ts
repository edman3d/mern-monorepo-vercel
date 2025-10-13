import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";
import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment-specific .env file
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config(); // Default .env for other environments
}

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    MONGODB_URI: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    REACT_APP_MONOREPO_FRONTEND_URL: str()
});