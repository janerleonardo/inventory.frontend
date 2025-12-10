// StockSpinner.tsx
"use client";

import React, { useState } from 'react';
// Importa los estilos CSS Modules
import styles from "./StockSpinner.module.css"; 
// Importa las funciones del servicio y la interfaz Product
import { incrementStock, decrementStock } from "app/services/ApiRest/productService";
import { Product } from "../../../domain/product";

interface StockSpinnerProps {
    productId: string;
    initialStock: number;
    // Función opcional para notificar al componente padre de la tabla
    onStockUpdate?: (productId: string, newStock: number) => void; 
}

export default function StockSpinner({ productId, initialStock, onStockUpdate }: StockSpinnerProps) {
    const [currentStock, setCurrentStock] = useState(initialStock);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callApi = async (endpoint: 'increment-stock' | 'decrement-stock') => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            let updatedProduct: Product;

            if (endpoint === 'increment-stock') {
                // Llama al endpoint de incremento
                updatedProduct = await incrementStock(productId, currentStock);
            } else {
                // Llama al endpoint de decremento
                updatedProduct = await decrementStock(productId, currentStock);
            }

            const updatedStock = updatedProduct.stock;
            console.log(updatedStock);
            setCurrentStock(updatedStock);
            
            // Notificar al componente padre
            if (onStockUpdate) {
                onStockUpdate(productId, updatedStock);
            }

        } catch (err) {
            // Manejar errores de la API (ej: stock en cero, error de red)
            const errorMessage = (err as Error).message;
            console.error(`Error al ${endpoint}:`, err);
            setError(errorMessage.includes('Failed to') ? "Error de API" : "Error desconocido");
            
        } finally {
            setIsLoading(false);
        }
    };

    const handleIncrement = () => {
       // setCurrentStock(currentStock + 1);
        callApi('increment-stock');
    };

    const handleDecrement = () => {
        // Permitimos la llamada incluso si el stock es 0, para que el backend maneje el error
        // pero podemos deshabilitar el botón si queremos un UX más estricto.
        //setCurrentStock(currentStock - 1);
        if (currentStock > 0) {
            callApi('decrement-stock');
        } else {
             // Opcional: Si currentStock es 0 y se presiona, no hacer nada.
             setError("El stock no puede ser menor a cero.");
        }
    };

    return (
        <div className={styles.spinnerContainer}>
            <button 
                className={styles.spinnerButton} 
                onClick={handleDecrement} 
                // Deshabilitar si el stock es 0 o está cargando
                disabled={currentStock <= 0 || isLoading} 
            >
                -
            </button>
            
            <input 
                type="text" 
                className={styles.spinnerInput}
                // Muestra un indicador de carga o el stock actual
                value={isLoading ? '...' : currentStock} 
                readOnly 
            />
            
            <button 
                className={styles.spinnerButton} 
                onClick={handleIncrement}
                disabled={isLoading}
            >
                +
            </button>
            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    );
}