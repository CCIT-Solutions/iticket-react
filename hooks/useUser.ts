import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";

export const useUser = () => {
  const [hydrated, setHydrated] = useState(false);

  const {
    user,
    token,
    isAuthenticated,
    setUser,
    updateUser,
    logout,
    isLoading,
  } = useUserStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  return {
    user: hydrated ? user : null,
    token: hydrated ? token : null,
    isAuthenticated: hydrated ? isAuthenticated : false,
    isLoading: hydrated ? isLoading : true,
    setUser,
    updateUser,
    logout,
  };
};
