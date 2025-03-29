import { useState, useContext } from "react";
import BookmarkList from "../components/BookmarkList";
import BookmarkForm from "../components/BookmarkForm";
import axiosInstance from "../axiosInstance";
import '../styles/Dashboard.css'
import { LoaderContext } from "../context/LoaderContextProvider";

const Dashboard = () => {
  const { setLoader } = useContext(LoaderContext);

  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      setLoader(true);
      const { data } = await axiosInstance.get("/bookmarks");
      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching bookmarks", error);
    }finally{
      setLoader(false);
    }
  };

  
  return (
    <div className="dashboard" aria-label="Dashboard">
      <BookmarkForm fetchBookmarks={fetchBookmarks} />
      <BookmarkList fetchBookmarks={fetchBookmarks} bookmarks={bookmarks} />
    </div>
  );
};

export default Dashboard;
