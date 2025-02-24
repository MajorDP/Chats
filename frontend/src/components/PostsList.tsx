import { IPosts } from "../interfaces/posts";
import PostSmall from "./PostSmall";

interface IPostsList {
  posts: IPosts[] | null;
  setPosts: React.Dispatch<React.SetStateAction<IPosts[] | null>>;
}
function PostsList({ posts, setPosts }: IPostsList) {
  return (
    <ul className="flex flex-col md:w-full lg:max-w-full gap-y-5 items-center h-screen overflow-y-scroll scrollbar-hide pt-2 sm:ml-4 lg:ml-0">
      {posts?.length === 0 && <p>No posts yet...</p>}
      {posts?.map((post, index) => (
        <PostSmall post={post} setPosts={setPosts} key={index} />
      ))}
    </ul>
  );
}

export default PostsList;
