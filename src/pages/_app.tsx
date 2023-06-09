import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/authContext";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ClientsProvider } from "@/contexts/clientsContext";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ChakraProvider>
        <AuthProvider>
          <ClientsProvider>
            <Component {...pageProps} />
          </ClientsProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}
