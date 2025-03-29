import { Link } from "react-router-dom";
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="home" aria-labelledby="welcome" aria-describedby="describe">
      <h1 id="welcome">Welcome to the Bookmark Manager</h1>
      <p>Tired of losing important links? With Bookmark Manager, you can store, organize, and access your favorite websites anytime, anywhere. Start by logging in or creating an account</p>
      <p id="describe">Save and manage your bookmarks easily.</p>
      <div>
        <Link to="/login" aria-label="Go to login page">Login</Link> | <Link to="/signup" aria-label="Go to signup page">Signup</Link>
      </div>
    </div>
  );
};

export default Home;
