import { RouterProvider } from "react-router-dom";
import { AuthProvider, SecureApp } from "@asgardeo/auth-react";
import { TokenExchangePlugin } from "@asgardeo/token-exchange-plugin";
import { router } from "./router/router";
import "./App.css";
import authConfig from "./config/auth";
import Loader from "./components/Loader";

const App = () => {
  return (
    <AuthProvider
      config={authConfig as any}
      plugin={TokenExchangePlugin.getInstance()}
    >
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {

  return (
    <>
      <SecureApp fallback={<Loader />}>
        <RouterProvider router={router} />
      </SecureApp>
    </>
  );
};

export default App;
