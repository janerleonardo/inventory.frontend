import SuppliersTable from "app/components/Suppliers/SuppliersTable";
import { getAllSuppliers } from "app/services/ApiRest/supplierService";
import styles from "./PageLayout.module.css";



export default async function ProductsPage() {
  const suppliers = await getAllSuppliers();

  return (
    <div className={styles.container}>       
      {/* 4. Contenido principal */}
      <div className={styles.mainContent}>
        <h1>Lista de Proveedores</h1> 
        <SuppliersTable supplier={suppliers} />
      </div>
    </div>
  );

}