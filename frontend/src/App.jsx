import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AppContext from "./Context/AppContext";
import Contact from "./pages/Contact";
import AI from "./components/SpectralAnalysis ";
import PestAI from "./components/PestAI";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import useGetCity from "./hooks/useGetCity";
import SoilAI from "./components/Soil";
import SpectralAnalysis from "./components/SpectralAnalysis ";
import IrrigationAI from "./components/IrrigationAI";

const App = () => {
  const { current, user, loaction } = useContext(AppContext);
  useGetCity();
  useEffect(() => {
    current();
  }, []);

  console.log("dsd",loaction);

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
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/plant-ai"
          element={user ? <AI /> : <Navigate to="/login" />}
        />

        <Route
          path="/pest-ai"
          element={user ? <PestAI /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/soil"
         element={<SoilAI/>}
        />
        <Route
          path="/spectral"
         element={<SpectralAnalysis/>}
        />
        <Route
          path="/irrigation"
         element={<IrrigationAI/>}
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
