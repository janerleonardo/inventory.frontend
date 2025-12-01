import Link from "next/link";
import styles from "./Header.module.css";

const Hearder = () => {
  return (
    <header className={styles.Header}>
     <div className={styles.left}>
        <h1>Inventory System</h1>
      </div>

      <nav className={styles.right}>
        <span>Hola, admin</span>
        <Link href="/logout" className={styles.logout}>
          Cerrar Sesión
        </Link>
      </nav>
    </header>
  );
};

export default Hearder;
