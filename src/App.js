import React, { useState } from "react";
import ChatRoom from "./Pages/ChatRoom";
import Login from "./Pages/Login";
document.title = "Prichat ";
const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
      <div className="flex justify-center items-center m-auto">
        {!isAuth ? (
          <Login setIsAuth={setIsAuth} isAuth={isAuth} />
        ) : (
          <ChatRoom isAuth={isAuth} setIsAuth={setIsAuth} />
        )}
      </div>
    </>
  );
};

export default App;
