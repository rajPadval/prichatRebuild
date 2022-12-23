import Chat from "../components/Chat";
import "../App.css";
import { useState } from "react";
const ChatRoom =({isAuth,setIsAuth})=> {
  const [msg,setMsg] = useState("")
  return (
    <div className="flex justify-center align-center w-[100vw] h-[100vh]">
      <div className="flex justify-center align-center m-auto">
        <Chat msg={msg} setMsg={setMsg} isAuth={isAuth} setIsAuth={setIsAuth}/>
      </div>
    </div>
  );
}

export default ChatRoom
