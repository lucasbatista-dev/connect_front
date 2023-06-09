import React, { useState } from "react";
import { Client, UpdateClient, useClients } from "@/contexts/clientsContext";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { useForm } from "react-hook-form";
import ModalCenter from "./modal";

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const [isHoveredTrash, setIsHoveredTrash] = useState(false);
  const [isHoveredPencil, setIsHoveredPencil] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteClient, updateClient } = useClients();
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    const existingClient = client;
    const updatedClient: Client = { ...existingClient };
    console.log(existingClient);

    if (data.email) {
      updatedClient.email = data.email;
    }

    if (data.fullName) {
      updatedClient.fullName = data.fullName;
    }

    if (data.phoneNumber) {
      updatedClient.phoneNumber = data.phoneNumber;
    }

    await updateClient(existingClient.id, updatedClient);
    closeModal();
  };

  const handleMouseEnterTrash = () => {
    setIsHoveredTrash(true);
  };

  const handleMouseLeaveTrash = () => {
    setIsHoveredTrash(false);
  };

  const handleMouseEnterEdit = () => {
    setIsHoveredPencil(true);
  };

  const handleMouseLeaveEdit = () => {
    setIsHoveredPencil(false);
  };

  return (
    <div className="bg-brown-200 rounded-lg shadow-lg p-6 relative">
      <h3 className="text-lg font-semibold mb-2">{client.fullName}</h3>
      <p className="text-gray-800 mb-2">Email: {client.email}</p>
      <p className="text-gray-800">Telefone: {client.phoneNumber}</p>
      <button
        onClick={() => deleteClient(client.id)}
        className="absolute top-2 right-2 flex items-center"
        onMouseEnter={handleMouseEnterTrash}
        onMouseLeave={handleMouseLeaveTrash}>
        <BsFillTrash3Fill />
        {isHoveredTrash && <span className="ml-2">Deletar usuário</span>}
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-8 right-2 flex items-center"
        onMouseEnter={handleMouseEnterEdit}
        onMouseLeave={handleMouseLeaveEdit}>
        <BsPencilSquare />
        {isHoveredPencil && <span className="ml-2">Editar usuário</span>}
      </button>
      {isModalOpen && (
        <ModalCenter
          title="Editar Cliente"
          buttonText="Editar usuário"
          modalContent={
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="fullName">Nome completo</label>
              <input
                className="border border-gray-300 p-2"
                type="text"
                id="fullName"
                {...register("fullName", { required: false })}
              />
              {errors.fullName && <span>Este campo é obrigatório</span>}

              <label htmlFor="email">E-mail</label>
              <input
                className="border border-gray-300 p-2"
                type="email"
                id="email"
                {...register("email", { required: false, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <span>Este campo é obrigatório e deve ser um e-mail válido</span>}

              <label htmlFor="phoneNumber">Número de telefone</label>
              <input
                className="border border-gray-300 p-2"
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber", { required: false, pattern: /^\d+$/ })}
              />
              {errors.phoneNumber && (
                <span>Este campo é obrigatório e deve conter apenas números</span>
              )}

              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                type="submit">
                Salvar
              </button>
            </form>
          }
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ClientCard;
