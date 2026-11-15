
import Navbar from "@/component/Navbar";
import "./globals.css";
import Footer from "@/component/Footer";
import AuthProvider from "@/component/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {GlobalProvider} from "@/context/GlobalContext";

export const metadata = {
  title: "Property App",
  description: "Property App", 
};
export default function RootLayout({ children }) {
  
  return (
    
      <AuthProvider>
       <GlobalProvider>
        <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
       </GlobalProvider>
      </AuthProvider>
  
  );
}
