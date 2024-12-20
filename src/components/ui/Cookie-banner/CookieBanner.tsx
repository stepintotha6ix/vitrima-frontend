import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { acceptCookies } from "@/store/user/cookie.slice";
import styles from "./CookieBanner.module.scss";
import MainButton from "../Button/MainButton";
import { TypeRootState } from "@/store/store";
const CookieBanner = () => {
  const isVisible = useSelector((state: TypeRootState) => state.cookieBanner.isVisible);
  const dispatch = useDispatch();

  if (!isVisible) return null;

  return (
    <div className={styles.block}>
      <h2>Мы используем куки.</h2>
      <p> Оставаясь с нами, вы соглашаетесь на использование файлов куки.</p>
      <MainButton onClick={() => dispatch(acceptCookies())}>Принять</MainButton>
    </div>
  );
};

export default CookieBanner;
