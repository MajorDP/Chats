import { useContext, useState } from "react";
import { AuthContext } from "../../context/UserContext";

interface ILoginForm {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({ setIsLogin }: ILoginForm) {
  const { error, login } = useContext(AuthContext);
  const [authData, setAuthData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(authData);
  };
  return (
    <form
      className="w-full flex items-center m-auto flex-col mt-20"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-center mt-4 text-xl font-semibold">Sign In</h2>
      <div className=" flex flex-col w-fit mt-10">
        <label>Email</label>
        <input
          className="border rounded-md px-2 py-1 focus:outline-slate-300 focus:outline-1"
          value={authData.email}
          onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
        />
      </div>
      <div className=" flex flex-col w-fit mt-3">
        <label>Password</label>
        <input
          className="border rounded-md px-2 py-1 focus:outline-slate-300 focus:outline-1"
          value={authData.password}
          onChange={(e) =>
            setAuthData({ ...authData, password: e.target.value })
          }
        />
      </div>
      {error && <p>{error}</p>}
      <button
        type="submit"
        className="mt-5 border px-4 py-2 rounded-xl cursor-pointer hover:scale-105 duration-200 bg-slate-700 hover:bg-slate-600"
      >
        Sign In
      </button>
      <button
        className="block md:hidden mt-4 text-gray-400 text-sm"
        onClick={(e) => {
          e.preventDefault();
          setIsLogin((isLogin: boolean) => !isLogin);
        }}
      >
        Don't have an account?
      </button>
    </form>
  );
}

export default LoginForm;
