import RegisterForm from "@/components/registerForm";
import { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <main className="bg-gray-900 bg-opacity-90 min-h-screen flex items-center justify-center">
      <RegisterForm />
    </main>
  );
};

export default Register;
