"use client";

import styles from "./CategoriesTable.module.css";
import { Category } from "../../../domain/category"; // Asegúrate de la ruta correcta

interface CategoryModalProps {
  category: Category | null; 
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryModal({ category, isOpen, onClose }: CategoryModalProps) {
  if (!isOpen || !category) {
    return null; // No renderiza nada si no está abierto o no hay producto
  }

  // Función para evitar que el clic dentro del modal cierre la ventana
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // Superposición (Overlay) que ocupa toda la pantalla y es la que cierra el modal al hacer clic
    <div className={styles.overlay} onClick={onClose}>
      
      {/* Contenido del Modal */}
      <div className={styles.modal} onClick={handleModalContentClick}>
        
        <div className={styles.header}>
          <h2>Editar Categoria: {category.name}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times; {/* Símbolo de "x" para cerrar */}
          </button>
        </div>

        <div className={styles.body}>
          <form className={styles.form}>
            {/* Campo 1: Nombre */}
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" defaultValue={category.name} className={styles.input} disabled/>
            </div>

            {/* Campo 2: Descripción */}
            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción</label>
              <textarea id="description" defaultValue={category.description} className={styles.input} rows={3} disabled />
            </div>

          </form>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.saveButton}>
            Guardar Cambios
          </button>
        </div>

      </div>
    </div>
  );
}