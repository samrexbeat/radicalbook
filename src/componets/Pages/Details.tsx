import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


type Result = {
    rate: number | null | undefined;
    id: number;
    author: string;
    price: number;
    title: string;
    rating: number;
    description: any;
}

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Result | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const urlbook = `http://localhost:8000/api/book/${id}`;
            try {
                const response = await axios.get(urlbook);
                console.log('Fetched data:', response.data);
                setBook(response.data.book); // Access the nested book object
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const replaceSpecialChars = (str: string) =>
        str.trim()
            .replace(/[`~!@#$%^&*()_\-+=[\]{}\\|;:'",.<>/?]+/g, '')
            .toUpperCase()
            .substring(0, 50);

    const formatAuthorName = (author: string) =>
        author.toLowerCase().substring(0, 20);

    if (loading) {
        return <p>Loading book details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="bg-sky w-full h-screen">
            {book ? (
                <div>
                    <div className="py-14 ml-[360px]">
                        <img src="/Images/Rectangle 49.png" alt="Book cover" className="pr-8 contrast-50 absolute top-30 " />
                    </div>
                    <h1 className="mt-5 font-extrabold text-5xl z-10">
                        {book.title ? replaceSpecialChars(book.title) : 'No title available'}{' '}
                        <span className="text-2xl font-bold">
                            by {book.author ? formatAuthorName(book.author) : 'Unknown author'}
                        </span>
                    </h1>
                    <div className="-ml-[360px] w-full mt-48">                   
                         <h1 className="mt-24 -left-48  text-2xl font-bold">
                        Edit
                    </h1>
                    </div>

                    <div className="ml-[460px]">
                        <div className="flex gap-5 mt-10  max-w-full text-base bg-white w-[649px] max-md:flex-wrap max-md:mt-10">
                            <div className="justify-center items-start px-10 py-5 text-white whitespace-nowrap bg-metal max-md:px-5">
                                Cost
                            </div>
                            <p className="py-5 pl-20">{book.price} GBP</p>
                        </div>
                        <div className="flex gap-5 mt-10  max-w-full text-base bg-white w-[649px] max-md:flex-wrap max-md:mt-10">
                            <div className="justify-center items-start px-10 py-5 text-white whitespace-nowrap bg-metal max-md:px-5">
                                Rate
                            </div>
                            <div className="py-2">
                                            <Box
                                                sx={{
                                                    '& > legend': { mt: 2 },
                                                }}
                                            >
                                                <Rating
                                                    name={'rating'}
                                                    value={book.rate}

                                                />
                                            </Box>
                                        </div>
                        </div>
                        
                    </div>
                    
                  
                </div>
            ) : (
                <p>No book details available</p>
            )}
            <div className="-ml-[360px]">
            <button className="justify-center bg-liner100% items-center pl- py-5 mt-10 max-w-full text-base font-bold text-center text-white whitespace-nowrap rounded-[41px] w-[371px] max-md:px-5 max-md:mt-10">
          UPDATE
        </button>
            </div>
        </div>
        
        
    );
}

export default BookDetails;
