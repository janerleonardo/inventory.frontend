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
    return null; 
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
            &times; 
          </button>
        </div>

        <div className={styles.body}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" defaultValue={supplier.name} className={styles.input} disabled/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactName">Nombre de contacto</label>
              <input type="text" id="contactName" defaultValue={supplier.contactName} className={styles.input}  disabled />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" defaultValue={supplier.email} className={styles.input}  disabled />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Telefono</label>
              <input type="tel" id="phone" defaultValue={supplier.phone} className={styles.input}  disabled />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address">Direccion</label>
              <input type="text" id="adress" defaultValue={supplier.address} className={styles.input}  disabled />
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