"use client";
import Image from "next/image";
import { FC } from "react";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import styles from "../Navigation.module.scss";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "@/components/screens/profile/useUser";
// eslint-disable-next-line @next/next/no-async-client-component
const Avatar: FC<{ id: string }> = ({ id }) => {
  const { data } = useUser(id);
  return (
    <div className="flex items-center w-[120%] h-full cursor-pointer px-[1.5vh] py-[1.6vh] rounded-2xl transition-all duration-300 hover:bg-gray-300">
  <Image
        width={100}
        height={100}
        className={styles.avatar}
        src={data?.image ? data?.image : baseImage}
        alt={""}
      />
      
      
        <ExpandMoreIcon className={styles.icon}/>
      
    </div>
  );
};

export default Avatar;
