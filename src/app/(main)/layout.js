import Navbar from "@/components/main/Navbar";
import React from "react";

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MainPageLayout;
