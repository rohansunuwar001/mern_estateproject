import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';
import axios from 'axios';  // Import Axios
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleGoogleClick = async (e) => {
    e.preventDefault();


    try {
      // Initialize Google Auth Provider and Firebase Auth instance
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      
      // Prepare the data to send to the backend
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
      };

      // Use Axios to send a POST request
      const res = await axios.post('/api/auth/google', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Dispatch success action to update the Redux state
      dispatch(signInSuccess(res.data));
      console.log(res)
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
