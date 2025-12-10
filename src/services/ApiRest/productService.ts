import { Product } from "../../../domain/product";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOSTNAME;


export async function getAllProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/Products`, {
        headers: new Headers({
            'accept': 'text/plain'
        })
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}


export async function incrementStock(productId: string, amount: number): Promise<Product> {
    console.log("BASE_URL"+ BASE_URL);
    const dataToSend = {
        "amount": amount // Usamos 1 para un incremento unitario
    };
    const res = await fetch(`${BASE_URL}/Products/${productId}/increment-stock`, {
        method: 'POST', // Asumimos que es un método POST
        headers: new Headers({
            'accept': 'application/json', // Esperamos el producto actualizado en JSON
            'Content-Type': 'application/json' 
        }),
        body: JSON.stringify(dataToSend)
    });

    if (!res.ok) {
        // Puedes leer el error del cuerpo si el backend lo proporciona
        const errorText = await res.text();
        throw new Error(`Failed to increment stock for product ${productId}. Status: ${res.status}. Error: ${errorText}`);
    }

    // Devuelve el producto actualizado con el nuevo stock
    return res.json(); 
}



export async function decrementStock(productId: string , amount: number): Promise<Product> {
    console.log("BASE_URL"+ BASE_URL);
    const dataToSend = {
        "amount": amount // Usamos 1 para un incremento unitario
    };
    const res = await fetch(`${BASE_URL}/Products/${productId}/decrement-stock`, {
        method: 'POST', // Asumimos que es un método POST
        headers: new Headers({
            'accept': 'application/json',
            'Content-Type': 'application/json' 
        }),
                body: JSON.stringify(dataToSend)
    });

    if (!res.ok) {
        const errorText = await res.text();
        // Si el stock llega a cero (o el límite inferior), el backend puede devolver un 400 o 409
        throw new Error(`Failed to decrement stock for product ${productId}. Status: ${res.status}. Error: ${errorText}`);
    }

    return res.json(); 
}