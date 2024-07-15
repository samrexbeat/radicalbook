import { useState, useEffect } from "react";
import Searchbar from "../Searchbar";
import { NavLink } from "react-router-dom";
import { HeartIcon, HeartIconFill } from "../Icons";
import axios from "axios";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export type Result = {
    id: number;
    author: string;
    price: number;
    title: string;
    rating: number;
    description: any;
}

const BookList: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [search, setSearch] = useState("");
    const [savedBooks, setSavedBooks] = useState<number[]>([]); 

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=E2FKCMWoXrGqgbBQwGIl4ey0qDfzLah0';
            try {
                const response = await axios.get(url);
                console.log('Fetched data:', response.data);
                const resultsWithRating = response.data.results.map((result: any) => ({
                    ...result,
                    rating: 0 // Default rating
                }));
                setResults(resultsWithRating);
                console.log('Books:', resultsWithRating);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleSearch = (newSearch: string) => {
        setSearch(newSearch);
    };

    const replaceSpecialChars = (str: string) =>
        str.trim()
            .replace(/[`~!@#$%^&*()_\-+=[\]{}\\|;:'",.<>/?]+/g, '')
            .toUpperCase()
            .substring(0, 50);

    const formatAuthorName = (author: string) =>
        author.toLowerCase().substring(0, 20);

    const handleRatingChange = (id: number, newRating: number | null) => {
        setResults(results.map(result =>
            result.id === id ? { ...result, rating: newRating ?? 0 } : result
        ));
    };

    const handleSaveData = async (result: Result) => {
        try {
            const internalApiUrl = 'http://localhost:8000/api/book';

            const dataToSave = {
                author: result.author,
                price: result.price,
                title: result.title,
                rate: result.rating,
                description: result.description
            };
            console.log(result.rating)

            const response = await axios.post(internalApiUrl, dataToSave, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSavedBooks([...savedBooks, result.id]); // Adding the book ID to the savedBooks state
            }

            console.log('Data saved to internal API successfully:', response.data);

        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div className="flex">
            <div className="bg-sky w-full h-screen">
                <div className="bg-sky w-full h-fit">
                    <div className="mt-16">
                        <h3 className="text-left px-72 font-sans font-bold text-xl text-midnight">New York Times Bestsellers</h3>
                    </div>
                    <div className="py-10 px-72">
                        <Searchbar
                            placeholder="Search"
                            buttonText="GO"
                            onSearch={handleSearch}
                        />
                    </div>
                    <div className="ml-72 px-1 ">
                        {results.length > 0 ? (
                            results.filter((result) => result.title.toLowerCase().includes(search) ||
                                result.author.toLowerCase().includes(search)
                            ).map((result) => (
                                <div className="flex justify-between box-border w-[1097px] h-14 bg-white rounded-sm mb-2" key={result.id}>
                                    <div className="flex">
                                        <div className="px-4 py-4">
                                            <img src="Images/bookIcon.png" alt="" className="" />
                                        </div>
                                        <h3 className="py-2 font-sans font-bold text-lg text-midnight">
                                            {replaceSpecialChars(result.title)}{" "} <span className="text-black text-lg font-light">by {formatAuthorName(result.author)}</span>
                                        </h3>
                                    </div>
                                    <div className="flex space-x-8 pr-5">
                                        <h3 className="py-2 font-sans font-bold text-lg text-midnight">{result.price}GBP</h3>
                                        <div className="py-2">
                                            <Box
                                                sx={{
                                                    '& > legend': { mt: 2 },
                                                }}
                                            >
                                                <Rating
                                                    name={`rating-${result.id}`}
                                                    value={result.rating}
                                                    onChange={(event, newValue) => {
                                                        handleRatingChange(result.id, newValue);
                                                    }}
                                                />
                                            </Box>
                                        </div>
                                        <div onClick={() => handleSaveData(result)} className="py-3 fill-metal w-6 h-5 cursor-pointer">
                                            {savedBooks.includes(result.id) ? <HeartIconFill /> : <HeartIcon />}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="ml-48 mt-10"> <img src="Images/icegif-1260.gif" alt="" className="" /></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookList;
