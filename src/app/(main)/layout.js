import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import React from "react";

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
};

export default MainPageLayout;
