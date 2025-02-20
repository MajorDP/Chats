import CommentForm from "../components/CommentForm";
import { IPosts } from "../interfaces/posts";

function PostPage() {
  const post: IPosts = {
    id: "p1",
    datePosted: "19.02.2025",
    username: "Asura",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
    message: "This shit so ass",
    img: "https://preview.redd.it/this-shit-is-so-ass-v0-33ef927zzngd1.jpeg?width=1080&crop=smart&auto=webp&s=33c6fd685d73fa6ba4bc9dda21c60c12a3938c1d",
    likes: 254,
    comments: [
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
      {
        userId: "1",
        username: "Asura",
        datePosted: "20.02.2025",
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
        comment: "Amazing post",
        likes: 0,
      },
    ],
  };
  return (
    <div className="w-full overflow-hidden flex flex-row rounded-xl mb-16">
      <div className="w-full md:w-full mt-5 ml-5 flex items-center">
        {/* POST */}
        <div className="border border-slate-500 flex flex-col sm:flex-row w-full lg:max-w-[80%] bg-gradient-to-b from-gray-700 to-slate-800 p-1 sm:p-2 rounded-2xl">
          <div className="w-full">
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
              <p className="break-words w-full ml-10 my-[0.4rem]">
                {post.message}
              </p>
              <div className="max-w-[30rem] flex items-center justify-center">
                <img src={post?.img} className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-row gap-4 text-xs mt-1 m-auto w-fit">
              <button className="bg-white hover:bg-green-500 hover:scale-110 duration-100 text-transparent bg-clip-text cursor-pointer">
                👍
              </button>
              <p>
                {post.likes} {post.likes === 1 ? "Like" : "Likes"}
              </p>
              <button className="bg-white hover:bg-red-500 hover:scale-110 duration-100 text-transparent bg-clip-text cursor-pointer">
                👎
              </button>
            </div>
          </div>
          <div className="overflow-hidden transition-all duration-300 w-full">
            <ul className="flex flex-col gap-5 border border-slate-500 rounded-xl p-2 mt-10 sm:mt-0  bg-gradient-to-b from-gray-700 to-slate-800 h-[20rem] lg:h-[28rem] overflow-y-scroll">
              <h2 className="text-center">Comments</h2>
              {post.comments.map((comment, index) => (
                <li className="flex flex-row gap-2" key={index}>
                  <div className="w-[10%] sm:w-[8%]">
                    <img
                      src={comment.userImg}
                      className="w-full rounded-full"
                    />
                  </div>

                  <div className="flex gap-2 flex-col text-sm w-full sm:w-[40%]">
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
            <CommentForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
