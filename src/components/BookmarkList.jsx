import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import '../styles/BookmarkList.css'
import { LoaderContext } from "../context/LoaderContextProvider";

// Delete icon svg
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
    <path d="M10 11v6"></path>
    <path d="M14 11v6"></path>
    <path d="M9 6V3h6v3"></path>
  </svg>
);


// Component
const BookmarkList = ({ fetchBookmarks, bookmarks }) => {

  const { setLoader } = useContext(LoaderContext);

  useEffect(() => {
    fetchBookmarks();
  }, []);


  const deleteBookmark = async (id) => {
    try {
      setLoader(true);
      await axiosInstance.delete(`/bookmarks/${id}`);
      
      toast.success("Bookmark deleted successfully");
      fetchBookmarks();
    } catch (error) {
      toast.error("Failed to delete bookmark");
    }finally{
      setLoader(false);
    }
  };
  

  return (
    <div className="bookmark-list" aria-label="Your Bookmarks">
      <h2>Your Bookmarks</h2>
      <article>
        {bookmarks.map((bookmark) => (
          <div key={bookmark._id} className="bookmark-item" aria-label={bookmark.title}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a>
            <p>Category: {bookmark.category}</p>

            {bookmark.tags.length > 0 && (
              <p>Tags: {bookmark.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}</p>
            )}

            {bookmark.notes.trim() && <p>Note: {bookmark.notes}</p>}

            <button className="delete-btn" onClick={() => deleteBookmark(bookmark._id)} aria-label={`Delete ${bookmark.title}`}><DeleteIcon /></button>
          </div>
        ))}
      </article>
    </div>

  );
};

export default BookmarkList;
