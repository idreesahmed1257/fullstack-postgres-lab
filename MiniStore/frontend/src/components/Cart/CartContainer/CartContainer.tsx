import { Add, CardGiftcard, DeleteOutline, Remove, ShoppingBag, ShoppingCartCheckout } from "@mui/icons-material";
import { Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty, resetCart } from "../../../Redux/slice/product.slice";
import { AppDispatch, RootState } from "../../../Redux/store";
import styles from "./cartContainer.module.scss";
import { Product } from "../../../utils/interfaces";
import toast from "react-hot-toast";
import { createOrderService } from "../../../services/order.service";
import { useNavigate } from "react-router-dom";
import { deductWalletAmount } from "../../../Redux/slice/auth.slice";
import { useState } from "react";
import { sendGiftService } from "../../../services/gift.service";

const CartContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: RootState) => state.product);

  const [giftDialogOpen, setGiftDialogOpen] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");

  const increaseQuantity = (id: number | string) => {
    dispatch(increaseQty({ productId: Number(id) }));
  };

  const decreaseQuantity = (id: number | string) => {
    dispatch(decreaseQty({ productId: Number(id) }));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const checkOut = async () => {
    try {
      const productIds = cartItems.map((item: Product) => Number(item.id));
      const response = await toast.promise(createOrderService(productIds, totalPrice), {
        loading: "Checking out...",
        success: "Order successful!",
        error: (err) => err?.response?.data?.message || "Order failed.",
      });

      if (response?.status === 200) {
        dispatch(resetCart());
        dispatch(deductWalletAmount({ orderAmount: totalPrice }));
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
      const response = await toast.promise(
        sendGiftService(productIds, totalPrice, giftEmail), // separate endpoint
        {
          loading: "Sending gift...",
          success: "Gift sent successfully!",
          error: (err) => err?.response?.data?.message || "Failed to send Gifts.",
        }
      );

      if (response?.status === 200) {
        dispatch(resetCart());
        dispatch(deductWalletAmount({ orderAmount: totalPrice }));
        navigate("/");
      }
    } catch (error) {
      console.error("Gift order error:", error);
    } finally {
      setGiftDialogOpen(false);
    }
  };

  const handleClearCart = () => {
    dispatch(resetCart());
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
