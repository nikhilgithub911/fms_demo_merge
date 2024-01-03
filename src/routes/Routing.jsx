import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VehicleList from "../components/VehicleList";
import Dashboard from "../components/Dashboard";

const Routing = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/vehiclelist" />} /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/vehiclelist" element={<VehicleList />} />
      </Routes>
    </>
  );
};

export default Routing;
