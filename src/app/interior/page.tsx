"use client";
import React from "react";
import styles from "./page.module.scss";

import InteriorGallery from "@/components/screens/main-page/Gallery";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Page() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Интерьер</div>
        <InteriorGallery slug={"interior"} />
      </div>
    </>
  );
}
