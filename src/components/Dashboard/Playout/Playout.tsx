import { Card } from "../Card";
import styles from "./Playaout.module.css"; 
const Playout = () => {

  return (
            <div className={styles.metricsContainer}>
                <Card label={"Productos"} value={"85"} ico={"box"} color={"violet"}/> 
                <Card label={"Ventas del Mes"} value={"$0.00"} ico={"cash"} color={"red"}/>
                <Card label={"Compras del Mes"} value={"$0.00"} ico={"carrito"} color={"blue"}/>
                <Card label={"Clientes"} value={"25"} ico={"people"} color={"green"}/>
            </div>
            
  );
};

export default Playout;
