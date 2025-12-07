import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import { useContext } from "react";
import { useEffect } from "react";
import AppContext from "./Context/AppContext";
import Contact from "./pages/Contact";
import AI from "./components/AI";
import PestAI from "./components/PestDashboard";
import Footer from "./components/Footer";

const App = () => {
  const { current, user } = useContext(AppContext);

  useEffect(() => {
    current();
  }, []);
  return (
    <>
      <Navbar />

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

      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/plant-ai"
          element={!user ? <AI /> : <Navigate to="/" />}
        />
        <Route
          path="/pest-ai"
          element={!user ? <PestAI /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={!user ? <Dashboard /> : <Navigate to="/" />}
        />


       
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
