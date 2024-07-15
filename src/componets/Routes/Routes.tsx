import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Dashboard from "../Pages/Dashboard";
import Favorites from "../Pages/Favourites";
import BookList from "../Pages/BookList";
import BookDetails from "../Pages/Details";



export const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children: [
            {path: "", element:<Dashboard/>},
            {path: "favorites", element:<Favorites/>},
            {path: "list", element:<BookList />},
            {path: "/book/:id" , element:<BookDetails/>}
            
        ]

    }
])