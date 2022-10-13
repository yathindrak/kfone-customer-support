import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@asgardeo/auth-react";
import { TokenExchangePlugin } from "@asgardeo/token-exchange-plugin";
import { router } from "./router/router";
import "./App.css";
import authConfig from "./config/auth";

const App = () => {
  return (
    <AuthProvider
      config={authConfig as any}
      plugin={TokenExchangePlugin.getInstance()}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
