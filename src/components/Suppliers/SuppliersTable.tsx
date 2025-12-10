"use client";

import { useState } from "react"; 
import styles from "./SuppliersTable.module.css";
import { Supplier } from "../../../domain/supplier";
import SupplierModal from "./SupplierModal";



interface CategoriesTableProps {
  supplier: Supplier[];
}

export default function SuppliersTable({ supplier }: CategoriesTableProps) {
  const [supplersList, setSuppliersList] = useState(supplier);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);



  // 5. USAR ESTADO LOCAL: Filtramos sobre la lista de productos mutable
  const filteredSuppliers = supplersList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para abrir el modal con el producto correcto
  const handleActionClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
    setSuppliersList([]);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null); 
  };

  return (
    // Aplica la clase del contenedor principal
    <div className={styles.tableContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search Proveedores..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contact Name</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Direccion</th>
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
              <td>{supplier.isActive ? "Sí" : "No"}</td>
              <td>{new Date(supplier.updatedAt).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleActionClick(supplier)}
                  className={styles.actionButton}
                >
                  Abrir Modal
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
      />
    </div>
  );
}
