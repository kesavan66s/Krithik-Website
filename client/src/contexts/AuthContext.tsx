import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";

export type UserRole = "admin" | "reader";

interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
  validateSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    setUser(null);
    localStorage.removeItem("kdrama-journal-user");
  }, []);

  const validateSession = useCallback(async () => {
    const storedUser = localStorage.getItem("kdrama-journal-user");
    if (!storedUser) {
      setIsValidating(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      const response = await fetch("/api/auth/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: parsedUser.id }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.valid) {
          setUser(data.user);
        } else {
          logout();
        }
      } else {
        const errorData = await response.json();
        if (errorData.invalidSession) {
          logout();
        }
      }
    } catch (e) {
      console.error("Session validation error:", e);
      logout();
    } finally {
      setIsValidating(false);
    }
  }, [logout]);

  useEffect(() => {
    validateSession();
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (!user) return;

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      logout();
    }, INACTIVITY_TIMEOUT);
  }, [user, logout]);

  useEffect(() => {
    if (!user) return;

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      resetInactivityTimer();
    };

    resetInactivityTimer();

    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [user, resetInactivityTimer]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const authUser = await response.json();
        setUser(authUser);
        localStorage.setItem("kdrama-journal-user", JSON.stringify(authUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isAuthenticated: Boolean(user),
        validateSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
