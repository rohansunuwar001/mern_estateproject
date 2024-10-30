import  { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { hitApi } from '../Services/hitApi';
import { toast, ToastContainer } from 'react-toastify';

const VerifyEmail = () => {
    let [query] = useSearchParams();
    let token = query.get("token");
    let navigate = useNavigate();
    let verifyEmail = async () => {
      try {
        let result = await hitApi({
            url:`/api/auth/verify-email`,
            method:'POST',
            headers:{
                Authorization: `Bearer ${token}`,
            },
        })
        alert(result.data.message);
        navigate(`/sign-in`)
      } catch (error) {
        console.log(error.message)
      }
    }

    useEffect(() => {
      verifyEmail();
    }
    ,[])
    
  return (
    <div>
        
        <ToastContainer />
<div>
    
          VerifyEmail
    </div>  
          </div>
  )
}

export default VerifyEmail