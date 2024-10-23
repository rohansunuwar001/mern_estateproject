import  { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { hitApi } from '../Services/hitApi';

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
        // console.log(result);
        navigate(`/sign-in`)
      } catch (error) {
        
      }
    }

    useEffect(() => {
      verifyEmail();
    }
    ,[])
    
  return (
    <div>VerifyEmail</div>
  )
}

export default VerifyEmail