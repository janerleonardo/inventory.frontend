// app/services/ApiRest/categoryService.ts (o la ruta donde tengas getAllCategories)

import { Category } from "../../../domain/category";

// Interfaz para los datos que se envían desde el Modal y la Tabla
export interface CategoryFormData {
    id?: string | number; 
    name: string;
    description: string;
}

// Interfaz que coincide con CreateCategoryDto para el cuerpo de la petición
export interface CreateUpdateCategoryPayload {
    name: string;
    description: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOSTNAME;


// ==========================================================
// 1. OBTENER TODAS LAS CATEGORÍAS (GET)
// ==========================================================
export async function getAllCategories(): Promise<Category[]> {
    // ... (Tu implementación existente) ...
    const res = await fetch(`${BASE_URL}/Categories`, {
        headers: new Headers({
            'accept': 'text/plain'
        })
    });

    if (!res.ok) {
        throw new Error("Failed to fetch Categories");
    }

    return res.json();
}

// ==========================================================
// 2. CREAR UNA NUEVA CATEGORÍA (POST)
// ==========================================================
export async function createCategory(data: CreateUpdateCategoryPayload): Promise<Category> {
    const res = await fetch(`${BASE_URL}/Categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json' 
        },
        body: JSON.stringify(data) 
    });

    if (!res.ok) {
        const errorText = await res.text();
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(`Failed to create Category: ${JSON.stringify(errorJson)}`);
        } catch {
            throw new Error(`Failed to create Category: ${res.status} - ${errorText}`);
        }
    }
    

    return res.json(); 
}


// ==========================================================
// 3. ACTUALIZAR UNA CATEGORÍA EXISTENTE (PUT)
// ==========================================================
export async function updateCategory(id: string | number, data: CreateUpdateCategoryPayload): Promise<Category> {
    const res = await fetch(`${BASE_URL}/Categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const errorText = await res.text();
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(`Failed to update Category ${id}: ${JSON.stringify(errorJson)}`);
        } catch {
            throw new Error(`Failed to update Category ${id}: ${res.status} - ${errorText}`);
        }
    }

    // El backend devuelve el objeto Category (CategoryDto) actualizado
    return res.json(); 
}