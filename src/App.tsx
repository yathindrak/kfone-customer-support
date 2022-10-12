import { RouterProvider } from "react-router-dom";
import { AuthProvider, Storage } from "@asgardeo/auth-react";
import { router } from "./router/router";
import "./App.css";

const App = () => {
  return (
    <AuthProvider
      config={{
        signInRedirectURL: process.env.REACT_APP_ASGARDEO_CALLBACK_URL ?? "",
        signOutRedirectURL: process.env.REACT_APP_ASGARDEO_CALLBACK_URL ?? "",
        clientID: process.env.REACT_APP_ASGARDEO_CLIENT_ID ?? "",
        baseUrl: process.env.REACT_APP_ASGARDEO_BASE_URL ?? "",
        scope: ["openid", "profile"],
        disableTrySignInSilently: false
      }}
    >
      {/* @ts-ignore */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
