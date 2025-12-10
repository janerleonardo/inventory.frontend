import CategoriesTable from "app/components/Categories/CategoriesTable";
import { getAllCategories } from "app/services/ApiRest/categoryService";
import styles from "./PageLayout.module.css";



export default async function ProductsPage() {
  const products = await getAllCategories();

  return (
    <div className={styles.container}>       
      {/* 4. Contenido principal */}
      <div className={styles.mainContent}>
        <h1>Lista de Categorias</h1> 
        <CategoriesTable category={products} />
      </div>
    </div>
  );

}