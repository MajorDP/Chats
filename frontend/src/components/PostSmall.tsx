import { useContext, useState } from "react";
import { IPosts } from "../interfaces/posts";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { updateVote } from "../services/posts-services";
import { AuthContext } from "../context/UserContext";

interface IPostItem {
  post: IPosts;
  setPosts: React.Dispatch<React.SetStateAction<IPosts[] | null>>;
}

function PostSmall({ post, setPosts }: IPostItem) {
  const { user, updateUser } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  const handleVote = async (voteType: string) => {
    const { data, error } = await updateVote(user.id, post.id, voteType);

    if (error) {
      setError(error.message);
    } else {
      setPosts(
        (posts) =>
          posts?.map((currPost) =>
            currPost.id === post.id ? data.post : currPost
          ) || []
      );
      updateUser(data.user);
      setError(null);
    }
  };

  const handleSetPosts = (data: IPosts) => {
    setPosts(
      (posts) =>
        posts?.map((currPost) => (currPost.id === data.id ? data : currPost)) ||
        null
    );
  };

  const isVoted = user.votes.liked.includes(post.id)
    ? "liked"
    : user.votes.disliked.includes(post.id)
    ? "disliked"
    : null;

  return (
    <li className="border border-blue-900 flex flex-col w-full lg:max-w-[80%] bg-gradient-to-b from-gray-900 to-blue-950 p-2 sm:p-3 rounded-2xl shadow-lg">
      <div>
        <div className="flex flex-row w-full p-3">
          <div className="w-[25%] md:max-w-[15%] xl:max-w-[15%]">
            <img
              src={post.user.img}
              className="rounded-full w-fit border-2 border-cyan-400 cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-start ml-2 w-[75%] xl:max-w-[85%]">
            <p className="text-lg font-semibold text-cyan-400 cursor-pointer">
              {post.user.username}
            </p>
            <p className="text-sm text-blue-300">{post.datePosted}</p>
            <div className="hidden sm:flex flex-col w-full">
              <p className="break-words w-full my-2 text-gray-300 text-sm lg:text-lg">
                {post.message}
              </p>
              <div className="max-w-[20rem] lg:max-w-[30rem] xl:max-w-[40rem] flex items-start justify-start">
                <img
                  src={post?.img}
                  className="w-fit max-h-[20rem] object-left rounded-md border border-blue-800 shadow-lg shadow-cyan-500/40"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:hidden flex flex-col items-center w-full mt-2">
          <p className="break-words w-full ml-10 my-[0.4rem] text-gray-300 text-[20px]">
            {post.message}
          </p>
          <div className="max-w-[30rem] flex items-center justify-center">
            <img
              src={post?.img}
              className="w-full h-full object-contain rounded-md border border-blue-800 shadow-lg shadow-cyan-500/40"
            />
          </div>
        </div>
        {error && <p className="text-center text-xs text-red-500">{error}</p>}
        <div className="flex flex-row gap-4 text-xs mt-2">
          <button
            className={`${
              isVoted === "liked"
                ? "bg-cyan-500 text-black"
                : "bg-transparent text-cyan-400"
            } hover:bg-cyan-400 hover:text-black px-3 py-1 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500 border border-cyan-500 cursor-pointer`}
            onClick={() => handleVote("like")}
          >
            👍
          </button>
          <p className="text-gray-400 font-medium flex items-center">
            {post.likes} {post.likes === 1 ? "Like" : "Likes"}
          </p>
          <button
            className={`${
              isVoted === "disliked" ? "bg-red-500" : "bg-transparent"
            } hover:bg-red-400 hover:text-black px-3 py-1 rounded-lg transition-all duration-200 shadow-md shadow-red-500 border border-red-500 cursor-pointer`}
            onClick={() => handleVote("dislike")}
          >
            👎
          </button>
          <div>
            <button
              className="underline text-cyan-300 hover:text-cyan-400 cursor-pointer transition-all duration-150"
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
          showComments ? "h-[35rem]" : "h-0"
        }`}
      >
        <Comments showAll={false} comments={post.comments} />
        <div className="w-full mt-5 flex justify-center underline">
          <Link
            to={`/post/${post.id}`}
            className="text-xs text-cyan-300 hover:text-cyan-400 transition-all duration-150"
          >
            See All Comments ({post.comments.length})
          </Link>
        </div>
        <CommentForm pid={post.id} handleSetPosts={handleSetPosts} />
      </div>
    </li>
  );
}

export default PostSmall;
