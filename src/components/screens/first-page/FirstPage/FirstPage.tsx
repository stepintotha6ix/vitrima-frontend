"use client";
import React, { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./FirstPage.module.scss";
import icon from "@/app/assets/images/MainLogoBlack.svg";
import { MainLogo } from "@/components/common/icons/MainLogo";
import OnboardCards from "../onboard-cards/OnboardCards";
import clsx from "clsx";
import Footer from "@/components/layout/footer/Footer";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useGallery } from "../../main-page/UseGallery";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import TimeUpload from "@/components/ui/masonry/timeUpload/TimeUpload";
const FirstPage: FC = () => {
  const { ref, inView } = useInView();
  const { user } = useAuth();
  const breakpointColumnsObj = {
    default: 4,
    900: 3,
   
  };
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
 

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGallery("interior", {});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  useEffect(() => {
    const loadInitialPage = async () => {
      if (inView && data?.pages && data.pages.length > 0) {
        const minPage = data.pages[data.pages.length - 1]?.pageParam + 1 || 1;
        await fetchNextPage({
          pageParam: minPage,
        });
      }
    };

    loadInitialPage();
  }, [inView, data, fetchNextPage]);

  const objects = data?.pages.flatMap((page) => page.data);
  return (
    // <div>
    //   <div className={styles.container}>
    //     <div className={styles.iconContent}>
    //       <div className={styles.imageContainer}>
    //         <Image src={icon} width={1200} draggable={false} alt="Vitrima" />
    //       </div>
    //       <h4>Сервис возможностей </h4>
    //       <Link href={"/select-feed"}>Выбор ленты</Link>
    //     </div>
    //     <div className={styles.detailed} onClick={scrollToOnboardCards}>
    //       Подробнее
    //     </div>
    //     <div id="onboardCardsSection">
    //       <OnboardCards />
    //     </div>
    //     <RegisterBanner />
    //     <Footer />
    //   </div>
    // </div>

    <div>
      <div className={styles.container}>
        <div>
          <div className={styles.mainBlock}>
            <div className={styles.leftBlock}>
              <Image src={icon} alt={""} width={500} height={300} />
              <h1 className={styles.title}>Сервис возможностей</h1>
              <div className={styles.links}>
                <Link href={"/select-feed"} className={styles.link}>Просмотр ленты</Link>
             
                <Link href={'/signup'} className={styles.secondLink}>Регистрация</Link>
                <Link href={'/login'} className={styles.lastLink}>Авторизация</Link>
              </div>
              <div>

              </div>
            </div>
            <div className={styles.rightBlock}>
              <div className={styles.gallery}>
                <Masonry breakpointCols={breakpointColumnsObj} className={styles.masonryGallery}>
                  {objects?.map((item, index) => (
                    <div
                      key={item._id}
                      className="relative"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            className={styles.hover}
                            style={{
                              left: hoverPosition.x,
                              top: hoverPosition.y,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Здесь ваше содержимое */}
                            <p className={styles.hoverTitle}>
                              Работа {item.contractorId.nickname}
                            </p>
                            <p className={styles.hoverTimeUpload}>
                              <TimeUpload
                                date={item.createdAt}
                                withIcon={false}
                              />
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Image
                        src={item.images[0]}
                        width={500}
                        height={10}
                        alt={""}
                        className="transition-all mb-2 rounded-lg opacity-0 duration-300"
                        onLoadingComplete={(image) =>
                          image.classList.remove("opacity-0")
                        }
                      />
                    </div>
                  ))}
                  {data?.pages[data.pages.length - 1]?.data.length <= 5 ? (
                    <h1 className="text-center text-[3vw] my-16 text-gray-450 select-none">
                      На этом всё
                    </h1>
                  ) : (
                    <button ref={ref} className="mt-1" />
                  )}
                </Masonry>
              </div>
            </div>
          </div>
        </div>

      
        <div id="onboardCardsSection">
          <OnboardCards />
        </div>
        {/* <RegisterBanner /> */}
        <Footer />
      </div>
    </div>
  );
};

export default FirstPage;
