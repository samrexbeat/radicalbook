import React, { Component, useState } from "react";
import { FaStar } from "react-icons/fa";
import '../App.css';

type StarProps = {
    size?: number;
    rating:number; 
    onRatingChange?: (rating: number) => void; 
}

const StarRating: React.FC = () => {
    const [ratings, setRatings] = useState<number | null>(null);
    const [hover, setHover] = useState<number | null>(null);

    function onRatingChange(currentRating: number){
        setRatings(ratings)
        
    }
    
    return (
           
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const currentRating = index + 1 ;
                return (
                    <label key={index}>
                        <input  
                            type="radio"
                            name="rating"
                            value={currentRating}
                            checked={ratings === currentRating}
                            onChange={() => setRatings(currentRating)} 
                            
                            
                        />
                        <FaStar
                            className="star"
                            key={index}
                            size={30}
                            color={hover !== null ? (hover >= currentRating ? "#ffc107" : "#e4e5e9") : (ratings !== null ? (ratings >= currentRating ? "#ffc107" : "#e4e5e9") : "#e4e5e9")}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                             onClick={() => onRatingChange(currentRating)}
                            
                            
                           
                        />
                    </label>
                    
                );
            })}
        </div>
    );
};

export default StarRating;