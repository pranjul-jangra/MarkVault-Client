import { useState, useContext } from "react";
import { toast } from 'react-toastify'
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import '../styles/AuthForm.css'
import { LoaderContext } from "../context/LoaderContextProvider";

const AuthForm = ({ type }) => {

  const { setLoader } = useContext(LoaderContext);

  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoader(true);
      const url = type === "login" ? "/auth/login" : "/auth/signup";
      const { data } = await axiosInstance.post(url, formData);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoader(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {type === "signup" && (
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required aria-label="Username" aria-required={true} />
      )}
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required aria-label="Email" aria-required={true} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required aria-label="Password" aria-required={true} />
      <button type="submit" aria-label={type === "login" ? "Login" : "Signup"}>{type === "login" ? "Login" : "Signup"}</button>
    </form>
  );
};

export default AuthForm;
