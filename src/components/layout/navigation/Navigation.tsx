import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import styles from "./Navigation.module.scss";
import { MainLogo } from "@/components/common/icons/MainLogo";
import clsx from "clsx";
import Search from "./search/search";
import { motion } from "framer-motion";
import DropdownMenu from "./dropdown-menu/DropdownMenu";
import Filter from "@/components/screens/filter/Filter";
import { usePathname } from "next/navigation";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SocketApi from "@/api/socket";
import { useSelector } from "react-redux";
import { useUnreadMessages } from "@/hooks/chat/useUnreadMessages";

const animation = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
const Navigation = () => {
  const {data} = useUnreadMessages()
  const countUnreadMessages = data?.length  ?? 0
  // console.log(data.length)
  const { user } = useAuth();
  const pathname = usePathname().substring(1);
 
  const [arrivalMessage, setArrivalMessage] = useState(false);

  useEffect(() => {
    SocketApi.createConnection();

    SocketApi.socket?.on("sendNotification", (senderId) => {
      
      if (user && user._id !== senderId) {
        setArrivalMessage(true);
      }
    });

    const savedArrivalMessage = localStorage.getItem("arrivalMessage");
    if (savedArrivalMessage === "true") {
      setArrivalMessage(true);
    }

    return () => {
      localStorage.removeItem("arrivalMessage");
    };
  }, [user]);

  // Обработчик события для ссылки "чат", который сбрасывает уведомление
  const handleChatLinkClick = () => {
    setArrivalMessage(false);
    localStorage.removeItem("arrivalMessage");
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial="hidden"
      whileInView="visible"
      variants={animation}
    >
      <div
        className={clsx({
          [styles.navigationAuth]: user !== null,
          [styles.navigationNotAuth]: user === null,
        })}
      >
        <Link className={styles.logo} href="/select-feed">
          <MainLogo height={30} />
        </Link>
        {user ? (
          <>
            <div className="w-[65vw] mx-[2.5vw]">
              <Search />
            </div>
            <div className={styles.buttons}>
              <Link
                className={styles.chatButton}
                href={"/chat"}
                onClick={handleChatLinkClick} // Добавим обработчик события
              >
                ЧАТ
                {countUnreadMessages > 0 && (
                  <div className={styles.notification} />
                )}
              </Link>
              {(pathname === "architecture" || pathname === "interior") && (
                <Filter />
              )}
              <DropdownMenu />
            </div>
          </>
        ) : (
          <div className="flex select-none">
            <Link className={styles.button} href={"/login"}>
              ВХОД
            </Link>
            <p className={styles.apost}>&nbsp;/&nbsp;</p>
            <Link className={styles.button} href={"/signup"}>
              РЕГИСТРАЦИЯ
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navigation;
