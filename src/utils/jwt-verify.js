import { jwtVerify } from "jose";

export async function validate(token) {
    if (!token || token === undefined) { return; }
    try {
        const secretKey = new TextEncoder().encode(`${import.meta.env.VITE_APP_SECRET_KEY}`);
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (err) {
        console.error('Token verification failed: ', err);
        return;
    }
}