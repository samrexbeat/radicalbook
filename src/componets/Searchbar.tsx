import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
    placeholder: string;
    buttonText: string;
    onSearch: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, buttonText, onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value.toLowerCase());
        onSearch(e.target.value.toLowerCase()); 
        
      };
      let navigate = useNavigate(); 
      const handleSearchAndNavigate = () => {
        onSearch(searchValue);
        navigate('/list');
      };
    

    return (
        <form className="flex justify-between pl-5 text-base bg-white rounded-[41px] focus:outline-none">
            <div className="flex gap-3 my-auto text-black w-full">
                <img src="Images\Group 302.png" className="shrink-0 aspect-square w-5 h-5"  alt="" />
                <label htmlFor="searchInput" className="sr-only">{placeholder}</label>
                <input
                    type="text"
                    id="searchInput"
                    className="flex-auto focus:outline-none"
                    placeholder={placeholder}
                    aria-label={placeholder}
                    value={searchValue}
                    onChange={handleSearch}
                    
                />
            </div>
            <button
                type="submit"
                
                className="px-6 py-5 font-bold text-center text-white rounded-e-full bg-metal hover:opacity-80"
                onClick={handleSearchAndNavigate}
                
                >
                {buttonText}
            </button>
        </form>
    );
};

export default SearchBar;