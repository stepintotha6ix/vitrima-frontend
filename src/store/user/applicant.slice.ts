import { ApplicantModel } from '../../../../back/src/user/Schemas/user.model';
import { createSlice } from "@reduxjs/toolkit";
import { IUserInitialState } from "./user.interface";
import { getStoreLocal } from "@/utils/local-storage";
import {
  checkAuth,
  login,
  logout,
  registerApplicant,
  registerContractor,
} from "./user.actions";

const initialState = {
  isLoading: false,
  applicant: getStoreLocal("applicant")
};

export const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerApplicant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerApplicant.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.applicant = payload.user;
      })
      .addCase(registerApplicant.rejected, (state) => {
        state.isLoading = true;
        state.applicant = null;
      })
      
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.applicant = payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = true;
        state.applicant = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.applicant = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.applicant = payload.user;
      });
  },
});

export const { reducer } = applicantSlice;
