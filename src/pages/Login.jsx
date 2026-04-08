import { useState } from "react";
import SocialLoginButtons from "../components/SocialLoginButtons";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const [currentState, setCurrentState] = useState("Login"); // "Login" or "Signup"
  const [isNext, setIsNext] = useState(true); // Step toggle
  const [errors, setErrors] = useState({}); // field-level errors

  const { login } = useAuth();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (currentState === "Signup" && user.name.trim() === "") {
      newErrors.name = "Full Name is required";
    }
    if (user.email.trim() === "") newErrors.email = "Email is required";
    if (user.password.trim() === "")
      newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (user.bio.trim() === "") newErrors.bio = "Bio cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setIsNext(false);
  };

  const handleBack = () => setIsNext(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    // Call backend API here
    login(currentState === "Signup" ? "signup" : "login", user);
    setUser({ name: "", email: "", password: "", bio: "" });
    setIsNext(true);
    setErrors({});
  };

  const handleLogin = () => {
    if (!validateStep1()) return;
    login("login", user);
    // console.log("Login API call for", user.email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-600 via-purple-600 to-pink-300 p-4">
      <div className="flex flex-col md:flex-row justify-center rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full bg-white/10 backdrop-blur-md">
        {/* Left panel: Form */}
        <div className="flex-1 flex flex-col justify-center p-8 bg-white/90 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              {currentState}
            </h2>
            {isNext ? (
              <div className="space-y-4">
                {currentState === "Signup" && (
                  //  name
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                )}

                {/* email  */}
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* password  */}
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={currentState === "Login" ? handleLogin : handleNext}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {currentState === "Login" ? "Login" : "Next"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={user.bio}
                    onChange={handleChange}
                    placeholder="Tell us something about yourself"
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                      errors.bio ? "border-red-500" : ""
                    }`}
                  ></textarea>
                  {errors.bio && (
                    <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            <div className="mt-4 mb-3 text-center text-gray-600">
              {currentState === "Login" ? (
                <p>
                  Don't have an account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={() => {
                      setCurrentState("Signup");
                      setIsNext(true);
                      setErrors({});
                    }}
                  >
                    Signup
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={() => {
                      setCurrentState("Login");
                      setIsNext(true);
                      setErrors({});
                    }}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
            <SocialLoginButtons />
          </form>
        </div>

        {/* Right panel: Welcome Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-linear-to-br from-green-400 via-green-500 to-green-600 text-white p-10">
          <div className="max-w-md text-center space-y-4">
            {currentState === "Login" ? (
              <>
                <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                <p className="mb-2">
                  It's great to see you again! Sign in to continue or create an
                  account to join our community and enjoy all features.
                </p>
                <p>
                  No account yet?{" "}
                  <span
                    className="text-blue-700 cursor-pointer hover:underline"
                    onClick={() => {
                      setCurrentState("Signup");
                      setIsNext(true);
                      setErrors({});
                    }}
                  >
                    Signup
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2">Hello, New Friend!</h2>
                <p className="mb-2">
                  Thanks for joining us! Fill out the form to create your
                  account and start exploring all the features we offer.
                </p>
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-blue-700 cursor-pointer hover:underline"
                    onClick={() => {
                      setCurrentState("Login");
                      setIsNext(true);
                      setErrors({});
                    }}
                  >
                    Login
                  </span>
                </p>
              </>
            )}
            <SocialLoginButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
