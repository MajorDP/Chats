import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="w-full h-[80%] md:w-[80%] bg-slate-900 m-auto absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-xl flex flex-row">
      <div
        className={`${
          !isLogin ? "block" : "hidden"
        } md:flex justify-center items-center w-full`}
      >
        <RegisterForm setIsLogin={setIsLogin} />
      </div>
      <div className="hidden md:block w-[1px] h-[50%] m-auto bg-white rounded-full"></div>
      <div
        className={`${
          isLogin ? "block" : "hidden"
        } md:flex justify-center items-center w-full`}
      >
        <LoginForm setIsLogin={setIsLogin} />
      </div>
    </div>
  );
}

export default Auth;
