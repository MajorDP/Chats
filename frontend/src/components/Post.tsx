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

function Post({ post, setPosts }: IPostItem) {
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

  const isVoted = user.votes.liked.includes(post.id)
    ? "liked"
    : user.votes.disliked.includes(post.id)
    ? "disliked"
    : null;

  return (
    <li className="border border-slate-500 flex flex-col w-full lg:max-w-[80%] bg-gradient-to-b from-gray-700 to-slate-800 p-1 sm:p-2 rounded-2xl">
      <div>
        <div className="flex flex-row w-full p-2">
          <div className="w-[25%] md:max-w-[15%] xl:max-w-[15%]">
            <img src={post.user.img} className="rounded-full w-fit" />
          </div>
          <div className="flex flex-col justify-start ml-2 w-[75%] xl:max-w-[85%]">
            <p className="text-lg">{post.user.username}</p>
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
        {error && <p className="text-center text-xs text-red-500">{error}</p>}
        <div className="flex flex-row gap-4 text-xs mt-1">
          <button
            className={`${
              isVoted === "liked" ? "bg-green-500" : "bg-white"
            } hover:bg-green-600 hover:scale-110 duration-100 text-transparent bg-clip-text cursor-pointer`}
            onClick={() => handleVote("like")}
          >
            👍
          </button>
          <p>
            {post.likes} {post.likes === 1 ? "Like" : "Likes"}
          </p>
          <button
            className={`${
              isVoted === "disliked" ? "bg-red-500" : "bg-white"
            } hover:bg-red-600 hover:scale-110 duration-100 text-transparent bg-clip-text cursor-pointer`}
            onClick={() => handleVote("dislike")}
          >
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
          showComments ? "h-[30rem]" : "h-0"
        }`}
      >
        <CommentForm pid={post.id} setPosts={setPosts} />
        <Comments showAll={false} comments={post.comments} />
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
