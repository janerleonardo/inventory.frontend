import styles from "./Card.module.css"; 

type ColorProps = "violet" | "blue" | "red" | "green";
type IcoProps = "box" | "cash" | "carrito" | "people";

interface CardProps {
  label: string;
  value: string;
  ico: IcoProps;
  color: ColorProps;
}


const getColorClasses = (color: ColorProps): string => {
  switch (color) {
    case "violet":
      return styles.colorViolet;
    case "red":
      return styles.colorRed;
    case "blue":
      return styles.colorBlue;
    case "green":
      return styles.colorGreen;
    default:
      return ""; // O una clase por defecto si es necesario
  }
};

// Función para obtener el ícono (usando emojis como placeholder)
const getIcon = (ico: IcoProps): string => {
  switch (ico) {
    case "box":
      return "📦";
    case "cash":
      return "$";
    case "carrito":
      return "🛒";
    case "people":
      return "👥";
    default:
      return "";
  }
};

const Card = ({ label, value, ico, color }: CardProps) => {
  const colorClass = getColorClasses(color);
  const iconSymbol = getIcon(ico);

  // Concatenamos la clase base 'card' con la clase de color específica.
  const cardClasses = `${styles.card} ${colorClass}`;

  return (
    <div className={cardClasses}>
      <div className={styles.topSection}>
        <span>{label}</span>
        <span className={styles.icon}>{iconSymbol}</span>
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default Card;
