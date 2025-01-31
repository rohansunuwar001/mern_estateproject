import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hitApi } from "../Services/hitApi";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const handleChange = (e) => {
    // const { id, value } = e.target;
    setFormData({
      // ...prevState,
      // [id]: value
      ...formData,
      [e.target.id]:e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before submission

    try {
      setLoading(true);
      const result = await hitApi.post('/api/auth/signup', formData); // Use Axios to send the POST request

      const data = result.data;
      // if (!data.success) {
      //   // Show specific error messages for email and username
      //   if (data.message.includes("Email already exists")) {
      //     throw new Error("Email already exists. Please try another.");
      //   } else if (data.message.includes("Username already exists")) {
      //     throw new Error("Username already exists. Please try another.");
      //   }
      //   throw new Error(data.message);
      // }

      toast(data.message);
      setFormData({ username: "", email: "", password: "", role: "user" });
      
      console.log(result) // Clear form
    } catch (error) {
      setError(error.response?.data?.message || error.message); // Use Axios error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          className="border p-3 rounded-lg"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
