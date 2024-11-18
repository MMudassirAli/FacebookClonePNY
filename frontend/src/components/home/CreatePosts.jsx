import { Button } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import CreatePostModal from './CreatePostModal';

const CreatePosts = () => {

    const {user} = useSelector((state)=>state.user);

  return (
    <>
    <div className="card bg-white p-3 rounded-2 my-2 border-0 shadow">
    <div className="d-flex gap-2 align-items-center">
        <img width={30} height={30}  src={user?.image ? user?.image : "/icons/userreal.png"} alt="user image" />
        <CreatePostModal/>
    </div>
    </div>
    </>
  )
}

export default CreatePosts