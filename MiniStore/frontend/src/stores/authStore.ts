import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '../utils/interfaces';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  walletBalance: number;
}

interface AuthActions {
  loginSuccess: (user: User, token: string) => void;
  logout: () => void;
  deductWalletAmount: (orderAmount: number) => void;
  updateWalletAmount: (walletAmount: number) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuth: false,
      walletBalance: 0,

      loginSuccess: (user: User, token: string) => {
        set({
          user,
          token,
          isAuth: true,
        });
      },

      logout: () => {
        Cookies.remove('accessToken');
        set({
          user: null,
          token: null,
          isAuth: false,
          walletBalance: 0,
        });
      },

      deductWalletAmount: (orderAmount: number) => {
        const { walletBalance } = get();
        set({
          walletBalance: (walletBalance || 0) - orderAmount,
        });
      },

      updateWalletAmount: (walletAmount: number) => {
        set({
          walletBalance: walletAmount,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuth: state.isAuth,
        walletBalance: state.walletBalance,
      }),
    }
  )
);
