import styles from './Table.module.css'; 

const getProductsLowstock = async () => {
    const reponse  = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/Products/low-stock`, {
        headers: new Headers({
            'accept': 'text/plain'
        })
    });
    const data = reponse.json();
    return data
}

// Datos de ejemplo


const Table = async() => {
     const products = await getProductsLowstock()
     const hasProducts = products && Array.isArray(products) && products.length > 0;
    return (

       
        // Contenedor principal
        <div className={styles.cardContainer}>
            

            <div className={styles.header}>
                <h3 className={styles.title}>
                    <span className={styles.warningIcon}>▲</span> 
                    Productos con Stock Bajo
                </h3>
                <button className={styles.viewAllButton}>
                    Ver Todos
                </button>
            </div>


            {hasProducts ? (
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Stock Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className={`${styles.tableData} ${styles.productName}`}>{product.name}</td>
                                <td className={`${styles.tableData} ${styles.category}`}>{product.categoryName}</td>
                                <td className={styles.tableData}>
                                    <span className={styles.stockChip}>
                                        {product.stock} unidades
                                    </span>
                                </td>
                                <td className={styles.tableData}>
                                    <button className={styles.actionButton}>Ver Producto</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                // ----------------------------------------------------
                // MENSAJE DE TABLA VACÍA
                // ----------------------------------------------------
                <div className="p-4 text-center text-gray-500">
                    🎉 ¡Todo en orden! No hay productos con stock bajo actualmente.
                </div>
            )}
        </div>
    );
}

export default Table;