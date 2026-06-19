"use client"

import { createContext, useState } from "react";

export const HamburgerContext=createContext()
const HamburgerContextProvider = ({children}) => {
    const[isSidebarOpen,setIsSidebarOpen]=useState(false)
    const data={
        isSidebarOpen,
        setIsSidebarOpen
    }
    return (
       <HamburgerContext.Provider value={data}>
        {children}
       </HamburgerContext.Provider>
    );
};

export default HamburgerContextProvider;