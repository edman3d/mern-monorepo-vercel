import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";
import env from "../utils/validateEnv";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    console.log('process.env.VERCEL_URL: ', process.env.REACT_APP_VERCEL_URL);
    console.log('NODE_ENV: ', env.NODE_ENV);
    console.log('REACT_APP_MONOREPO_BACKEND_URL: ', env.REACT_APP_MONOREPO_BACKEND_URL);
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

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/users", {
        method: "GET",
        credentials: 'include',
    });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });
    return response.json();
}

export async function logout() {
    await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/users/logout", {
        method: "POST",
        credentials: 'include',
    });
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/notes", {
        method: "GET",
        credentials: 'include',
    });
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/notes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
            credentials: 'include',
        });
    return response.json();
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/notes/" + noteId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
            credentials: 'include',
        });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/notes/" + noteId, {
        method: "DELETE",
        credentials: 'include',
    });
}