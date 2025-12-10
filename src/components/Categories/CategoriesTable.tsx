"use client";

import { useState } from "react"; // 1. Agregamos useCallback para la función de actualización
// Importa el módulo de estilos
import styles from "./CategoriesTable.module.css";
import { Category } from "../../../domain/category";
import CategoryModal from "./CategoryModal";
// 2. Importamos el StockSpinner (Asegúrate de que la ruta sea correcta)


interface CategoriesTableProps {
  category: Category[];
}

export default function CategoriesTable({ category }: CategoriesTableProps) {
  const [categoriesList, setCategoriesList] = useState(category);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);



  // 5. USAR ESTADO LOCAL: Filtramos sobre la lista de productos mutable
  const filteredCategories = categoriesList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para abrir el modal con el producto correcto
  const handleActionClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);

  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null); 
  };

  return (
    // Aplica la clase del contenedor principal
    <div className={styles.tableContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search Categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Activo</th>
            <th>Updated</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.isActive ? "Sí" : "No"}</td>
              <td>{new Date(category.updatedAt).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleActionClick(category)}
                  className={styles.actionButton}
                >
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredCategories.length === 0 && (
        <p className={styles.noProducts}>No categories found</p>
      )}

      <CategoryModal
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
