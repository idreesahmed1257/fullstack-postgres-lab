import { Add, CardGiftcard, DeleteOutline, Remove, ShoppingBag, ShoppingCartCheckout } from "@mui/icons-material";
import { Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
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
      const response = await toast.promise(
        createOrderMutation.mutateAsync({
          productIds,
          totalAmount: totalPrice,
        }),
        {
          loading: "Checking out...",
          success: "Order successful!",
          error: (err) => err?.response?.data?.message || "Order failed.",
        }
      );

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
      const response = await toast.promise(
        sendGiftMutation.mutateAsync({
          productIds,
          totalAmount: totalPrice,
          recipientEmail: giftEmail,
        }),
        {
          loading: "Sending gift...",
          success: "Gift sent successfully!",
          error: (err) => err?.response?.data?.message || "Failed to send Gifts.",
        }
      );

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
    <div className="bg-bg-main p-8 min-h-[90vh] flex flex-col gap-6">
      <Typography variant="h5" className="font-bold">
        Your Cart
      </Typography>

      <div className="h-[50vh] overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 mb-3 rounded-lg shadow-md bg-bg-paper">
              <div className="flex items-center gap-5">
                <img className="w-[100px] h-[100px] rounded-xl" src={item.thumbnail} alt="" />
                <div className="flex flex-col">
                  <span className="font-semibold text-text-dark">{item.title}</span>
                  <span className="font-medium text-primary">${item.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IconButton onClick={() => decreaseQuantity(item.id)} size="small" className="!bg-primary !text-white !min-w-[32px] !h-[32px] !p-0 !rounded-md">
                  <Remove />
                </IconButton>
                <Typography>{item.qty}</Typography>
                <IconButton onClick={() => increaseQuantity(item.id)} size="small" className="!bg-primary !text-white !min-w-[32px] !h-[32px] !p-0 !rounded-md">
                  <Add />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-primary gap-2">
            <ShoppingBag />
            <p>Your cart is empty</p>
          </div>
        )}
      </div>

      <div className="flex justify-between p-4 mt-auto font-semibold rounded-lg bg-bg-paper text-text-dark">
        <Typography>Total</Typography>
        <Typography>${totalPrice.toFixed(2)}</Typography>
      </div>

      <div className="flex gap-4">
        <Button variant="contained" startIcon={<CardGiftcard />} onClick={() => setGiftDialogOpen(true)} className="flex-1 !py-3 !font-semibold !bg-secondary !text-white">
          Send as Gift
        </Button>
        <Button onClick={checkOut} variant="contained" startIcon={<ShoppingCartCheckout />} className="flex-1 !py-3 !font-semibold !bg-primary !text-white">
          Checkout
        </Button>
        <Button variant="contained" startIcon={<DeleteOutline />} onClick={handleClearCart} className="flex-1 !py-3 !font-semibold !bg-red-500 !text-white">
          Clear Cart
        </Button>
      </div>

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
