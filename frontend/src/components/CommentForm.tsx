import React, { useContext, useState } from "react";
import { postComment } from "../services/posts-services";
import { IPosts } from "../interfaces/posts";
import { AuthContext } from "../context/UserContext";

interface ICommentForm {
  pid: string;
  setPost?: React.Dispatch<React.SetStateAction<IPosts | null>>;
  setPosts?: React.Dispatch<React.SetStateAction<IPosts[] | null>>;
}
function CommentForm({ pid, setPost, setPosts }: ICommentForm) {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await postComment(user.id, pid, comment);

    if (error) {
      setError(error.message);
    } else {
      if (setPost) {
        setPost(data);
      }
      if (setPosts) {
        setPosts(
          (posts) =>
            posts?.map((currPost) =>
              currPost.id === data.id ? data : currPost
            ) || []
        );
      }
      setComment("");
      setError(null);
    }
  };
  return (
    <form
      className="my-5 flex flex-col justify-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p className="text-sm mb-1">
        Leave a comment{" "}
        <span className="block sm:inline text-xs sm:text-xs text-gray-300">
          (Max. 200 characters)
        </span>
      </p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-white text-black text-sm px-1 py-1 resize-none w-full rounded-md focus:outline-0 scrollbar-hide"
        maxLength={200}
      />
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
      <button
        className="hover:bg-gray-600 text-sm bg-gray-700 mt-2 px-2 py-1 rounded-xl w-44 m-auto hover:scale-105 cursor-pointer duration-300"
        disabled={!comment}
      >
        Comment
      </button>
    </form>
  );
}

export default CommentForm;
