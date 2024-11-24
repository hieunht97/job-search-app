// import { useState } from "react";
import "./App.css";
import Login from "./pages/User/login/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/User/register/register";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
