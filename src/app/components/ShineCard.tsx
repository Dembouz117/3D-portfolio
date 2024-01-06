import styles from "@/app/styles/ShineCard.module.css";

interface ShineCardProps{
    className?: String | string,
    children?: React.ReactNode
}

const ShineCard = ({className, children}: ShineCardProps) => {
  return (
    <div className={`${className ?? ""} ${styles["custom-shine"]}`}>{children}</div>
  )
}

export default ShineCard