"use client";
import { ChangeEvent, MouseEvent, useEffect } from "react";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import styles from "./Navigation.module.scss";
import SearchField from "@/components/ui/Search-field/SearchField";

import { MainLogo } from "@/components/common/icons/MainLogo";
import clsx from "clsx";
import Search from "./search/search";
import Avatar from "./avatar/Avatar";
import DropdownMenu from "./dropdown-menu/DropdownMenu";
import Filter from "@/components/screens/filter/Filter";

const Navigation = () => {
  const { user } = useAuth();

  const { logout } = useActions();

 




  const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={clsx({
          [styles.navigationAuth]: user !== null,
          [styles.navigationNotAuth]: user === null,
        })}
      >
        <Link href="/">
          
          <MainLogo width={201} />
        </Link>
        {user ? (
          <>
            <div className="mx-12">
              <Search />
            </div>
            <div className={styles.buttons}>
              <Link className="mr-6" href={'/chat'}>ЧАТ</Link>
              <Filter/>
              <DropdownMenu />  
            </div>
          </>
        ) : (
          <Link className={styles.button} href={"/login"}>
            ВХОД / РЕГИСТРАЦИЯ
          </Link>
        )}
      </div>
    </div>
  );
};

// export const getServerSideProps = async () => {
//   // Получите данные пользователя (роль) с сервера или из вашего API
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { user } = useAuth();

//   return {
//     props: {
//       isUser: user,
//     },
//   };
// };

export default Navigation;
