// import { useState } from "react";
import "./App.css";
import Login from "./pages/User/login/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/User/register/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import RequireAuth from "./pages/RequireAuth.jsx";
import UserProfile from "./pages/User/UserProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserProfile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
