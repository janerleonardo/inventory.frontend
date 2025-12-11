"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react"; // <-- Importar useEffect
import styles from "./CategoryModal.module.css";
import { Category } from "../../../domain/category";

// Define la estructura de los datos del formulario (debe estar disponible)
export interface CategoryFormData {
  id?: string | number; 
  name: string;
  description: string;
}

interface CategoryModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => Promise<void>; 
}

export default function CategoryModal({ category, isOpen, onClose, onSubmit }: CategoryModalProps) {
  
  // Determinar el modo de inicio
  const isCreationMode = category === null;
  
  // 1. ESTADO DEL FORMULARIO (Inicialización simple)
  // Se inicializa con valores vacíos. El useEffect se encargará de llenarlo.
  const [formData, setFormData] = useState<CategoryFormData>({ 
    id: undefined,
    name: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ==========================================================
  // 2. SINCRONIZACIÓN DE DATOS CON useEffect (LA CLAVE DE LA SOLUCIÓN)
  // ==========================================================
  useEffect(() => {
    // Esta función se ejecuta cada vez que el prop 'category' cambia
    if (category) {
      // Modo Edición: Cargar los datos de la categoría seleccionada
      setFormData({
        id: category.id,
        name: category.name,
        description: category.description,
      });
    } else {
      // Modo Creación: Limpiar los campos
      setFormData({
        id: undefined,
        name: "",
        description: "",
      });
    }
  }, [category]); // <-- Dependencia: se ejecuta al inicio y cada vez que 'category' cambie.
  // ==========================================================

  // Retorno condicional
  if (!isOpen) { 
    return null;
  }
  
  const modalTitle = isCreationMode ? "Crear Nueva Categoría" : `Editar Categoría: ${formData.name}`;

  // ... (Resto de los manejadores de eventos)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
      onClose(); 
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      alert(`Error al ${isCreationMode ? 'crear' : 'actualizar'} la categoría. Revise la consola.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleModalContentClick}>
        
        <div className={styles.header}>
          <h2>{modalTitle}</h2>
          <button className={styles.closeButton} onClick={onClose} disabled={isLoading}>
            &times; 
          </button>
        </div>

        <div className={styles.body}>
          <form className={styles.form} onSubmit={handleSubmit}> 
            {/* Campo 1: Nombre */}
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name} // <--- Usa el estado actualizado
                onChange={handleChange} 
                className={styles.input} 
                disabled={isLoading}
                required
              />
            </div>

            {/* Campo 2: Descripción */}
            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción</label>
              <textarea 
                id="description" 
                value={formData.description} // <--- Usa el estado actualizado
                onChange={handleChange} 
                className={styles.input} 
                rows={3} 
                disabled={isLoading}
                required
              />
            </div>
            
            <div className={styles.footer}>
              <button 
                type="button" 
                className={styles.cancelButton} 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              
              <button 
                type="submit" 
                className={styles.saveButton}
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : (isCreationMode ? "Crear Categoría" : "Guardar Cambios")}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}