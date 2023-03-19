import styles from "./page.module.css";
import HomeTopInfoGrid from "@/components/Home/TopInfoGrid";
import HomeMainInfoGrid from "@/components/Home/MainInfoGrid";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeTopInfoGrid/>
      <HomeMainInfoGrid />
    </main>
  );
}
