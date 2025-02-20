import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<{
  error: string | null;
  user: {
    id: string | null;
    email: string | null;
    username: string | null;
  };
  login: (authData: IAuthData) => Promise<void>;
  logout: () => void;
}>({
  error: null,
  user: { id: null, email: null, username: null },
  login: async () => {},
  logout: () => {},
});

interface IAuthData {
  email: string;
  password: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const navigate = useNavigate();
  const session = sessionStorage.getItem("user");
  const [user, setUser] = useState(
    session ? JSON.parse(session) : { id: null, email: null, username: null }
  );

  const [error, setError] = useState<string | null>(null);

  const login = async (authData: IAuthData) => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    });

    if (!res.ok) {
      console.log("aa");
      const errorData = await res.json();
      setError(errorData.message);
      return;
    }
    const data = await res.json();
    sessionStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    navigate("/");
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/auth");
  };
  return (
    <AuthContext.Provider value={{ user, login, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
