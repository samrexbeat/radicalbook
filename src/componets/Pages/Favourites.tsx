import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Searchbar from "../Searchbar";
import { HeartIconFill } from "../Icons";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';

type Result = {
  rate: number | null | undefined;
  id: number;
  author: string;
  price: number;
  title: string;
  description: any;
}

const Favorites: React.FC = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [value, setValue] = React.useState<number | null>(2);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8000/api/book';
      try {
        const response = await axios.get(url);
        console.log('Fetched data:', response.data);
        setResults(response.data);
        console.log('Books:', response.data);
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

  const deleteBook = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/book/${id}`);
      if (response.status === 200) {
        setResults(results.filter(result => result.id !== id));
        console.log('Book deleted successfully');
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000); // Hide alert after 3 seconds
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="flex">
      <div className="bg-sky w-full h-screen">
        <div className="bg-sky w-full h-fit">
          <div className="mt-16">
            <Link to="/details">
              <h3 className="text-left px-72 font-sans font-bold text-xl text-midnight hover:underline">
                Favourites
              </h3>
            </Link>
          </div>
          <div className="py-10 px-72">
            <Searchbar
              placeholder="Search"
              buttonText="GO"
              onSearch={handleSearch}
            />
          </div>
          <div className="ml-72 px-1 ">
            {alertVisible && (
              <Alert severity="success" color="warning">
                Book deleted successfully.
              </Alert>
            )}
            {results.length > 0 ? (
              results.filter((result) =>
                result.title.toLowerCase().includes(search) ||
                result.author.toLowerCase().includes(search)
              ).map((result) => (
                <div className="flex justify-between box-border w-[1097px] h-14 bg-white rounded-sm mb-2" key={result.id}>
                  <div className="flex">
                    <div className="px-4 py-4">
                      <img src="Images/bookIcon.png" alt="" className="" />
                    </div>
                    <Link to={`/book/${result.id}`}><h3 className="py-2 font-sans font-bold text-lg text-midnight">
                      {replaceSpecialChars(result.title)}{" "}
                      <span className="text-black text-lg font-light">by {formatAuthorName(result.author)}</span>
                    </h3></Link>
                  </div>
                  <div className="flex space-x-8 pr-5">
                    <h3 className="py-2 font-sans font-bold text-lg text-midnight">{result.price}GBP</h3>
                    <div className="py-2">
                      <Box
                        sx={{
                          '& > legend': { mt: 2 },
                        }}
                      >
                        <Rating name="read-only" value={result.rate} readOnly />
                      </Box>
                    </div>

                    <Link to={`/book/${result.id}`}>
                      <p className="p5 py-3 hover:underline">Edit</p>
                    </Link>
                    <button onClick={() => deleteBook(result.id)}>
                      <p className="px-5 py-3 hover:underline">Delete</p>
                    </button>

                    <Link to="">
                      <div className="pr-10 py-3 fill-metal w-6 h-5">
                        <HeartIconFill />
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="ml-48 mt-10">
                <img src="Images/icegif-1260.gif" alt="" className="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
