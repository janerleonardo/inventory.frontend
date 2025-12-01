"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Menu.module.css";

interface MenuItem {
    label: string;
    href: string;
}

const Menu = () => {
    const pathname = usePathname();  

    const optionMenu: MenuItem[] = [
        { label: "Dashboard", href: "/" },
        { label: "Producto", href: "/product" },
        { label: "Categoria", href: "/category" },
        { label: "Proveedores", href: "/supplier" }
    ];

    return (
        <aside className={styles.sidebar} aria-label="Menú principal">
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {optionMenu.map((item) => {

                        
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.href} className={styles.item}>
                                <Link
                                    href={item.href}
                                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Menu;