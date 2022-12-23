import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
const Login = ({ setIsAuth, isAuth }) => {
  const SignWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };
  return (
    <div className="flex jutify-center flex-col items-center w-[100vw] h-[100vh]">
      <div className="border-2 rounded-md p-5 flex justify-center items-center flex-col gap-4 bg-white bg-opacity-20">
        <div className="text-3xl font-bold ">
          <p>Sign In With Google to Continue</p>
        </div>
        <button
          className="border-2 py-2 px-4 font-semibold text-xl hover:scale-105 rounded-md hover:shadow-lg hover:border-green-500  hover:text-gray-800 transition-all"
          onClick={SignWithGoogle}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
