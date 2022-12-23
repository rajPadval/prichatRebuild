import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import "../App.css";
import { signOut } from "firebase/auth";
const Chat = ({ msg, setMsg, isAuth, setIsAuth }) => {
  const [msgList, setMsgList] = useState([]);
  const postCollectionRef = collection(db, "messages");
  // console.log(postCollectionRef);
  useEffect(() => {
    const getMsg = async () => {
      const data = await getDocs(postCollectionRef);
      // setMsgList(data.docs.map((doc) => (doc.data, doc.id)));
      setMsgList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMsg();
  }, [postCollectionRef]);

  const sendMsg = async () => {
    try {
      const docRef = await addDoc(postCollectionRef, {
        message: msg,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
        },
      });
      setMsg("");
      // console.log(docRef.id, docRef.msg);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  //Signout function
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      // console.log(isAuth);
    });
  };
  // console.log(msg);
  return (
    <div className="flex justify-center align-center w-full h-full my-auto">
      <div
        className="flex-1 p:2 sm:p-6 justify-between flex flex-col bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100
        shadow-md rounded-lg h-[80vh] md:h-[70vh] w-[80vw] md:w-[30vw]"
      >
        <div className="text-2xl my-2 flex flex-col justify-center items-center shadow-md">
          <span className="text-gray-700 mr-3 font-bolder font-extrabold  ">
            Prichat
          </span>
          <span className="text-lg text-gray-600 font-mono font-semibold ">
            Chat for fun
          </span>
          <span
            className="text-sm cursor-pointer rounded-md mb-2 border-transparent shadow-sm shadow-cyan-200 hover:bg-cyan-200 px-2 font-semibold border-2"
            onClick={signUserOut}
          >
            Logout
          </span>
        </div>

        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {msgList.map((msg, index) => {
            if (auth.currentUser.email === msg.author.email) {
              return (
                <div className="chat-message" key={index}>
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                      <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                          {msg.message}
                        </span>
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                      alt="My profile"
                      toolTip={msg.name}
                      className="w-6 h-6 rounded-full order-2"
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className="chat-message">
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                          {msg.message}
                        </span>
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                      alt="My profile"
                      className="w-6 h-6 rounded-full order-1"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
            </span>
            <input
              type="text"
              placeholder="Write your message!"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              className="w-full focus:outline-none bg-transparent border-2 border-transparent focus:border-b-black focus:border-opacity-30 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md
               py-3 transition-all focus:font-mono outline-none"
            />
            <div className="absolute right-0 items-center inset-y-0 sm:flex">
              <button
                onClick={sendMsg}
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none "
              >
                <span className="font-bold ">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90 hidden sm:flex"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
