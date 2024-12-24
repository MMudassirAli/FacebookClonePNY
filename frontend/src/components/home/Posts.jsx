import React, { useEffect } from "react";
import CreatePosts from "./CreatePosts";
import MyPosts from "./MyPosts";
import { useDispatch, useSelector } from "react-redux";
import { getPostData, postReset } from "../../features/Posts/postSlice";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import PostLoader from "./PostLoader";

const Posts = () => {
  const { postLoading, postSuccess, postMessage, posts, postError } =
    useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postError) {
      toast(postMessage);
    }
    dispatch(getPostData());
    dispatch(postReset());
  }, [postError, postSuccess, dispatch]);
  return (
    <>
      <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 mx-auto" >
        <CreatePosts />
        {
          postLoading ? <PostLoader /> : (
            <>
            {posts?.map((item, index) => {
              return <MyPosts key={index} {...item} />;
            })}
            </>
          )
        }
      </div>
    </>
  );
};

export default Posts;
