import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hitApi } from "../Services/hitApi";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' // Default role
  });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const {loading,error} = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // const { id, value } = e.target;
    setFormData({
      // ...prevState,
      // [id]: value
      ...formData,
      [e.target.id]:e.target.value
    });88
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(null); // Reset error before submission

    try {
      dispatch(signInStart());
      const result = await hitApi.post('/api/auth/signin', formData); // Use Axios to send the POST request

      const data = result.data;

      dispatch(signInSuccess(toast(data.message)));
      setFormData({ email: "", password: "", role: "user" });
      console.log(result) // Clear form
    } catch (error) {
      // setError(error.response?.data?.message || error.message); // Use Axios error handling
      dispatch(signInFailure(error.response?.data?.message || error.message));
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          id="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          type="submit"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Didn't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
