import LoginForm from "@/components/loginForm";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <main className="bg-gray-900 bg-opacity-90 min-h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
};

export default Login;
