import FriendList from "../components/FriendList";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";
import usePosts from "../hooks/usePosts";
import Error from "../components/Error";

function Dashboard() {
  const { posts, error, isLoading, setPosts } = usePosts();

  return (
    <div className="w-full overflow-hidden flex flex-row rounded-xl">
      <div className="w-full md:min-w-1/2">
        {isLoading ? (
          <div className="h-screen flex items-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="h-screen">
            <Error error={error} navigate="/" navigateMsg="Refresh page" />
          </div>
        ) : posts ? (
          <PostsList posts={posts} setPosts={setPosts} />
        ) : null}
      </div>
      <div className="hidden md:block md:min-w-1/2">
        <FriendList />
      </div>
    </div>
  );
}

export default Dashboard;
