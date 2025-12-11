// CategoriesTable.tsx
"use client";

import { useState } from "react";
import styles from "./CategoriesTable.module.css";
import { Category } from "../../../domain/category";
import CategoryModal, { CategoryFormData } from "./CategoryModal";
import { createCategory, CreateUpdateCategoryPayload, updateCategory } from "app/services/ApiRest/categoryService";
// Importamos el tipo de datos del formulario (lo definiremos en el modal)
// import { CategoryFormData } from "./CategoryModal"; 
// Importa tus servicios API si ya los tienes:
// Importa las funciones del servicio y el tipo de payload


interface CategoriesTableProps {
  category: Category[];
}

export default function CategoriesTable({ category }: CategoriesTableProps) {
  const [categoriesList, setCategoriesList] = useState(category);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  // selectedCategory puede ser null (modo creación) o un objeto Category (modo edición)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // 5. USAR ESTADO LOCAL: Filtramos sobre la lista de categorias mutable
  const filteredCategories = categoriesList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para abrir el modal para **EDICIÓN**
  const handleActionClick = (category: Category) => {
    setSelectedCategory(category); 
    setIsModalOpen(true);
  };

  // Función para abrir el modal para **CREACIÓN**
  const handleAddClick = () => {
    setSelectedCategory(null); // Establece a null para indicar que es una nueva categoría
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null); 
  };
  
  // *** Función temporal para la demostración de la creación/edición de datos ***
  // Esta función DEBERÍA manejar la llamada a tu API: createCategory o updateCategory
  
  // Función para manejar el envío del formulario del modal (CREAR o EDITAR)
    const handleSubmit = async (formData: CategoryFormData) => {
        const isEditing = !!formData.id;

        try {
            // 1. Crear el payload que coincide con CreateCategoryDto (solo Name y Description)
            const payload: CreateUpdateCategoryPayload = {
                name: formData.name,
                description: formData.description,
            };
            
            let updatedOrNewCategory: Category;

            if (isEditing) {
                // Lógica de actualización (PUT)
                // Se requiere el ID de la categoría y el payload
                updatedOrNewCategory = await updateCategory(formData.id!, payload);
                
                // Actualizar la lista local: Reemplazar el registro editado
                setCategoriesList(prevList =>
                    prevList.map(c => c.id === updatedOrNewCategory.id ? updatedOrNewCategory : c)
                );
            } else {
                // Lógica de creación (POST)
                // Se requiere solo el payload
                updatedOrNewCategory = await createCategory(payload);

                // Actualizar la lista local: Añadir el nuevo registro al inicio
                setCategoriesList(prevList => [updatedOrNewCategory, ...prevList]);
            }

        } catch (error) {
            console.error("Error al guardar categoría:", error);
            // Propagar el error para que el modal lo pueda atrapar y mostrar un mensaje
            throw error; 
        }
    };
  
  // Fin de la función temporal

  return (
    <div className={styles.tableContainer}>
      <div className={styles.controls}> {/* Nuevo contenedor para organizar */}
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* BOTÓN DE ADICIÓN */}
        <button 
          className={styles.actionButtonAdd} // Asegúrate de definir esta clase en tu CSS
          onClick={handleAddClick} 
        >
          + Adicionar Categoría
        </button>
      </div>

      <table className={styles.table}>
        {/* ... (Contenido de <thead> y <tbody>) ... */}
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
        onSubmit={handleSubmit} 
      />
    </div>
  );
}