// app/services/ApiRest/supplierService.ts

import { Supplier } from "../../../domain/supplier";

// Interfaz que coincide con el DTO para la creación/actualización
export interface CreateUpdateSupplierPayload {
    name: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
}

// Interfaz para los datos que se envían desde el Modal y la Tabla (incluye el ID opcional)
export interface SupplierFormData extends CreateUpdateSupplierPayload {
    id?: string | number; 
}


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOSTNAME;


// ==========================================================
// 1. OBTENER TODOS LOS PROVEEDORES (GET)
// ==========================================================
export async function getAllSuppliers(): Promise<Supplier[]> {
    const res = await fetch(`${BASE_URL}/Suppliers`, {
        headers: new Headers({
            'accept': 'text/plain'
        })
    });

    if (!res.ok) {
        throw new Error("Failed to fetch Suppliers");
    }

    return res.json();
}

// ==========================================================
// 2. CREAR UN NUEVO PROVEEDOR (POST)
// ==========================================================
export async function createSupplier(data: CreateUpdateSupplierPayload): Promise<Supplier> {
    const res = await fetch(`${BASE_URL}/Suppliers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json' 
        },
        body: JSON.stringify(data) 
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create Supplier: ${res.status} - ${errorText}`);
    }
    
    return res.json(); 
}


// ==========================================================
// 3. ACTUALIZAR UN PROVEEDOR EXISTENTE (PUT)
// ==========================================================
export async function updateSupplier(id: string | number, data: CreateUpdateSupplierPayload): Promise<Supplier> {
    const res = await fetch(`${BASE_URL}/Suppliers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update Supplier ${id}: ${res.status} - ${errorText}`);
    }

    return res.json(); 
}