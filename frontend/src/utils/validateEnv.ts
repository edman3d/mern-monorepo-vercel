import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    NODE_ENV: str(),
    REACT_APP_MONOREPO_BACKEND_URL: str()
});