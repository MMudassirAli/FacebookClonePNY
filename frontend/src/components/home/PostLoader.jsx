import React from "react";
import Skeleton from "react-loading-skeleton";

const PostLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <div key={index} className="p-4 card border-0 w-100 shadow mb-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <Skeleton height={50} width={50} circle />
                <div className="d-flex flex-column">
                  <Skeleton height={10} width={100} />
                  <Skeleton height={10} width={70} />
                </div>
              </div>
              <Skeleton width={30} height={10} />
            </div>
            <Skeleton count={3} />
            <Skeleton height={300} width={"100%"} />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <Skeleton width={30} height={20} />
                <Skeleton width={30} height={20} />
                <Skeleton width={30} height={20} />
              </div>
              <div className="d-flex align-items-center gap-2">
                <Skeleton width={80} />
                <Skeleton width={80} />
              </div>
            </div>
            <hr className="m-1" />
            <div className="d-flex gap-2 justify-content-between align-items-center">
              <Skeleton width={90} height={30} />
              <Skeleton width={90} height={30} />
              <Skeleton width={90} height={30} />
              <Skeleton width={90} height={30} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostLoader;
