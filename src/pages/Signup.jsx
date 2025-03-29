import AuthForm from "../components/AuthForm";
import '../styles/Signup.css'

const Signup = () => {
  return (
    <div className="signup">
      <h2>Signup</h2>
      <AuthForm type="signup" />
    </div>
  );
};

export default Signup;
