import { Category } from "../../../domain/category";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOSTNAME;


export async function getAllCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/Categories`, {
        headers: new Headers({
            'accept': 'text/plain'
        })
    });

    if (!res.ok) {
        throw new Error("Failed to fetch Categorys");
    }

    return res.json();
}


