import axios from "axios";
import Cookies from "js-cookie";

import {
  IAuthApplicantResponse,
  IAuthContractorResponse,
  IAuthResponse,
} from "@/store/user/user.interface";
import { removeTokensStorage, saveToStorage } from "./auth.helper";
import { API_URL, getAuthUrl } from "@/config/api.config";
import { getContentType } from "@/api/api.helpers";
import { axiosClassic } from "@/api/interceptors";


export const AuthService = {
  async registerApplicant(email: string, password: string, nickname: string) {
    const response = await axiosClassic.post<IAuthApplicantResponse>(
      `${API_URL}${getAuthUrl("/register/applicant")}`,
      {
        email,
        password,
        nickname,
      }
    );

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response;
  },

  async registerWorker(email: string, password: string, nickname: string) {
    const response = await axiosClassic.post<IAuthApplicantResponse>(
      `${API_URL}${getAuthUrl("/register/worker")}`,
      {
        email,
        password,
        nickname,
      }
    );

    if (response.data.accessToken) {
      console.log(response.data)
      saveToStorage(response.data);
    }

    return response;
  },

  async registerContractor(
    email: string,
    password: string,
    nickname: string,
  ) {
    const response = await axios.post<IAuthContractorResponse>(
      `${API_URL}${getAuthUrl("/register/contractor")}`,
      {
        email,
        password,
        nickname,
      }
    );

    if (response.data.accessToken) {
      saveToStorage(response.data);
      window.location.reload();
    }
    return response;
  },

  async login(email: string, password: string) {
    const response = await axios.post<IAuthResponse>(
      `${API_URL}${getAuthUrl("/login")}`,
      {
        email,
        password,
      }
    );
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response;
  },
  async logout() {
    const refreshToken = Cookies.get("refreshToken");
    removeTokensStorage();
    localStorage.removeItem("user");
    const response = await axiosClassic.post(getAuthUrl("/logout"), {
      refreshToken,
    });

    return response;
  },
  async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axios.post<IAuthResponse>(
			`${API_URL}${getAuthUrl('/login/access-token')}`,
			{
				refreshToken,
			},
			{
				headers: getContentType(),
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},

  async resetPassword(email: string) {
    const response = await axiosClassic.post(
      getAuthUrl("/send-reset-email"),
      email
    );

    return response;
  },
  async newPassword(newPassword: string, token: string) {
    const response = await axiosClassic.post(getAuthUrl("/reset-password"), {
      newPassword,
      token,
    });

    return response;
  },
};
