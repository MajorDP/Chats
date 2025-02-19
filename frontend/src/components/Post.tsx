import { IPosts } from "../interfaces/posts";

interface IPostItem {
  post: IPosts;
}

function Post({ post }: IPostItem) {
  return (
    <li className="border border-slate-500 flex flex-col w-full lg:max-w-[80%] bg-gradient-to-b from-gray-700 to-slate-800 p-1 sm:p-2 rounded-2xl">
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
    </li>
  );
}

export default Post;
