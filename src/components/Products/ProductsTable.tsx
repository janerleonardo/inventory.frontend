"use client";

import { useState, useCallback } from "react"; // 1. Agregamos useCallback para la función de actualización
// Importa el módulo de estilos
import styles from "./ProductsTable.module.css";
import { Product } from "../../../domain/product";
import ProductModal from "./ProductModal";
// 2. Importamos el StockSpinner (Asegúrate de que la ruta sea correcta)
import StockSpinner from "./StockSpinner";

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const [productsList, setProductsList] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 4. FUNCIÓN DE ACTUALIZACIÓN DE STOCK: Esta función se pasa al StockSpinner
  const handleStockUpdate = useCallback(
    (productId: string, newStock: number) => {
      setProductsList((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, stock: newStock } // Actualiza el stock en la lista local
            : product
        )
      );
    },
    []
  );

  // 5. USAR ESTADO LOCAL: Filtramos sobre la lista de productos mutable
  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para abrir el modal con el producto correcto
  const handleActionClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Limpiar el producto seleccionado
  };

  return (
    // Aplica la clase del contenedor principal
    <div className={styles.tableContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Stock</th> 
            <th>Updated</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <StockSpinner
                  productId={product.id}
                  initialStock={product.stock}
                  onStockUpdate={handleStockUpdate} // Pasa la función de actualización
                />
              </td>
              <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleActionClick(product)}
                  className={styles.actionButton}
                >
                  Abrir Modal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredProducts.length === 0 && (
        <p className={styles.noProducts}>No products found</p>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
