import { useRef, useContext } from 'react'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import axiosInstance from "../axiosInstance";
import '../styles/Navbar.css'
import '../styles/Navbar.css'
import { LoaderContext } from '../context/LoaderContextProvider';

const Navbar = () => {

  const { setLoader } = useContext(LoaderContext);

  const navButtonRef = useRef();
  const logoutBoxRef = useRef();
  let hideTimeout;

  const handleLogout = async () => {
    try {
      setLoader(true);
      const refreshToken = localStorage.getItem("refreshToken");
  
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
  
      const response = await axiosInstance.post(`/auth/logout`, { refreshToken });
  
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error('Something went wrong. Failed to logout.')
    }finally{
      setLoader(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      setLoader(true);
      const response = await axiosInstance.post(`/auth/logout-all`);
  
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error('Something went wrong. Failed to logout.')
    }finally{
      setLoader(false);
    }
  };

  function handleInteraction(){
    clearTimeout(hideTimeout);
    logoutBoxRef.current.style.opacity = '1';
    logoutBoxRef.current.style.translate = '0 0';
  }

  function handleLeave() {
    hideTimeout = setTimeout(() => {
      if (
        !navButtonRef.current.matches(":hover") &&
        !logoutBoxRef.current.matches(":hover")
      ) {
        logoutBoxRef.current.style.opacity = "0";
        logoutBoxRef.current.style.translate = "150% 0";
      }
    }, 600);
  }

  return (
    <nav className="navbar" aria-label='Navbar'>
      <Link to="/" aria-label='Home'>Home</Link>
      <Link to="/dashboard" aria-label='Dashboard'>Dashboard</Link>

      <span ref={navButtonRef} onMouseEnter={handleInteraction} onMouseLeave={handleLeave} className="logout-trigger" aria-label='Choose logout type'>Logout</span>
      <div ref={logoutBoxRef} onMouseEnter={handleInteraction} onMouseLeave={handleLeave} className="logout-options">
        <button onClick={handleLogout} aria-label='Logout from This Device'>Logout from This Device</button>
        <button onClick={handleLogoutAll} aria-label='Logout from All Devices'>Logout from All Devices</button>
      </div>

    </nav>
  );
};

export default Navbar;
