import styles from "./Checkbox.module.css"

export const Checkbox = (props: { label?: string; value: number | undefined }) => {
    const { label, value } = props;
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={value==1 ?? 0} readOnly />
        <p>{label ?? ""}</p>
        <span className={styles.checkmark}></span>
      </div>
    );
  };
  