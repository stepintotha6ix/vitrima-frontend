import { IApplicant, IContractor } from "@/components/shared/types/user.types";

export interface IContractorState {
  email: string;
  isContractor: boolean
  isAdmin: boolean
  isSubscribe: boolean
_id: string
}
export interface IApplicantState {
  email: string;
  isContractor: boolean
  isAdmin: boolean
  _id: string
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUserInitialState {
  user: IApplicantState | IContractorState | null;
  isLoading: boolean;
}
export interface InterfaceEmailPassword {
  email: string;
  password: string;
}
export interface ISignUpApplicant {
  email: string;
  password: string;

  nickname: string;
}
export interface ISignUpContractor {
  email: string;
  password: string;
  nickname: string;
  // inn: string;
 
}
export interface IAuthApplicantResponse extends ITokens {
  user: IApplicant;
}
export interface IAuthContractorResponse extends ITokens {
  user: IContractor;
}

export interface IAuthResponse extends ITokens {
  user: (IApplicant | IContractor) & {
    isAdmin: boolean
    isContractor: boolean
  }
}
