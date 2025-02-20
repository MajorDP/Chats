import React from "react";

function CommentForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        className="bg-white text-black text-sm px-1 py-1 resize-none w-full rounded-md focus:outline-0 scrollbar-hide"
        maxLength={200}
      />
      <button className="hover:bg-gray-600 text-sm bg-gray-700 mt-2 px-2 py-1 rounded-xl w-44 m-auto hover:scale-105 cursor-pointer duration-300">
        Comment
      </button>
    </form>
  );
}

export default CommentForm;
