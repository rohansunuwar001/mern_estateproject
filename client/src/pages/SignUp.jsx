import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hitApi } from "../Services/hitApi";

const SignUp = () => {

  let [username, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]= useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data={
      username:username,
      email:email,
      password:password
    }
    data={
      ...data,role:"user"
    }
    try {
      let result = await hitApi({
          url:`/api/auth/signup`,
          method:'POST',
          data:data
      });
      toast(result.data.message)
      console.log(result)
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false)
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />


      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="username" id="username" className="border p-3 rounded-lg" placeholder="username" value={username} onChange={(e) => {
          setUserName(e.target.value);
        }
        } />
        <input type="email" name="email" id="email" className="border p-3 rounded-lg" placeholder="email" value={email} onChange={(e) => {
          setEmail(e.target.value)
        }
        } />
        <input type="password" name="password" id="password" className="border p-3 rounded-lg" placeholder="password" value={password} onChange={(e) => {
          setPassword(e.target.value);
        }
        } />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" type="submit">{loading ? 'Loading...':'Sign Up'}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span></Link>
      </div>
    </div>
  )
}

export default SignUp