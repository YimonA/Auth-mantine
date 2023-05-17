import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Routeguard from "../components/Routeguard";
import CreateContact from "../components/CreateContact";
import UserInfo from "../components/UserInfo";

const Path = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Routeguard>
              <Dashboard />
            </Routeguard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/user/:id" element={<UserInfo />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Path;

//https://rizes-organization.gitbook.io/contactapi/?fbclid=IwAR3iLjWec7o9GGpTlkz1rlwHeSPXh-79Tc8QPFSQUe_LE8VIsPW0Fe6lk0k
