import Toast from "@/components/toast";
import { LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect
} from "react";
import { parseCookies, setCookie } from "nookies";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
  setUser: Dispatch<SetStateAction<any>>;
  user: UserData | null;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const cookies = parseCookies();
  useEffect(() => {
    const savedUser = cookies.user;
    if (savedUser) {
      const decodedUser = decodeURIComponent(savedUser);
      const userObj = JSON.parse(decodedUser);
      setUser(userObj);
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
    let emailUser = {
      email: String,
      password: String
    };
    api
      .post("/login", loginData)
      .then((response) => {
        emailUser = JSON.parse(response.config.data);
        api
          .get(`/users/email/${emailUser.email}`, {
            headers: {
              Authorization: `Bearer ${response.data.token}`
            }
          })
          .then((response) => {
            setUser(response.data);
            setCookie(null, "user", JSON.stringify(response.data), {
              maxAge: 60 * 30,
              path: "/"
            });
          });
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
  return (
    <AuthContext.Provider value={{ register, login, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
