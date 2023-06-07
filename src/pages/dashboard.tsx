import { parseCookies } from "nookies";
import Image from "next/image";
import logo from "../../public/logo.svg";
export default function DashboardPage() {
  const cookies = parseCookies();
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  return (
    <main className="bg-gray-900 bg-opacity-90 h-screen w-screen">
      <header className="w-full h-16 absolute border border-brown-200 bg-transparent flex px-8">
        <Image src={logo} alt="logo" className="h-16 w-56" />
      </header>
      <aside className="bg-brown-200 w-96 h-screen">
        <h1 className="text-xl">{user?.name}</h1>
      </aside>
    </main>
  );
}
