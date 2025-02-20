import { IPosts } from "../interfaces/posts";
import Post from "./Post";

interface IPostsList {
  posts: IPosts[];
}
function PostsList({ posts }: IPostsList) {
  return (
    <ul className="flex flex-col md:w-full lg:max-w-fit gap-y-5 items-center h-screen overflow-y-scroll scrollbar-hide pt-2">
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </ul>
  );
}

export default PostsList;
