import ProductsTable from "app/components/Products/ProductsTable";
import { getAllProducts } from "app/services/ApiRest/productService";
import styles from "./PageLayout.module.css";



export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className={styles.container}>       
      {/* 4. Contenido principal */}
      <div className={styles.mainContent}>
        <h1>Lista de productos</h1> {/* Título principal */}
        <ProductsTable products={products} />
      </div>
    </div>
  );

}