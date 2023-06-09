import Toast from "@/components/toast";
import { LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { decodeToken } from "@/utils/auth";

interface UserTokenInfo {
  email: string;
  exp: number;
  iat: number;
  sub: string;
}

interface Props {
  children: ReactNode;
}

interface authProviderData {
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
  user: any;
  logout: () => void;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const [userTokenInfo, setUserTokenInfo] = useState<UserTokenInfo | null>(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies["connectUSER.token"];

  if (cookies["connectUSER.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["connectUSER.token"]}`;
  }
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setUserTokenInfo(decoded);
    }
  }, []);

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        Toast({ message: "usuário cadastrado com sucesso!", isSucess: true });
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Erro ao criar usuário, tente utilizar outro e-mail!" });
      });
  };

  const login = (loginData: LoginData) => {
    api
      .post("/login", loginData)
      .then((response) => {
        setCookie(null, "connectUSER.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/"
        });
      })
      .then(() => {
        Toast({ message: "Logado com sucesso!", isSucess: true });
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Usuario ou senha incorretos!" });
      });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        if (userTokenInfo !== null) {
          const response = await api.get(`/users/${userTokenInfo.sub}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Erro ao obter os clientes:", error);
        setUser(null);
      }
    };

    getUser();
  }, [userTokenInfo]);
  const logout = () => {
    Toast({
      message: "Deslogado com sucesso."
    });
    destroyCookie(null, "connectUSER.token");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ register, login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
