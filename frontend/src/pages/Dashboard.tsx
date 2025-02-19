import FriendList from "../components/FriendList";
import PostsList from "../components/PostsList";
import { IPosts } from "../interfaces/posts";

function Dashboard() {
  const mockPosts: IPosts[] = [
    {
      id: "p1",
      datePosted: "19.02.2025",
      username: "Asura",
      userImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      message: "This shit so ass",
      img: "https://preview.redd.it/this-shit-is-so-ass-v0-33ef927zzngd1.jpeg?width=1080&crop=smart&auto=webp&s=33c6fd685d73fa6ba4bc9dda21c60c12a3938c1d",
    },
    {
      id: "p1",
      datePosted: "19.02.2025",
      username: "Asura",
      userImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8khy-blRnHeXGcPBjvyrlA2s2SumbWnHxw&s",
      message: "This shit so ass",
      img: "https://cdn.discordapp.com/attachments/648600190919376897/1341571085082034288/IMG_8501.jpg?ex=67b67aef&is=67b5296f&hm=3266b5f53671bf22db6d5ea81fdabaafd45db7adb9297ae54cbe3b99a39d93a8&",
    },
  ];
  return (
    <div className="w-full overflow-hidden flex flex-row ml-2 md:ml-8 rounded-xl ">
      <div className="w-full md:w-[70%]">
        <PostsList posts={mockPosts} />
      </div>
      <div className="hidden md:block md:w-[70%]">
        <FriendList />
      </div>
    </div>
  );
}

export default Dashboard;
