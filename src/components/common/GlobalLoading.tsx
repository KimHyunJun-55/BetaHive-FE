// src/components/common/GlobalLoading.tsx
import { useLoading } from "../../context/LoadingContext";
import styles from "./GlobalLoading.module.css";

const GlobalLoading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinner}>
        <div className={styles.dualRing} aria-hidden="true"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoading;
