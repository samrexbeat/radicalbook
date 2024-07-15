import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Barchart, SettingIcon, HeartIcon } from "./Icons";
import '../App.css';

interface NavLinkStyles {
    isActive: boolean;
  }

const Sidebar = () => {

    
        // const navLinkStyles: React.FC<NavLinkStyles> = ({ isActive }) => {
        //   return {
        //     backgroundColor: isActive ? '#4072EE' : '#454664',
        //     transform: isActive ? 'translate-x-2' : '',
        //   }
        // }
      

  return (
    <div className="fixed top-0 bg-midnight py-4 w-[80px] h-screen">
      <div className="mt-60">
        <NavLink
          to="/"
          className="block p-6 hover:bg-liner100% rounded-e-lg transition ease-in-out delay-150 hover:translate-x-2 hover:scale-110 duration-300 focus:bg-liner100% translate-x-2"
        >
          <div className=" fill-gray border-gray border-b-2 w-6 hover:fill-white">
            <Barchart />
          </div>
        </NavLink>
        <NavLink
          to="/favorites"
          className="block px-6 pt-6 hover:bg-liner100% rounded-e-lg transition ease-in-out delay-150 hover:translate-x-2 hover:scale-110 duration-300 focus:bg-liner100% translate-x-2"
        >
          <div className=" pb-5 fill-gray border-gray border-b-2 w-6 hover:fill-white hover:border-liner100% ">
            <HeartIcon />
          </div>
        </NavLink>
        <NavLink to="/favorites" className="block px-6 pt-6">
          <div className=" ml-2 pb-5 border-gray border-b-2 w-6 ">
            <SettingIcon />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
