import { IPosts } from "../interfaces/posts";
import PostSmall from "./PostSmall";

interface IPostsList {
  posts: IPosts[] | null;
  setPosts: React.Dispatch<React.SetStateAction<IPosts[] | null>>;
}
function PostsList({ posts, setPosts }: IPostsList) {
  return (
    <ul className="flex flex-col md:w-full lg:max-w-fit gap-y-5 items-center h-screen overflow-y-scroll scrollbar-hide pt-2">
      {posts?.map((post, index) => (
        <PostSmall post={post} setPosts={setPosts} key={index} />
      ))}
    </ul>
  );
}

export default PostsList;
