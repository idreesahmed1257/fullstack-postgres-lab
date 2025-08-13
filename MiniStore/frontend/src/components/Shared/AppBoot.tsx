import React, { useEffect } from "react";
import apiInterceptor from "../../services/ApiInterceptor";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { updateWalletAmount } from "../../Redux/slice/auth.slice";

const AppBoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const validateAccessToken = async () => {
    try {
      const response = await apiInterceptor.post("/users/validate-token");
      dispatch(updateWalletAmount({ walletAmount: response?.data?.data?.walletBalance }));
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    validateAccessToken();
  }, []);
  return <></>;
};

export default AppBoot;
