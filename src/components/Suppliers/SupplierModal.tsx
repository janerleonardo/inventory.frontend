"use client";

import styles from "./SupplierModal.module.css";
import { Supplier } from "../../../domain/supplier"; // Asegúrate de la ruta correcta

interface SupplierModalProps {
  supplier: Supplier | null; 
  isOpen: boolean;
  onClose: () => void;
}

export default function SupplierModal({ supplier, isOpen, onClose }: SupplierModalProps) {
  if (!isOpen || !supplier) {
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
          <h2>Editar Proveedores: {supplier.name}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times; {/* Símbolo de "x" para cerrar */}
          </button>
        </div>

        <div className={styles.body}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" defaultValue={supplier.name} className={styles.input} disabled/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción</label>
              <textarea id="description" defaultValue={supplier.contactName} className={styles.input} rows={3} disabled />
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