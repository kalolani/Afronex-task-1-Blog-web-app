import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={`${styles.spinner} bg-slate-950`}></div>
    </div>
  );
}

export default Spinner;
