function ChatInput() {
  //FOR HANDLING NEW CHATS BEING SENT
  return (
    <form className="w-[80%] flex flex-row items-center m-auto border rounded-xl px-2 py-1 gap-5">
      {/*IMG INPUT */}
      <div className="w-fit flex cursor-pointer relative ml-2">
        <input
          type="file"
          className="absolute inset-0 opacity-0 z-30 cursor-pointer"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 hover:text-gray-400 z-20 cursor-pointer hover:scale-105 duration-200"
        >
          <path
            fillRule="evenodd"
            d="M12 2a1 1 0 0 1 1 1v10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L11 13.586V3a1 1 0 0 1 1-1z"
            clipRule="evenodd"
          />
          <path d="M4 15a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4a1 1 0 1 0 0 2h4v3H4v-3h4a1 1 0 1 0 0-2H4z" />
        </svg>
      </div>

      {/*MESSAGE AREA */}
      <div className="w-full h-10">
        <textarea className="border rounded-md px-2 py-1 h-full w-full resize-none scrollbar-hide focus:outline-0 leading-relaxed" />
      </div>

      {/*SEND BUTTON */}
      <button className="border border-slate-500 px-2 py-1 rounded-xl hover:scale-105 hover:bg-gray-900 hover:border-slate-600 cursor-pointer duration-200">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
