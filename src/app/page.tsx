

import styles from "./page.module.css";
import CardRoles from "app/components/Dashboard/CardRoles/CardRoles";
import Playout from "app/components/Dashboard/Playout/Playout";
import { Table } from "app/components/Dashboard/Table";

export default function Home() {
  return (
        // El contenedor principal usa la clase .page
        <div className={styles.page}>
            <CardRoles rol={"Administrador"}/>
            <Playout/>
            <Table/>
        </div>
    );
}
