import { CardGiftcard } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { WalletFormInputs, walletSchema } from "./walletCard.helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "../../../stores";
import { useSendCreditsMutation } from "../../../hooks/useAuthQueries";

const WalletCard = ({ balance }: { balance?: number }) => {
  const [open, setOpen] = useState(false);
  const { deductWalletAmount } = useAuthStore();
  const sendCreditsMutation = useSendCreditsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WalletFormInputs>({
    resolver: yupResolver(walletSchema),
  });

  const handleGiftCredits = () => {
    setOpen(true);
  };

  const handleSend = async (data: WalletFormInputs) => {
    try {
      const response = await toast.promise(
        sendCreditsMutation.mutateAsync({
          amount: Number(data.amount),
          email: data.email,
        }),
        {
          loading: "Sending Credits...",
          success: "Credits sent successfully!",
          error: (err) => err?.response?.data?.message || "Failed to send Credits.",
        }
      );

      if (response?.status === 200 || response) {
        reset();
        setOpen(false);
        deductWalletAmount(Number(data.amount));
      }
    } catch (error) {
      console.error("Credit order error:", error);
      setOpen(false);
    }
  };

  return (
    <div className="w-full gap-4 mb-8">
      <div className="flex flex-col items-center h-full p-4 font-bold text-center border bg-bg-paper rounded-xl text-text-dark border-primary justify-evenly">
        <div>
          <p>Wallet Balance</p>
          <h2 className="text-primary">${(balance ?? 0).toFixed(2)}</h2>
        </div>
        <Button variant="outlined" startIcon={<CardGiftcard />} onClick={handleGiftCredits} className="font-bold normal-case border-secondary bg-bg-main hover:border-primary hover:text-primary">
          Gift Credits
        </Button>
      </div>

      <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Gift Credits</DialogTitle>
        <form onSubmit={handleSubmit(handleSend)}>
          <DialogContent className="flex flex-col gap-5 min-w-[400px]">
            <div className="w-full">
              <TextField size="small" label="Recipient's Email" type="text" fullWidth {...register("email")} />
              {errors.email && <p className="text-[#d32f2f] text-[0.85rem] mt-1 font-semibold w-full">{errors.email.message}</p>}
            </div>
            <div className="w-full">
              <TextField size="small" label="Amount" type="text" fullWidth {...register("amount")} />
              {errors.amount && <p className="text-[#d32f2f] text-[0.85rem] mt-1 font-semibold w-full">{errors.amount.message}</p>}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default WalletCard;
