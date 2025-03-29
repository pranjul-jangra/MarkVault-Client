import { useState, useContext } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import '../styles/BookmarkForm.css'
import { LoaderContext } from "../context/LoaderContextProvider";

const BookmarkForm = ({ fetchBookmarks }) => {

  const { setLoader } = useContext(LoaderContext);

  const [formData, setFormData] = useState({ title: "", url: "", category: "", tags: "", notes: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Split tags by commas or spaces and remove empty values
      const processedTags = formData.tags
        .split(/[\s,]+/)
        .map(tag => tag.trim()) 
        .filter(tag => tag !== "");

    try {
      setLoader(true);
      await axiosInstance.post("/bookmarks", { ...formData, tags: processedTags });
      fetchBookmarks();
      setFormData({ title: "", url: "", category: "", tags: "", notes: "" });
      toast.success('BookMark added successfully');

    } catch (error) {
      console.error("Error adding bookmark", error);
      toast.error('Error adding bookmark')
    }finally{
      setLoader(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bookmark-form" aria-labelledby="labl">
      <h1 id="labl">Add Bookmark</h1>
      <input type="text" name="title" value={formData.title} placeholder="Bookmark Title*" onChange={handleChange} required aria-label="Title" aria-required={true} />
      <input type="url" name="url" value={formData.url} placeholder="Bookmark URL*" onChange={handleChange} required aria-label="Url" aria-required={true} />
      <input type="text" name="category" value={formData.category} placeholder="Category (e.g., Work, Study, Personal)*" onChange={handleChange} required aria-label="Category" aria-required={true} />
      <input type="text" name="tags" value={formData.tags} placeholder="Tags (Separate by commas or spaces)" onChange={handleChange} aria-label="Tags (Separate by commas or spaces)" />
      <input type="text" name="notes" value={formData.notes} placeholder="Note (Optional: Add details or reminders)" onChange={handleChange} aria-label="Note" />
      <button type="submit" aria-label="Add">Add Bookmark</button>
    </form>
  );
};

export default BookmarkForm;
