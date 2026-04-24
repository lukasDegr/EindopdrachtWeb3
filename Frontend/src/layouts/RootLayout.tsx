import React from "react";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
    return(
        <header className="bg-gray-800 text-white p-4">
            <Outlet></Outlet>
        </header>
    );
}
export default RootLayout;