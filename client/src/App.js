import React from "react";
import { Button } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

import NasaPhoto from "./components/NasaPhoto";
import EarthImage from "./components/EarthImage";
import MarsRover from "./components/MarsRover";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/nasaphoto"
          element={
            <ProtectedRoute>
              <NasaPhoto />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/earthimage"
          element={
            <ProtectedRoute>
              <EarthImage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/marsrover"
          element={
            <ProtectedRoute>
              <MarsRover />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
