import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/navbar.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Hospital from "../pages/Hospital.jsx";
import Index from "../pages/Index.jsx";

// ✅ sirf ye do naye imports add kiye
import CreateRequestPage from "../pages/CreateRequestPage.jsx";
import UploadRecordsPage from "../pages/UploadRecordsPage.jsx";

const Router = () => {
  return (   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hospitals" element={<Hospital />} />
        <Route path="/Create-Fund-Request" element={<CreateRequestPage />} />
        <Route path="/upload-record" element={<UploadRecordsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
