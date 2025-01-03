import { AuthService } from "@/services/auth/auth.service";
import toast from 'react-hot-toast';

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ISignUpContractor,
  ISignUpApplicant,
  InterfaceEmailPassword,
  IAuthApplicantResponse,
  IAuthResponse,
  IAuthContractorResponse,
  IAuthWorkerResponse,
  ISignUpWorker,
} from "./user.interface";
import { errorCatch } from "@/api/api.helpers";
import { usePathname } from "next/navigation";


export const registerWorker = createAsyncThunk<
IAuthWorkerResponse,
ISignUpWorker
>(
  "auth/register/worker",
    async ({ email, password, nickname }, thunkApi) => {
     
      try {
        const response = await AuthService.registerWorker(
          email,
          password,
          nickname,

        );
        // toast.success("Вы успешно зарегистрировались! Пожалуйста, подтвердите вашу почту, на нее уже отправлено письмо")
        toast.success("Вы успешно зарегистрировались!");

        return response.data;
      } catch (error: any) {
        toast.error(error.response.data.message);

        return thunkApi.rejectWithValue(error);
      }
    }
  );

export const registerApplicant = createAsyncThunk<
  IAuthApplicantResponse,
  ISignUpApplicant
>(
  "auth/register/applicant",
  async ({ email, password, nickname }, thunkApi) => {
  
    try {
      const response = await AuthService.registerApplicant(
        email,
        password,
        nickname
      );
      // toast.success("Вы успешно зарегистрировались! Пожалуйста, подтвердите вашу почту, на нее уже отправлено письмо")
      
      
      if (localStorage.getItem("redirectToProject") === "true") {

        window.location.href = "/project";
        localStorage.removeItem("redirectToProject"); // Очистить флаг
        return response.data;
      }

      return response.data;
      
    } catch (error: any) {
      toast.error(error.response.data.message);

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const registerContractor = createAsyncThunk<
  IAuthContractorResponse,
  ISignUpContractor
>(
  "auth/register/contractor",
  async ({ email, password, nickname }, thunkApi) => {
    try {
      const response = await AuthService.registerContractor(
        email,
        password,
        nickname,
        
      );

      // toast.success("Вы успешно зарегистрировались! Пожалуйста, подтвердите вашу почту, на нее отправлено уже письмо")
      toast.success("Вы успешно зарегистрировались!");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IAuthResponse, InterfaceEmailPassword>(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.login(email, password);

      return response.data;
    } catch (error) {
      toast.error("Неправильный логин или пароль");

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/check-auth",
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens();

      return response.data;
    } catch (error) {
      if (errorCatch(error) === "токен не является строкой") {
        thunkApi.dispatch(logout());
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);
