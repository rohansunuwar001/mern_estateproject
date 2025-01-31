import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { hitApi } from "../Services/hitApi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

let navigate = useNavigate();

  let token = localStorage.getItem("token");
  console.log(token);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    let fileData = acceptedFiles[0];
    let data = new FormData();
    data.append("document", fileData);
    try {
      let result = await hitApi({
        url: `/file/single`,
        method: "POST",
        data: data,
      });
      setAvatar(result.data.result); // Assuming result.data.result contains the new avatar URL
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // const getData = async () => {
  //   try {
  //     const result = await hitApi({
  //       url:`/api/auth/profile`,
  //       method:'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //   console.log(result);
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }
  }
  

  // useEffect(() => {
  //   // getData();
  //   if (currentUser?.avatar) {
  //     setAvatar(currentUser.avatar); // Make sure to set the initial avatar from Redux state
  //   }
  // }, [currentUser?.avatar]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <div
          {...getRootProps()}
          className="flex flex-col justify-center items-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p hidden>Drop the files here...</p>
          ) : (
            <p hidden>Drag and drop some files here, or click to select files</p>
          )}
          <img
            src={avatar || currentUser?.avatar}
            alt="profile-avatar"
            className="rounded-full h-24 w-24 object-center cursor-pointer self-center mt-2"
          />
        </div>

        <input
          type="text"
          placeholder="username"
          id="username"

          defaultValue={currentUser?.username}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email"
          id="email" 
          defaultValue={currentUser?.email}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <button onClick={() => {
          na
        }
        } className="text-red-700 cursor-pointer">Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;
