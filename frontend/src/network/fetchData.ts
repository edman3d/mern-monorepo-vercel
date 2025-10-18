import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import env from "../utils/validateEnv";

export async function fetchData(input: RequestInfo, init?: RequestInit) {
    // console.log('restore REACT_APP_MONOREPO_BACKEND_URL to the env in vercel settings');
    // console.log('NODE_ENV: ', env.NODE_ENV);
    // console.log('REACT_APP_MONOREPO_BACKEND_URL: ', env.REACT_APP_MONOREPO_BACKEND_URL);
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}