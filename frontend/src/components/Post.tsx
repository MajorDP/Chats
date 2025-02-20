import { useState } from "react";
import { IPosts } from "../interfaces/posts";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

interface IPostItem {
  post: IPosts;
}

function Post({ post }: IPostItem) {
  const [showComments, setShowComments] = useState(false);
  return (
    <li className="border border-slate-500 flex flex-col w-full lg:max-w-[80%] bg-gradient-to-b from-gray-700 to-slate-800 p-1 sm:p-2 rounded-2xl">
      <div>
        <div className="flex flex-row w-full p-2">
          <div className="w-[25%] md:max-w-[15%] xl:max-w-[15%]">
            <img src={post.userImg} className="rounded-full w-fit" />
          </div>
          <div className="flex flex-col justify-start ml-2 w-[75%] xl:max-w-[85%]">
            <p className="text-lg">{post.username}</p>
            <p className="text-sm text-gray-400">{post.datePosted}</p>
            <div className="hidden sm:flex flex-col w-full">
              <p className="break-words w-full my-2">{post.message}</p>
              <div className="max-w-[20rem] lg:max-w-[30rem] xl:max-w-[40rem] flex items-start justify-start">
                <img
                  src={post?.img}
                  className="w-fit max-h-[20rem] object-left"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:hidden flex flex-col items-center w-full mt-2">
          <p className="break-words w-full ml-10 my-[0.4rem]">{post.message}</p>
          <div className="max-w-[30rem] flex items-center justify-center">
            <img src={post?.img} className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="flex flex-row gap-4 text-xs mt-1">
          <button className="bg-white hover:bg-green-500 hover:scale-110 duration-100 text-transparent bg-clip-text cursor-pointer">
            👍
          </button>
          <p>
            {post.likes} {post.likes === 1 ? "Like" : "Likes"}
          </p>
          <button className="bg-white hover:bg-red-500 hover:scale-110 duration-100 text-transparent bg-clip-text cursor-pointer">
            👎
          </button>
          <div>
            <button
              className="underline cursor-pointer"
              onClick={() => setShowComments(!showComments)}
            >
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "Comment" : "Comments"}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 w-full mt-4 ${
          showComments ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <CommentForm />
        <ul className="flex flex-col gap-5">
          {post.comments.slice(0, 4).map((comment, index) => (
            <li className="flex flex-row gap-2" key={index}>
              <div className="w-[10%] sm:w-[8%]">
                <img src={comment.userImg} className="w-full rounded-full" />
              </div>

              <div className="flex gap-2 flex-col text-sm w-[40%]">
                <div className="flex flex-row gap-2">
                  <p className="truncate text-xs">{comment.username}</p>
                  <p className="text-[12px] truncate text-gray-400">
                    {comment.datePosted}
                  </p>
                </div>
                <p className="text-xs">{comment.comment}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full mt-5 flex justify-center underline">
          <Link to={`/post/${post.id}`} className="text-xs text-center">
            See All Comments ({post.comments.length})
          </Link>
        </div>
      </div>
    </li>
  );
}

export default Post;
