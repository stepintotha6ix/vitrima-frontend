
import Image from "next/image";
import { FC, useState } from "react";
import imageBg from "../../components/common/images/ui/authPage/AuthBg.png";
import { MainLogoBlack } from "@/components/common/icons/MainLogoBlack";
import styles from "./page.module.scss";
import SwitchButtons from "./SwitchButtons";
import MainButton from "@/components/ui/Button/MainButton";
import {
  FormState,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { IAuthInput } from "./Auth.interface";
import Link from "next/link";
import SignUpFields from "@/components/shared/user/SignUpFields";
import { useActions } from "@/hooks/useActions";
import SignUpForms from "@/components/shared/user/SignUpForms";

const SignupLayout: FC = () => {


  
  return (
    <section className="flex">
      <div className={styles.leftBlock}>
        <Image src={imageBg} width={952} height={1080} alt={""} />
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.logotype}>
          <MainLogoBlack width={595} />
        </div>
        <SignUpForms      />
        
      </div>
    </section>
  );
};
export default SignupLayout;
