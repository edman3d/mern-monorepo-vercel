import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    MONGODB_URI: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    REACT_APP_MONOREPO_FRONTEND_URL: str()
});