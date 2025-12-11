// SuppliersTable.tsx
"use client";

import { useState } from "react";
import styles from "./SuppliersTable.module.css";
import { Supplier } from "../../../domain/supplier";
// Importar el modal y las interfaces de datos
import SupplierModal from "./SupplierModal"; 
import { SupplierFormData, CreateUpdateSupplierPayload, createSupplier, updateSupplier } from "app/services/ApiRest/supplierService"; 
// ^^^ Asegúrate de que la ruta de importación de service sea correcta

interface SuppliersTableProps {
  supplier: Supplier[];
}

export default function SuppliersTable({ supplier }: SuppliersTableProps) {
  const [supplersList, setSuppliersList] = useState(supplier);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Filtro
  const filteredSuppliers = supplersList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para abrir el modal para EDICIÓN
  const handleActionClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };
  
  // Función para abrir el modal para CREACIÓN
  const handleAddClick = () => {
    setSelectedSupplier(null); // Establece a null para indicar que es un nuevo registro
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
  };

  // ==========================================================
  // MANEJADOR DE ENVÍO (CREAR / EDITAR)
  // ==========================================================
  const handleSubmit = async (formData: SupplierFormData) => {
    const isEditing = !!formData.id;

    try {
        // Crear el payload que coincide con CreateSupplierDto
        const payload: CreateUpdateSupplierPayload = {
            name: formData.name,
            contactName: formData.contactName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            country: formData.country,
        };
        
        let updatedOrNewSupplier: Supplier;

        if (isEditing) {
            // Lógica de actualización (PUT)
            updatedOrNewSupplier = await updateSupplier(formData.id!, payload);
            
            // Actualizar la lista local: Reemplazar el registro editado
            setSuppliersList(prevList =>
                prevList.map(s => s.id === updatedOrNewSupplier.id ? updatedOrNewSupplier : s)
            );
        } else {
            // Lógica de creación (POST)
            updatedOrNewSupplier = await createSupplier(payload);

            // Actualizar la lista local: Añadir el nuevo registro al inicio
            setSuppliersList(prevList => [updatedOrNewSupplier, ...prevList]);
        }
    } catch (error) {
        console.error("Error al guardar proveedor:", error);
        throw error; 
    }
  };


  return (
    <div className={styles.tableContainer}>
      <div className={styles.controls}> {/* Nuevo contenedor para organizar */}
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Proveedores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Botón de Adición */}
        <button 
            className={styles.saveButton} // Asegúrate de definir esta clase en tu CSS
            onClick={handleAddClick} 
        >
            + Adicionar Proveedor
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contact Name</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Ciudad</th>
            <th>Pais</th>
            <th>Activo</th>
            <th>Updated</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contactName}</td>
              <td>{supplier.email}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.address}</td>
              <td>{supplier.city}</td>
              <td>{supplier.country}</td>
              <td>{supplier.isActive ? "Sí" : "No"}</td>
              <td>{new Date(supplier.updatedAt).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleActionClick(supplier)}
                  className={styles.actionButton}
                >
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredSuppliers.length === 0 && (
        <p className={styles.noProducts}>No suppliers found</p>
      )}

      <SupplierModal
        supplier={selectedSupplier}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit} // <--- Pasar la función de manejo de envío
      />
    </div>
  );
}