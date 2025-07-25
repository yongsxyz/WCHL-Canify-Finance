// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

interface AuthContextType {
  isAuthenticated: boolean;
  principal: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean; // NEW
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // NEW

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const isLoggedIn = await client.isAuthenticated();
      setIsAuthenticated(isLoggedIn);
      if (isLoggedIn) {
        const identity = client.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
      }
      setIsLoading(false); // DONE LOADING
    });
  }, []);

  const login = async () => {
    if (!authClient) throw new Error("Auth client not initialized");

    return new Promise<void>((resolve, reject) => {
      authClient.login({
        identityProvider: "https://id.ai/#authorize",
        onSuccess: async () => {
          setIsAuthenticated(true);
          const identity = authClient.getIdentity();
          setPrincipal(identity.getPrincipal().toText());
          resolve();
        },
        onError: (error) => {
          setIsAuthenticated(false);
          setPrincipal(null);
          reject(new Error(`Login failed: ${error}`));
        },
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000) // 1 week
      });
    });
  };

  const logout = async () => {
    if (!authClient) return;

    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, principal, login, logout, isLoading }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
