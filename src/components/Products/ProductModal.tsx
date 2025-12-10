"use client";

import styles from "./ProductModal.module.css";
import { Product } from "../../../domain/product"; // Asegúrate de la ruta correcta

interface ProductModalProps {
  product: Product | null; // Puede ser null si el modal está cerrado
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!isOpen || !product) {
    console.log("ProductModal: product or isOpen is null");
    
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
          <h2>Editar Producto: {product.name}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times; {/* Símbolo de "x" para cerrar */}
          </button>
        </div>

        <div className={styles.body}>
          <form className={styles.form}>
            {/* Campo 1: Nombre */}
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" defaultValue={product.name} className={styles.input} disabled/>
            </div>

            {/* Campo 2: Descripción */}
            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción</label>
              <textarea id="description" defaultValue={product.description} className={styles.input} rows={3} disabled />
            </div>

            {/* Campo 3: Precio */}
            <div className={styles.formGroup}>
              <label htmlFor="price">Precio</label>
              <input type="number" id="price" defaultValue={product.price} className={styles.input}  disabled/>
            </div>

            {/* Campo 4: Stock */}
            <div className={styles.formGroup}>
              <label htmlFor="stock">Stock</label>
              <input type="number" id="stock" defaultValue={product.stock} className={styles.input} />
            </div>

            {/* Puedes agregar más campos aquí, como Categoría, etc. */}

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