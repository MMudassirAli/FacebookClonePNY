import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Fa42Group } from 'react-icons/fa6';
import { MdArrowDropDown } from 'react-icons/md';
import { RiGroupFill } from 'react-icons/ri';
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { Button } from '@mui/material';
import PrivacyBox from './PrivacyBox';
import axios from "axios";
import { ProgressBar } from 'react-loader-spinner';
import { postReset, uploadPostData } from '../../features/Posts/postSlice';
import {toast} from "react-hot-toast";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function CreatePostModal() {
  const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.user);
    const {postLoading,postError,postSuccess} = useSelector((state)=>state.posts);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emoji, setEmoji] = React.useState(false);
  const [status,setStatus] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [showPrivacyBox,setShowPrivacyBox] = React.useState(false);
  const [visibility,setVisibility] = React.useState("public");
  const [imagePreview,setImagePreview] = React.useState(null);
  const [image,setImage] = React.useState(null);
  const [imageLoading,setImageLoading] = React.useState(false);

  React.useEffect(()=>{
    if(status.length > 0){
        setBtnDisabled(false);
    }else{
        setBtnDisabled(true);
    }
  },[status]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setImage(file);
    setImagePreview(imageUrl);
    setBtnDisabled(false)
  }

  const handleImageUpload = async() => {
    const data = new FormData();
    data.append("upload_preset","dynae6ap");
    data.append("file", image)
    try {
      setImageLoading(true)
      const response = await axios.post("https://api.cloudinary.com/v1_1/dhsal5z8n/image/upload", data);
      setImageLoading(false)
      setImage(null)
      setImagePreview(null);
      return response?.data?.url
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(()=>{
    if(postError){
      toast.error(postMessage)
    }

    if(postSuccess){
      toast.success("Post Uploaded Successfully!")
      setStatus('');
      setImage(null);
      setImagePreview(null);
      handleClose();
    }

    dispatch(postReset())
  },[postError,postSuccess])

  const handlePostUpload = async() => {
    const imageURL = await handleImageUpload(image);

    const postData = {
      content: imageURL,
      caption: status,
      visibility,
    }
    dispatch(uploadPostData(postData));
  };

  return (
    <>
      <input onClick={handleOpen} readOnly className='rounded-pill cursor-pointer outline-0 bg-lights border-0 py-1 ps-3 w-100' placeholder={`What's on your mind, ${user?.f_name}?`}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ background: "rgba(255,255,255,0.5)"  }}
      >
        <Box sx={style} className="rounded-3 shadow-lg" >
            <Typography className="text-center" variant='h5'>Create post</Typography>
            <hr />
            <div className="d-flex align-items-center gap-2">
                <img width={30} height={30} src={user?.image ? user?.image : "/icons/userreal.png"} alt="user image" />
                <div className="d-flex flex-column">
                <Typography variant='p' className='fw-semibold'>
                    {user?.f_name + " " + user?.l_name}
                </Typography>
                <div onClick={()=>setShowPrivacyBox(true)} className="dark-grey w-max p-1 rounded-1 cursor-pointer">
                    <div className="d-flex align-items-center text-sm gap-1 fw-semibold">
                        <RiGroupFill/>
                        <Typography variant='h6' className='m-0 text-sm fw-semibold'>Friends</Typography>
                        <MdArrowDropDown/>
                    </div>
                </div>
                </div>
            </div>
            <textarea onClick={()=>setEmoji(false)} value={status} onChange={(e)=>setStatus(e.target.value)} rows={3} className='form-control my-2 border-0 shadow-none text-area' placeholder={`What's on your mind, ${user?.f_name}?`}>
            </textarea>
            {
              imagePreview && (
                <img src={imagePreview ? imagePreview : null} alt="" className="prev-image w-100 p-1 border" 
            style={{ 
              height: "200px",
              objectFit: "contain"
             }} />
            )
            }
            <div className="d-flex justify-content-between">
                <div className="colors">Color</div>
                <div className="emojis position-relative">
                    <BsEmojiSunglasses onClick={()=>setEmoji(!emoji)} cursor="pointer" size={24} />
                    <EmojiPicker 
                    onEmojiClick={(e)=>setStatus(status + e.emoji)}
                    className='position-absolute top-0 end-0 '
                    style={{ 
                        transform: "translate(100%,-100%)"
                     }} 
                     height={400}
                     width={300}
                    open={emoji} />
                </div>
            </div>
            <div className="border rounded-2 p-2 d-flex my-2 justify-content-between">
                <Typography className='fw-semibold text-md'>Add to your post</Typography>
                <div className="d-flex gap-2">
                  <div className="position-relative">
                  <input className='position-absolute opacity-0' type="file" name="" id=""
                  onChange={handleImageChange} />
                  <img className='cursor-pointer' src="/icons/image.png" alt="post image icon" width={25} />
                  </div>
                    <img className='cursor-pointer' src="/icons/video.webp" alt="post video icon" width={25} />
                </div>
            </div>
            <Button onClick={handlePostUpload} disabled={btnDisabled || imageLoading || postLoading} variant='contained' className={`w-100 ${btnDisabled || imageLoading ? "btn-secondary" : ""}`}>
              {
                imageLoading ? (
                  <>
                  <ProgressBar
                visible={true}
                height="30"
                width="100"
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
                  </>
                ) : ("Add Post")
              }
                
            </Button>
            <PrivacyBox showPrivacyBox={showPrivacyBox} 
            setShowPrivacyBox={setShowPrivacyBox}
            visibility={visibility} setVisibility={setVisibility} />

        </Box>
      </Modal>
    </>
  );
}
