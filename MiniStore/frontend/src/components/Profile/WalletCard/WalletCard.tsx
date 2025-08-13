import { CardGiftcard } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./walletCard.module.scss";
import { sendCreditsService } from "../../../services/credit.service";
import { useDispatch } from "react-redux";
import { deductWalletAmount } from "../../../Redux/slice/auth.slice";

const WalletCard = ({ balance }: { balance?: number }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();

  const handleGiftCredits = () => {
    setOpen(true);
  };

  const handleSend = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      const response = await toast.promise(sendCreditsService(Number(amount), email), {
        loading: "Sending Credits...",
        success: "Credits sent successfully!",
        error: (err) => err?.response?.data?.message || "Failed to send Credits.",
      });

      if (response?.status === 200) {
        setEmail("");
        setAmount("");
        setOpen(false);
        dispatch(deductWalletAmount({ orderAmount: Number(amount) }));
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Gift Credits</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Recipient's Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="dense" label="Amount" type="number" fullWidth value={amount} onChange={(e) => setAmount(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WalletCard;
