import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { Fa42Group } from 'react-icons/fa6';
import { MdArrowDropDown } from 'react-icons/md';
import { RiGroupFill } from 'react-icons/ri';
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { Button } from '@mui/material';
import PrivacyBox from './PrivacyBox';

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
    const {user} = useSelector((state)=>state.user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emoji, setEmoji] = React.useState(false);
  const [status,setStatus] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);

  React.useEffect(()=>{
    if(status.length > 0){
        setBtnDisabled(false);
    }else{
        setBtnDisabled(true);
    }
  },[status]);

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
                <div className="dark-grey w-max p-1 rounded-1 cursor-pointer">
                    <div className="d-flex align-items-center text-sm gap-1 fw-semibold">
                        <RiGroupFill/>
                        <Typography variant='h6' className='m-0 text-sm fw-semibold'>Friends</Typography>
                        <MdArrowDropDown/>
                    </div>
                </div>
                </div>
            </div>
            <textarea onClick={()=>setEmoji(false)} value={status} onChange={(e)=>setStatus(e.target.value)} rows={5} className='form-control my-2 border-0 shadow-none text-area' placeholder={`What's on your mind, ${user?.f_name}?`}>
            </textarea>
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
                    <img className='cursor-pointer' src="/icons/image.png" alt="post image icon" width={25} />
                    <img className='cursor-pointer' src="/icons/video.webp" alt="post video icon" width={25} />
                </div>
            </div>
            <Button disabled={btnDisabled} variant='contained' className={`w-100 ${btnDisabled ? "btn-secondary" : ""}`}>
                Add Post
            </Button>

            <PrivacyBox/>

        </Box>
      </Modal>
    </>
  );
}
