
import { fetchData } from "./fetchData";
import env from "../utils/validateEnv";
import { Civilization } from "../models/civilization";

export async function fetchCivilizations(): Promise<Civilization[]> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/civilizations", {
        method: "GET",
        // credentials: 'include',
    });
    return response.json();
}

export interface CivInput {
    _id: string,
    name: string,
    unique_unit: string,
    unique_tech: string,
    team_bonus: string,
    civilization_bonus: string,
    image: string,
    unique_buildings: string,
    expansion: string,
    army_type: string,
    createdAt: string,
    updatedAt: string,
}

export async function createCiv(note: CivInput): Promise<Civilization> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/civilizations",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    return response.json();
}

export async function updateCiv(noteId: string, note: CivInput): Promise<Civilization> {
    const response = await fetchData(env.REACT_APP_MONOREPO_BACKEND_URL + "/api/civilizations/" + noteId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    return response.json();
}
