import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialLoginButtons() {
  const loginWithGoogle = () =>
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, "_self");

  const loginWithFacebook = () =>
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/facebook`,
      "_self",
    );

  const loginWithGithub = () =>
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/github`, "_self");
  
  const buttonClasses =
    "flex items-center justify-center gap-2 w-56 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200";

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={loginWithGoogle}
        className={`${buttonClasses} border border-gray-300 hover:bg-gray-100 hover:text-gray-950 cursor-pointer`}
      >
        <FcGoogle size={20} /> Login with Google
      </button>

      <button
        onClick={loginWithFacebook}
        disabled={true}
        className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-700 cursor-not-allowed`}
      >
        <FaFacebook size={20} />
        Login with Facebook
      </button>

      <button
        onClick={loginWithGithub}
        className={`${buttonClasses} bg-gray-800 text-white hover:bg-gray-900 cursor-pointer`}
      >
        <FaGithub size={20} />
        Login with GitHub
      </button>
    </div>
  );
}
