import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { singIn, singUp } from "../services/users-services";

interface IUserData {
  id: string | null;
  email: string | null;
  img: string | null;
  username: string | null;
  votes: {
    liked: string[];
    disliked: string[];
  };
}
export const AuthContext = createContext<{
  error: string | null;
  user: IUserData;
  login: (authData: IAuthData) => Promise<void>;
  register: (authData: IAuthData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: IUserData) => void;
}>({
  error: null,
  user: {
    id: null,
    email: null,
    img: null,
    username: null,
    votes: {
      liked: [],
      disliked: [],
    },
  },
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
});

interface IAuthData {
  email: string;
  password: string;
  username?: string;
  repeatPassword?: string;
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

  const updateUser = (userData: IUserData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const login = async (authData: IAuthData) => {
    const { data, error } = await singIn(authData);

    if (error) {
      setError(error);
      return;
    }

    sessionStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    navigate("/");
  };

  const register = async (authData: IAuthData) => {
    const { data, error } = await singUp(authData);

    if (error) {
      setError(error);
      return;
    }

    sessionStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    navigate("/");
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/auth");
  };
  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
