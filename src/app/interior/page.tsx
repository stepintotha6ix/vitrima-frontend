import React from "react";
import styles from "./page.module.scss";

import InteriorGallery from "@/components/screens/main-page-interior/InteriorGallery";


export default function Page() {
 
  return (
    <>
        <div className={styles.container}>
          <div className={styles.title}>Интерьер</div>
          <InteriorGallery />
        </div>
     
    </>
  );
}

