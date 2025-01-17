"use client";

import SwitchButtons from "@/app/signup/SwitchButtons";
import { useActions } from "@/hooks/useActions";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@/app/signup/page.module.scss";
import MainButton from "@/components/ui/Button/MainButton";
import Link from "next/link";
import SignUpFields from "./SignUpFields";
import { IAuthInput } from "@/app/signup/Auth.interface";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

interface IAuthFields {
  isPasswordRequired?: boolean;
}

const SignUpFormsWorkers: FC<IAuthFields> = () => {
  useAuthRedirect();
  const { registerWorker } = useActions();
  const { isLoading } = useAuth();

  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>();

  const [selectedButton, setSelectedButton] = React.useState<
    "contractor" | "applicant"
  >("applicant");

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
     registerWorker(data);
    // @ts-ignore
    ym(96978493,'reachGoal','SIGN_UP')
    reset();
  };

  return (
    <>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
      >
        <SignUpFields
          register={registerInput}
          formState={formState}
          selectedButton={selectedButton}
        />

        <div className={styles.authButtons}>
          <MainButton disabled={isLoading} type="submit">
            Зарегистрироваться
          </MainButton>
          <div className={styles.docLink}>
          
          <p>Нажимая на кнопку “Зарегистрироваться”, вы соглашаетесь с </p>
          <a href="/documents">Условиями использования</a> <p>и </p>
          <a href="/documents">Политикой конфиденциальности</a>
        </div>
          <div className="text-lg mt-1">
            Есть аккаунт?
            <Link href={"/login"} className="ml-2  text-lg font-semibold text-blue-500 underline">
              Войти
            </Link>
          </div>
        </div>
       
      </form>
    </>
  );
};

export default SignUpFormsWorkers;
