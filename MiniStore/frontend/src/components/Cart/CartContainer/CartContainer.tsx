import { Add, CardGiftcard, DeleteOutline, Remove, ShoppingBag, ShoppingCartCheckout } from "@mui/icons-material";
import { Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import styles from "./cartContainer.module.scss";
import { Product } from "../../../utils/interfaces";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore, useProductStore } from "../../../stores";
import { useCreateOrderMutation, useSendGiftMutation } from "../../../hooks/useAuthQueries";

const CartContainer = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQty, decreaseQty, resetCart } = useProductStore();
  const { deductWalletAmount } = useAuthStore();

  const [giftDialogOpen, setGiftDialogOpen] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");

  const createOrderMutation = useCreateOrderMutation();
  const sendGiftMutation = useSendGiftMutation();

  const increaseQuantity = (id: number | string) => {
    increaseQty(Number(id));
  };

  const decreaseQuantity = (id: number | string) => {
    decreaseQty(Number(id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const checkOut = async () => {
    try {
      const productIds = cartItems.map((item: Product) => Number(item.id));
      const response = await toast.promise(createOrderMutation.mutateAsync({ productIds, totalAmount: totalPrice }), {
        loading: "Checking out...",
        success: "Order successful!",
        error: (err) => err?.response?.data?.message || "Order failed.",
      });

      if (response?.status === 200 || response) {
        resetCart();
        deductWalletAmount(totalPrice);
        navigate("/");
      }
    } catch (error) {
      console.error("Order error:", error);
    }
  };

  const handleGift = async () => {
    if (!giftEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giftEmail)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const productIds = cartItems.map((item: Product) => Number(item.id));
      const response = await toast.promise(sendGiftMutation.mutateAsync({ productIds, totalAmount: totalPrice, recipientEmail: giftEmail }), {
        loading: "Sending gift...",
        success: "Gift sent successfully!",
        error: (err) => err?.response?.data?.message || "Failed to send Gifts.",
      });

      if (response?.status === 200 || response) {
        resetCart();
        deductWalletAmount(totalPrice);
        navigate("/");
      }
    } catch (error) {
      console.error("Gift order error:", error);
    } finally {
      setGiftDialogOpen(false);
    }
  };

  const handleClearCart = () => {
    resetCart();
    toast.success("Cart cleared.");
  };

  return (
    <div className={styles.cartContainer}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Your Cart
      </Typography>

      <div className={styles.itemContainer}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <div className={styles.itemLeft}>
                <img className={styles.itemImg} src={item.thumbnail} alt="" />
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.title}</span>
                  <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                </div>
              </div>
              <div className={styles.quantityControls}>
                <IconButton onClick={() => decreaseQuantity(item.id)} size="small">
                  <Remove />
                </IconButton>
                <Typography>{item.qty}</Typography>
                <IconButton onClick={() => increaseQuantity(item.id)} size="small">
                  <Add />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noItemMessage}>
            <ShoppingBag />
            <p>Your cart is empty</p>
          </div>
        )}
      </div>

      <div className={styles.totalSection}>
        <Typography>Total</Typography>
        <Typography>${totalPrice.toFixed(2)}</Typography>
      </div>

      <div className={styles.actions}>
        <Button variant="outlined" color="secondary" startIcon={<CardGiftcard />} onClick={() => setGiftDialogOpen(true)}>
          Send as Gift
        </Button>
        <Button onClick={checkOut} variant="contained" startIcon={<ShoppingCartCheckout />}>
          Checkout
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteOutline />} onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>

      {/* Gift Dialog */}
      <Dialog open={giftDialogOpen} onClose={() => setGiftDialogOpen(false)}>
        <DialogTitle>Send as Gift</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Recipient's Email" type="email" fullWidth value={giftEmail} onChange={(e) => setGiftEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGiftDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGift}>
            Send Gift
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CartContainer;
