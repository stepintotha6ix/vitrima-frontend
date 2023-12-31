"use client";
import React, { FC } from "react";
import Link from "next/link";
import MainButton from "@/components/ui/Button/MainButton";
import styles from "./Profile.module.scss";
import { IUser } from "./Profile.interface";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/chat/useChat";
const Header: FC<{ data: IUser; id: string }> = ({ data, id }) => {
  console.log(data, id)
  const { user } = useAuth();
const {onSubmit} = useChat(user._id, id)
  const isOwner = user && user._id === id;

  return (
    <div className={styles.header}>
      <div className={styles.leftBlock}>
        <Image
          width={72}
          height={72}
          src={data.image ? data.image : baseImage}
          alt={"аватарка"}
        />
        <p>{data.nickname}</p>
      </div>
      {isOwner ? (
        <div className={styles.rightBlock}>
          {user.isContractor && (
            <Link className={styles.firstLink} href={"/add-work"}>
              Добавить работу
            </Link>
          )}

          <Link
            className={styles.secondLink}
            href={
              user.isContractor ? "/contractor/settings" : "/applicant/settings"
            }
          >
            Редактировать профиль
          </Link>
        </div>
      ) : (
        <div>
          <button onClick={onSubmit}>написать собщение</button>
        </div>
      )}
    </div>
  );
};

export default Header;
