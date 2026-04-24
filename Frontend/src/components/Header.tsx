// import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <NavLink 
                className={({ isActive }) =>
                 isActive ? "px-3 py-2 rounded bg-gray-700" : "px-3 py-2 rounded hover:bg-gray-700"} to="/">
                    Home
            </NavLink>
            <NavLink 
                className={({ isActive }) =>
                 isActive ? "px-3 py-2 rounded bg-gray-700" : "px-3 py-2 rounded hover:bg-gray-700"} to="/AdminPage">
                Admin
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                 isActive ? "px-3 py-2 rounded bg-gray-700" : "px-3 py-2 rounded hover:bg-gray-700"} to="/VluchtPage">
                Vluchten
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                 isActive ? "px-3 py-2 rounded bg-gray-700" : "px-3 py-2 rounded hover:bg-gray-700"} to="/RekeningPage">
                Rekeningen
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                 isActive ? "px-3 py-2 rounded bg-gray-700" : "px-3 py-2 rounded hover:bg-gray-700"} to="/VliegtuigPage">
                Vliegtuigen
            </NavLink>
        </header>
    );
}
export default Header;