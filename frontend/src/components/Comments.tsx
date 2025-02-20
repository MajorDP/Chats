import { IComment } from "../interfaces/posts";

interface IComments {
  comments: IComment[];
  showAll: boolean;
}

function Comments({ comments, showAll }: IComments) {
  const displayedComments = !showAll ? comments.slice(0, 5) : comments;
  return (
    <ul
      className={`flex flex-col gap-5 border border-slate-500 rounded-xl p-2 mt-10 sm:mt-0  bg-gradient-to-b from-gray-700 to-slate-800 h-[18rem]  overflow-y-scroll scrollbar-hide `}
    >
      <h2 className="text-center">Comments</h2>
      {displayedComments.map((comment, index) => (
        <li className="flex flex-row gap-2" key={index}>
          <div className="w-[10%] sm:w-[8%]">
            <img src={comment.userImg} className="w-full rounded-full" />
          </div>

          <div className="flex gap-2 flex-col text-sm w-full">
            <div className="flex flex-row gap-2">
              <p className="truncate text-xs">{comment.username}</p>
              <p className="text-[12px] truncate text-gray-400">
                {comment.datePosted}
              </p>
            </div>
            <p className="text-xs w-full">{comment.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Comments;
