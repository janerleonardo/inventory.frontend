import styles from "./CardRoles.module.css"; 

interface PersonProps {
    rol: string
}
const CardRoles = ({ rol }: PersonProps) => {

  return (
    <div className={styles.Card}>
      <div className={styles.topSection}>
       <h2>Bienvenido, Adminitador Sistema</h2>
      </div>
      <div> <h3>Rol: {rol} | Dashboard del Sistemas de inventarios</h3></div>
    </div>
  );
};

export default CardRoles;
