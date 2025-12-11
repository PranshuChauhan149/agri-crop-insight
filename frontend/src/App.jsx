import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import SpectralAnalysis from "./pages/SpectralAnalysis";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AppContext from "./Context/AppContext";
import Contact from "./pages/Contact";
import PestAI from "./pages/PestAI";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import useGetCity from "./hooks/useGetCity";
import SoilAI from "./components/Soil";

import IrrigationAI from "./pages/IrrigationAI";

import HistoryPage from "./pages/HistoryPage";
import ForgotPassword from "./pages/ForgotPassword";
import Landingpage from "./pages/landing page";

const App = () => {
  const { current, user, } = useContext(AppContext); // keep 'loaction' if that's what your context provides
  useGetCity();

  useEffect(() => {
    current();
  }, []);

  // Small helper wrappers for routes
  const Protected = ({ children }) => {
    // If user exists allow children, otherwise redirect to /login
    return user ? children : <Navigate to="/login" replace />;
  };

  const PublicOnly = ({ children }) => {
    // If user exists, redirect them away from login/signup to dashboard
    return user ? <Navigate to="/dashboard" replace /> : children;
  };

  return (
    <div className=" w-screen  bg-gradient-to-br  from-green-300 via-gray-300 to-green-200 ">
      <Navbar  />
      <div className=" mb-15"></div>
      {/* <div className="flex flex-wrap gap-6">
        {weather && <WeatherDashboard weather={weather} />}
      </div> */}
      <Toaster
        position="top-center"a
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            fontSize: "16px",
          },
        }}
      />

      <Routes>
        {/* Public routes always allowed (home). But based on your request,
            unauthenticated users should only be able to access '/', '/login', '/signup'.
            All other routes are Protected below. */}
        <Route path="/" element={<Landingpage />} />

        <Route
          path="/login"
          element={
            <PublicOnly>
              <Login />
            </PublicOnly>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicOnly>
              <Signup />
            </PublicOnly>
          }
        />

        {/* The following routes are protected: only accessible when logged in.
            If not logged in, they will redirect to /login. */}
        <Route
          path="/about"
          element={
            <Protected>
              <About />
            </Protected>
          }
        />

        <Route
          path="/contact"
          element={
            <Protected>
              <Contact />
            </Protected>
          }
        />

        <Route
          path="/plant-ai"
          element={
            <Protected>
              <SpectralAnalysis />
            </Protected>
          }
        />

        <Route
          path="/pest-ai"
          element={
            <Protected>
              <PestAI />
            </Protected>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />

        <Route
          path="/profile"
          element={
            <Protected>
              <ProfilePage />
            </Protected>
          }
        />

        <Route
          path="/recent-report/:id"
          element={
            <Protected>
              <HistoryPage />
            </Protected>
          }
        />

        <Route
          path="/soil"
          element={
            <Protected>
              <SoilAI />
            </Protected>
          }
        />

        <Route
          path="/spectral"
          element={
            <Protected>
              <SpectralAnalysis />
            </Protected>
          }
        />

        <Route
          path="/irrigation"
          element={
            <Protected>
              <IrrigationAI />
            </Protected>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicOnly>
              <ForgotPassword />
            </PublicOnly>
          }
        />

        {/* Catch-all: if user is logged in, send them to dashboard; otherwise to login.
            This prevents unauthenticated users from hitting random routes. */}
        <Route
          path="*"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
