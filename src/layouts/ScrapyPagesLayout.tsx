import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/global/Navbar";
const ScrapyPagesLayout: React.FC = () => {
  return (
    <div >
        <Navbar />
        <Outlet />
    </div>
  );
};

export default ScrapyPagesLayout;