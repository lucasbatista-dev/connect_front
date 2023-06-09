/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import api from "@/services/api";
import { decodeToken } from "@/utils/auth";
import Toast from "@/components/toast";

interface UserTokenInfo {
  email: string;
  exp: number;
  iat: number;
  sub: string;
}
export interface Client {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  fullName: string;
  id: string;
  phoneNumber: string;
  updatedAt: string;
  userId: string;
}
export interface UpdateClient {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
}


interface Props {
  children: ReactNode;
}
interface ClientsProviderData {
  clients: Client[] | null;
  createClient: (newClient: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  updateClient: (id: string, updatedClient: Client) => Promise<void>;
}

const ClientsContext = createContext<ClientsProviderData>({} as ClientsProviderData);

export const ClientsProvider = ({ children }: Props) => {
  const cookies = parseCookies();
  const [userTokenInfo, setUserTokenInfo] = useState<UserTokenInfo | null>(null);
  const [clients, setClients] = useState<(Client[] | null)>(null);
  const [client, setClient] = useState<(Client | null)>(null);


  const token = cookies["connectUSER.token"]


  if (cookies["connectUSER.token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["connectUSER.token"]}`;
  }
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token)
      setUserTokenInfo(decoded)
    }

  }, []);


  useEffect(() => {
    const getClients = async () => {
      try {
        if (userTokenInfo !== null) {
          const response = await api.get(`/clients/user/${userTokenInfo.sub}`);
          setClients(response.data);
        }
      } catch (error) {
        console.error("Erro ao obter os clientes:", error);
        setClients(null);

      }
    };

    getClients();
  }, [userTokenInfo]);

  const createClient = async (newClient: Client) => {
    try {
      const response = await api.post("/clients", newClient);
      setClients((prevClients) => {
        if (prevClients) {
          return [...prevClients, response.data];
        }
        return [response.data];
      });
      Toast({ message: "Cliente criado com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar o cliente:", error);
      Toast({ message: "Erro ao criar o cliente. Por favor, tente novamente." });
    }
  }
  const deleteClient = async (id: string) => {
    try {
      await api.delete(`/clients/${id}`);
      const response = await api.get(`/clients/user/${userTokenInfo?.sub}`);
      setClients(response.data)
      Toast({ message: "Cliente deletado com sucesso." });;
    } catch (error) {
      console.error("Erro ao deletar o cliente:", error);
      Toast({ message: "Erro ao deletar o cliente. Por favor, tente novamente." });
    }
  };
  const updateClient = async (id: string, updatedClient: UpdateClient) => {
    try {
      await api.patch(`/clients/${id}`, updatedClient);
      const response = await api.get(`/clients/user/${userTokenInfo?.sub}`);
      setClients(response.data)
      Toast({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar o cliente:", error);
      Toast({ message: "Erro ao criar o cliente. Por favor, tente novamente." });
    }
  };


  return <ClientsContext.Provider value={{ clients, createClient, deleteClient, updateClient }}>{children}</ClientsContext.Provider>;
};

export const useClients = () => useContext(ClientsContext);