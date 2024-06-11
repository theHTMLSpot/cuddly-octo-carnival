import Image from "next/image";
import styles from "./page.module.css";
import JobListings from "./components/job_listing";

export default function Home() {
  return (
    <main className={styles.main}>
      <JobListings />
    </main>
  );
}
