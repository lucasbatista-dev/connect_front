import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { useAuth } from "@/contexts/authContext";
import { useClients } from "@/contexts/clientsContext";
import ClientCard from "@/components/card";
import ModalCenter from "@/components/modal";
import { useForm } from "react-hook-form";

export default function DashboardPage() {
  const { clients, createClient } = useClients();
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: any) => {
    createClient(data);
    closeModal();
  };
  useEffect(() => {
    if (user !== null) {
      setIsLoadingUser(false);
    }
  }, [user]);

  if (isLoadingUser) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="bg-gray-900 bg-opacity-90 h-screen w-screen flex">
      <header className="w-full h-16 absolute border border-brown-200 bg-transparent flex px-8 justify-between">
        <Image src={logo} alt="logo" className="h-16 w-56" />
        <button className="px-2 bg-brown-200 text-black" onClick={() => logout()}>
          Logout
        </button>
      </header>
      <aside className="bg-brown-200 w-96 h-screen py-20">
        <h2>Bem vindo(a) {user?.name}</h2>
      </aside>
      <div>
        <ModalCenter
          title="Adicionar Cliente"
          buttonText="Adicionar cliente"
          modalContent={
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="fullName">Nome completo</label>
              <input
                type="text"
                id="fullName"
                className="border border-gray-300 p-2"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && <span className="text-red-500">Este campo é obrigatório</span>}

              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-2"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && (
                <span className="text-red-500">
                  Este campo é obrigatório e deve ser um e-mail válido
                </span>
              )}

              <label htmlFor="phoneNumber">Número de telefone</label>
              <input
                type="tel"
                id="phoneNumber"
                className="border border-gray-300 p-2"
                {...register("phoneNumber", { required: true, pattern: /^\d+$/ })}
              />
              {errors.phoneNumber && (
                <span className="text-red-500">
                  Este campo é obrigatório e deve conter apenas números
                </span>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Enviar
              </button>
            </form>
          }
          onClose={closeModal}
        />
        {clients ? (
          clients.map((client) => <ClientCard key={client.id} client={client} />)
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    </main>
  );
}
