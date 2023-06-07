import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import bg from "../../public/bg.svg";

export default function Home() {
  return (
    <main className="fixed top-0 left-0 min-h-screen min-w-screen flex items-center justify-center overflow-hidden">
      <Image
        src={bg}
        alt="background"
        className="h-screen w-screen static object-cover opacity-95"
      />
      <div className="w-full h-full absolute flex flex-col items-end p-10">
        <div className="">
          <div className="w-full h-72 flex flex-col justify-center items-center gap-10 sm:flex-row sm:gap-0">
            <Link href={"/register"} className="p-6 bg-black text-white">
              Comece agora
            </Link>
            <Image src={logo} alt="logo img" className="w-48 sm:w-auto" />
          </div>
        </div>
        <div className="w-3/5">
          <p className="text-white text-6xl text-right sm:text-4xl md:text-5xl lg:text-6xl">
            Soluções em gerenciamento de contatos
          </p>
        </div>
      </div>
    </main>
  );
}
