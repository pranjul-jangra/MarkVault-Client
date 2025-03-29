import AuthForm from "../components/AuthForm";
import '../styles/Login.css'

const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <AuthForm type="login" />
    </div>
  );
};

export default Login;
