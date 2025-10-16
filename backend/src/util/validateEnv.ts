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

// Vercel specific environment variables handling
// Example of what the two preview URLs look like
// mern-monorepo-vercel-frontend-git-5947ad-eds-projects-96fc0628.vercel.app
// mern-monorepo-vercel-frontend-gk6o0tfya-eds-projects-96fc0628.vercel.app
console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log('VERCEL_URL: ', process.env.VERCEL_URL);
console.log("process.env.VERCEL_ENV: ", process.env.VERCEL_ENV);
if (process.env.VERCEL_ENV === 'preview') {
    // sanitize branch name for URLs
    console.log('VERCEL_BRANCH_URL: ', process.env.VERCEL_BRANCH_URL);
    console.log('VERCEL_GIT_COMMIT_REF: ', process.env.VERCEL_GIT_COMMIT_REF);
    console.log('VERCEL_GIT_REPO_OWNER: ', process.env.VERCEL_GIT_REPO_OWNER);
    console.log('VERCEL_GIT_REPO_ID: ', process.env.VERCEL_GIT_REPO_ID);
    console.log('VERCEL_GIT_PROVIDER: ', process.env.VERCEL_GIT_PROVIDER);
    console.log('VERCEL_GIT_REPO_SLUG: ', process.env.VERCEL_GIT_REPO_SLUG);
    console.log('VERCEL_GIT_COMMIT_SHA: ', process.env.VERCEL_GIT_COMMIT_SHA);
    console.log('VERCEL_PROJECT_ID: ', process.env.VERCEL_PROJECT_ID);
    console.log('VERCEL_DEPLOYMENT_ID: ', process.env.VERCEL_DEPLOYMENT_ID);
    console.log('test that nothing builds after turning it off');

    const branch = process.env.VERCEL_GIT_COMMIT_REF!.replace(/\//g, '-');
    const owner = process.env.VERCEL_GIT_REPO_OWNER;
    process.env.REACT_APP_MONOREPO_FRONTEND_URL = `https://mern-monorepo-vercel-frontend-git-${branch}-${owner}.vercel.app`;
}


// console.log("process.env.VERCEL_URL: ", process.env.VERCEL_URL);
// console.log("REACT_APP_MONOREPO_FRONTEND_URL: " + process.env.REACT_APP_MONOREPO_FRONTEND_URL);
// console.log("MONGODB_URI", process.env.MONGODB_URI);

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    MONGODB_URI: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    REACT_APP_MONOREPO_FRONTEND_URL: str()
});