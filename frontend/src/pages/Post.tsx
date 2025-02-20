import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";
import { IPosts } from "../interfaces/posts";
import { useEffect, useState } from "react";
import { updateVote } from "../services/posts-services";
import Spinner from "../components/Spinner";

function PostPage() {
  const { pid } = useParams();

  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<IPosts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`http://localhost:5000/posts/${pid}`);
      const data = await res.json();
      setPost(data);
      setIsLoading(false);
    };
    getPost();
  }, [pid]);

  const handleVote = async (voteType: string) => {
    const { data, error } = await updateVote(pid, voteType);
    if (error) {
      setError(error.message);
    } else {
      setPost(data);
      setError(null);
    }
  };

  if (isLoading) {
    return (
      <div className="m-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden flex flex-row rounded-xl mb-16">
      <div className="w-full md:w-full mt-5 ml-5 flex items-center">
        {/* POST */}
        <div className="border border-slate-500 flex flex-col sm:flex-row w-full lg:max-w-[80%] bg-gradient-to-b from-gray-700 to-slate-800 p-1 sm:p-2 rounded-2xl">
          <div className="w-full">
            <div className="flex flex-row w-full p-2">
              <div className="w-[25%] md:max-w-[15%] xl:max-w-[15%]">
                <img src={post?.userImg} className="rounded-full w-fit" />
              </div>
              <div className="flex flex-col justify-start ml-2 w-[75%] xl:max-w-[85%]">
                <p className="text-lg">{post?.username}</p>
                <p className="text-sm text-gray-400">{post?.datePosted}</p>
                <div className="hidden sm:flex flex-col w-full">
                  <p className="break-words w-full my-2">{post?.message}</p>
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
              <p className="break-words w-full ml-10 my-[0.4rem]">
                {post?.message}
              </p>
              <div className="max-w-[30rem] flex items-center justify-center">
                <img src={post?.img} className="w-full h-full object-contain" />
              </div>
            </div>
            {error && (
              <p className="text-center text-xs text-red-500">{error}</p>
            )}
            <div className="flex flex-row gap-4 text-xs mt-1 m-auto w-fit">
              <button
                className="bg-white hover:bg-green-500 hover:scale-110 duration-100 text-transparent bg-clip-text cursor-pointer"
                onClick={() => handleVote("like")}
              >
                👍
              </button>
              <p>
                {post?.likes} {post?.likes === 1 ? "Like" : "Likes"}
              </p>
              <button
                className="bg-white hover:bg-red-500 hover:scale-110 duration-100 text-transparent bg-clip-text cursor-pointer"
                onClick={() => handleVote("dislike")}
              >
                👎
              </button>
            </div>
          </div>
          <div className="overflow-hidden transition-all duration-300 w-full h-full">
            <Comments showAll={true} comments={post?.comments || []} />
            <CommentForm pid={pid as string} setPost={setPost} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
