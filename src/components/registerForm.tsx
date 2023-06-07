import { UserData, userSchema } from "@/schemas/user.schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";
import { Input } from "@chakra-ui/react";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<UserData>({
    resolver: zodResolver(userSchema)
  });
  const { register: registerUser } = useAuth();
  const onFormSubmit = (formData: UserData) => {
    registerUser(formData);
  };
  return (
    <div className="user-form-container">
      <p className="text-4xl mt-6 font-semibold">Fazer cadastro</p>
      <form className="space-y-6 w-4/5" onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="name" className="user-form-label">
            Nome
          </label>
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Nome do seu usuário"
              className="user-form-input"
              {...register("name")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="username" className="user-form-label">
            Username
          </label>
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Nome do seu usuário"
              className="user-form-input"
              {...register("username")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="user-form-label">
            E-mail
          </label>
          <div className="mt-2">
            <Input
              type="email"
              placeholder="example@.com"
              className="user-form-input"
              {...register("email")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="user-form-label">
            Password
          </label>
          <div className="mt-2">
            <Input
              type="password"
              placeholder="Sua senha"
              className="user-form-input"
              {...register("password")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="companyName" className="user-form-label">
            Nome da Empresa
          </label>
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Nome da Empresa"
              className="user-form-input"
              {...register("companyName")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="avatar" className="user-form-label">
            Foto
          </label>
          <div className="mt-2">
            <Input
              type="text"
              placeholder="Adicione o link da sua foto"
              className="user-form-input"
              {...register("avatar")}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="user-form-button">
            Cadastrar
          </button>
        </div>

        <Link href={"/login"} className="user-form-link">
          Ir para o login
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
