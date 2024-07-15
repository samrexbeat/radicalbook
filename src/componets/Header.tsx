import React from "react";

const Header = () => {
    return (
        <div>
            <header className="flex gap-0 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex justify-center items-center px-5 py-4 bg-metal opacity-100 max-md:pl-5 w-20 z-40">
                    <img src="\Images\User.png" alt="" className="w-10 aspect-square" />
                </div>
                <div className="grow justify-center items-start px-11 py-7 bg-white w-fit max-md:px-5 max-md:max-w-full">
                    <img src="\Images\RADICAL.png" alt="" className=" " />
                </div>
            </header>
        </div>
    );
};

export default Header;





