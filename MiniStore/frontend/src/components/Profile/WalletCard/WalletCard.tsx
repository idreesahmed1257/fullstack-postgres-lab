import { CardGiftcard } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./walletCard.module.scss";
import { sendCreditsService } from "../../../services/credit.service";
import { useDispatch } from "react-redux";
import { deductWalletAmount } from "../../../Redux/slice/auth.slice";
import { useForm } from "react-hook-form";
import { WalletFormInputs, walletSchema } from "./walletCard.helper";
import { yupResolver } from "@hookform/resolvers/yup";

const WalletCard = ({ balance }: { balance?: number }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WalletFormInputs>({
    resolver: yupResolver(walletSchema),
  });

  const dispatch = useDispatch();

  const handleGiftCredits = () => {
    setOpen(true);
  };

  const handleSend = async (data: WalletFormInputs) => {
    try {
      const response = await toast.promise(sendCreditsService(Number(data.amount), data.email), {
        loading: "Sending Credits...",
        success: "Credits sent successfully!",
        error: (err) => err?.response?.data?.message || "Failed to send Credits.",
      });

      if (response?.status === 200) {
        reset();
        setOpen(false);
        dispatch(deductWalletAmount({ orderAmount: Number(data.amount) }));
      }
    } catch (error) {
      console.error("Credit order error:", error);
      setOpen(false);
    }
  };

  return (
    <div className={styles.overviewCards}>
      <div className={styles.card}>
        <div>
          <p>Wallet Balance</p>
          <h2>${(balance ?? 0).toFixed(2)}</h2>
        </div>
        <Button className={styles.giftButton} variant="outlined" startIcon={<CardGiftcard />} onClick={handleGiftCredits}>
          Gift Credits
        </Button>
      </div>

      <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Gift Credits</DialogTitle>
        <form onSubmit={handleSubmit(handleSend)}>
          <DialogContent className={styles.contentForm}>
            <div>
              <TextField size="small" label="Recipient's Email" type="text" fullWidth {...register("email")} />
              {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
            </div>
            <div>
              <TextField size="small" label="Amount" type="text" fullWidth {...register("amount")} />
              {errors.amount && <p className={styles.errorMsg}>{errors.amount.message}</p>}
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
