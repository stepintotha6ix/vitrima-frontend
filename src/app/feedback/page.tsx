"use client";
import React from "react";
import styles from "./page.module.scss";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import Feedback from "@/components/screens/feedback/Feedback";

const Page: NextPageAuth = () => {
  const { user } = useAuth();
  if (!user || user?.isContractor === false) {
    redirect("/");
  }

  return (
    <>
      <div className={styles.wrapper}>
       <Feedback />
      </div>
    </>
  );
};

export default Page;
