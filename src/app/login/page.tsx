"use client"
import { FC } from "react";
import styles from "../signup/page.module.scss";

import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import LoginForms, { IAuthInput } from "@/components/shared/user/LoginForms";
import { useForm } from "react-hook-form";

const LoginLayout: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });


  return (
    <section className={styles.container}>
      <div className={styles.leftBlock}>
      
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div>
        <LoginForms formState={formState}  />
      </div>
    </section>
  );
};
export default LoginLayout;
