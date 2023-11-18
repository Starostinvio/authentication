import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrPage from "./pages/RegistrPage";
import AuthenticationPage from "./pages/AuthenticationPage/Index";
import Layout from "./Layout";
import { APIService } from "./utils/APIService";

export const apiService = new APIService("https://dummyjson.com");

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/authentication" element={<AuthenticationPage />}>
            <Route path="/authentication/sign-in" element={<LoginPage />} />
            <Route path="/authentication/sign-up" element={<RegistrPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
