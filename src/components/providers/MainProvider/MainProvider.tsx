"use client";

import { FC, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { ReduxProvider } from "../ReduxProvider";
import Header from "@/components/layout/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useActions } from "@/hooks/useActions";
import { Metrika } from "@/utils/metrika";
import AuthProvider from "../AuthProvider/AuthProvider";
import CookieBanner from "@/components/ui/Cookie-banner/CookieBanner";
const animation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

// eslint-disable-next-line react-hooks/rules-of-hooks
const queryClient = new QueryClient();

const MainProvider: FC<{ children: any }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        {pathname !== "/" &&
          pathname !== "/login" &&
          pathname !== "/signup" &&
          pathname !== "/signup-workers" &&
          pathname !== "/project" &&
          !pathname.startsWith("/form/") && ( // Проверка на начало пути
            <Header />
          )}
        <motion.div
          className="mt-[7vh]"
          variants={animation}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Metrika />
          <AuthProvider>
          {children}
          </AuthProvider>
          <CookieBanner />
        </motion.div>
      </ReduxProvider>
         <Toaster />
    </QueryClientProvider>
  );
};

export default MainProvider;
