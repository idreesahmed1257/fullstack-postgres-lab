import * as Yup from "yup";

export interface WalletFormInputs {
  email: string;
  amount: number;
}

export const walletSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  amount: Yup.number().typeError("Amount must be a number").positive("Amount must be greater than 0").required("Amount is required"),
});
