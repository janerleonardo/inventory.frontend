import { Supplier } from "../../../domain/supplier";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOSTNAME;


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
