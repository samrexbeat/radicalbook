import React, { useState } from "react";
import Searchbar from "../Searchbar";
import { Link } from "react-router-dom";



const Dashboard = () => {

    const [search, setSearch] = useState("");
    const handleSearch = (newSearch: string) => {
        setSearch(newSearch); 
      };
    return (
        <div className="flex">
            
            <div className="bg-sky w-full h-screen">
                <div className="py-14 px-72">
                    <Searchbar
                        placeholder="What books would you like to find?"
                        buttonText="GO"
                        onSearch={handleSearch}
                    />
                </div>
                <div className="mt-4">
                    <Link to="/list"> <h3 className="text-left px-72 font-sans font-bold text-xl text-midnight hover:underline">New York Times Bestsellers</h3></Link>
                </div>
                <div className="flex ml-72 py-2 pb-6 w-[1327px]">
                    <img src="Images\Rectangle 492.png" alt="" className="pr-8 " />
                    <img src="Images\Rectangle 493.png" alt="" className="pr-8 " />
                    <img src="Images\Rectangle 494.png" alt="" className=" " />
                </div>
                <div className="mt-4">
                    <Link to="/favorites"> <h3 className="text-left px-72 font-sans font-bold text-xl text-midnight hover:underline">Favourites</h3></Link>
                </div>
                <div className="flex px-72 py-2 ">
                    <img src="Images\Rectangle 495.png" alt="" className="pr-8 " />
                    <img src="Images\Rectangle 496.png" alt="" className="pr-8 " />
                    <img src="Images\Rectangle 497.png" alt="" className=" " />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;

