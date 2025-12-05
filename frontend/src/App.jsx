import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      {/* Toast Notification System */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            fontSize: "16px",
          },
        }}
      />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
