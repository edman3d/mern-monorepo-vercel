declare global {
    /**
        Allow storing our cached mongoose connection on global (Node globalThis)
        Significantly reduces connection overhead in serverless / Vercel environment
        as well as preventing the frequent connection timeout errors I was getting

        Cannot use let or const here, must use var, so disable the eslint rule for this line
    */
    // eslint-disable-next-line @typescript-eslint/no-namespace, no-var
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

export { };