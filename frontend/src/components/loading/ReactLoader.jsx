import {
  ClipLoader,
  DotLoader,
  PacmanLoader,
  PuffLoader,
} from "react-spinners";
import styles from "./loading.module.css";

export const ReactClipLoader = () => (
  <div className={styles.loadingContainer}>
    <ClipLoader color='blue' loading={true} size={50} />
  </div>
);

export const ReactPacManLoader = () => (
  <div className={styles.loadingContainer}>
    <PacmanLoader loading={true} size={25} margin={2} />
  </div>
);

export const ReactPuffLoader = () => (
  <div className={styles.loadingContainer}>
    <PuffLoader size={60} color='blue' />
  </div>
);

export const ReactDotLoader = () => (
  <div className={styles.loadingContainer}>
    <DotLoader size={60} color='blue' />
  </div>
);
