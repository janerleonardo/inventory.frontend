
"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react"; // <-- Importar hooks
import styles from "./SupplierModal.module.css";
import { Supplier } from "../../../domain/supplier";
// Importar la interfaz de datos del formulario desde el servicio (o definirla aquí)
import { SupplierFormData } from "app/services/ApiRest/supplierService";

interface SupplierModalProps {
  supplier: Supplier | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SupplierFormData) => Promise<void>; // Prop para el envío
}

export default function SupplierModal({
  supplier,
  isOpen,
  onClose,
  onSubmit,
}: SupplierModalProps) {
  const isCreationMode = supplier === null;

  // 1. ESTADOS
  const [formData, setFormData] = useState<SupplierFormData>({
    id: undefined,
    name: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // 2. SINCRONIZACIÓN DE DATOS (useEffect)
  useEffect(() => {
    if (supplier) {
      // Modo Edición: Cargar los datos
      setFormData({
        id: supplier.id,
        name: supplier.name,
        contactName: supplier.contactName,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        city: supplier.city,
        country: supplier.country,
      });
    } else {
      // Modo Creación: Limpiar los campos
      setFormData({
        id: undefined,
        name: "",
        contactName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
      });
    }
  }, [supplier]);

  // 3. RETORNO CONDICIONAL (después de los Hooks)
  if (!isOpen) {
    return null;
  }

  // 4. MANEJADORES

  // Manejar el cambio de inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Manejar el envío
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error en el envío del modal:", error);
      alert(
        `Error al ${
          isCreationMode ? "crear" : "actualizar"
        } el proveedor. Revise la consola.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Función para evitar que el clic dentro del modal cierre la ventana
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const modalTitle = isCreationMode
    ? "Crear Nuevo Proveedor"
    : `Editar Proveedor: ${formData.name}`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleModalContentClick}>
        <div className={styles.header}>
          <h2>{modalTitle}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            disabled={isLoading}
          >
            &times;
          </button>
        </div>

        <div className={styles.body}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactName">Nombre de contacto</label>
              <input
                type="text"
                id="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Telefono</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address">Direccion</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="country">País</label>
              <input
                type="text"
                id="country"
                value={formData.country}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            {/* 5. Botones de acción */}
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
                {isLoading
                  ? "Guardando..."
                  : isCreationMode
                  ? "Crear Proveedor"
                  : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
