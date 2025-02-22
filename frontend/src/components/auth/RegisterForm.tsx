import { useContext, useState } from "react";
import { AuthContext } from "../../context/UserContext";

interface IRegisterForm {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterForm({ setIsLogin }: IRegisterForm) {
  const { register } = useContext(AuthContext);
  const [authData, setAuthData] = useState<{
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
  }>({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(authData);
  };
  return (
    <form
      className="w-full flex items-center m-auto flex-col mt-20"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center mt-4 text-lg font-semibold">
        Create an account
      </h2>
      <div className=" flex flex-col w-fit mt-10">
        <label>Email</label>
        <input
          className="border rounded-md px-2 py-1 focus:outline-slate-300 focus:outline-1"
          onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
        />
      </div>
      <div className=" flex flex-col w-fit mt-3">
        <label>Username</label>
        <input
          className="border rounded-md px-2 py-1 focus:outline-slate-300 focus:outline-1"
          onChange={(e) =>
            setAuthData({ ...authData, username: e.target.value })
          }
        />
      </div>
      <div className=" flex flex-col w-fit mt-3">
        <label>Password</label>
        <input
          className="border rounded-md px-2 py-1 focus:outline-slate-300 focus:outline-1"
          onChange={(e) =>
            setAuthData({ ...authData, password: e.target.value })
          }
        />
      </div>
      <div className=" flex flex-col w-fit mt-3">
        <label>Repeat Password</label>
        <input
          className="border rounded-md px-2 py-1 focus:outline-slate-300 focus:outline-1"
          onChange={(e) =>
            setAuthData({ ...authData, repeatPassword: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="mt-5 border px-4 py-2 rounded-xl cursor-pointer hover:scale-105 duration-200 bg-slate-700 hover:bg-slate-600"
      >
        Sign Up
      </button>
      <button
        className="block md:hidden mt-4 text-gray-400 text-sm"
        onClick={(e) => {
          e.preventDefault();
          setIsLogin((isLogin: boolean) => !isLogin);
        }}
      >
        Already have an account?
      </button>
    </form>
  );
}

export default RegisterForm;
