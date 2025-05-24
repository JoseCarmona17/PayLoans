import { Routes, Route } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { HomePage,} from "../Home";
import { ForgottenPass, Login, Register } from "../Logins";
import {  CreateLoan, SliderBar} from "../Boardpage";
import { PrivateRoutes } from "./PrivateRoutes";
import { PageLoands } from "../MyLoans/PageLoands";
import { PageDebts } from "../MyDebts/PageDebts";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotten" element={<ForgottenPass />} />
          <Route path="boardpage" element={<SliderBar />}>
            <Route path="create-loan" element={<CreateLoan />} />
            <Route path="my-loans" element={<PageLoands />} />
            <Route path="debts" element={<PageDebts/>} />
          </Route>
          <Route path="dashboard" element={
            <PrivateRoutes>
              <SliderBar />
            </PrivateRoutes>
          } />
        </Route>
      </Routes>
    </>
  );
};
