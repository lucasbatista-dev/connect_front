import "@/styles/globals.css";
import { PlayerProvider } from "@/contexts/playerContext";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/authContext";
import "react-toastify/dist/ReactToastify.css";
import { MusicProvider } from "@/contexts/musicContext";
import { ChakraProvider } from "@chakra-ui/react";

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
          <PlayerProvider>
            <MusicProvider>
              <Component {...pageProps} />
            </MusicProvider>
          </PlayerProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}
