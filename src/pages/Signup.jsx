import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      username,
      repeatPassword,
    };

    try {
      const response = await signupService(user);
      navigate("/login");
    } catch (error) {
      const { errorMessage } = error.response.data;
      setError(errorMessage);
    }
  };
  return (
    <>
      <div className="bg-white w-full">
        <div className="flex justify-center h-screen">
          <div className="bg-cover bg-center align-center lg:block lg:w-full bg-kanagawa ">
            {/*<div className="backdrop-blur-sm h-full w-full"></div>*/}
          </div>
          <div className="border-x flex items-center w-full max-w-md px-6 ml-0 lg:w-2/6 bg-cream-0 shadow-2xl">
            <div className="flex-1 ">
              <div className="text-center">
                <h2 className="flex flex-row justify-center text-4xl font-bold text-center text-gray-700 text-white">
                  <img src="logo.png" alt="" width={200} />
                </h2>
                <p className="mt-3 text-independence-200">
                  Sign in to access your account
                </p>
                {error !== "" && (
                  <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md bg-gray-800 mt-5">
                    <div className="flex items-center justify-center w-12 bg-red-500">
                      <svg
                        className="w-6 h-6 text-white fill-current"
                        viewBox="0 0 40 40"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                      </svg>
                    </div>

                    <div className="px-4 py-2 -mx-3">
                      <div className="mx-3 text-left">
                        <span className="font-semibold text-red-500 text-red-400">
                          Error: {error}
                        </span>
                        <p className="text-sm bg-white text-gray-200">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8">
                <form onSubmit={handleSignup}>
                  <div className="flex flex-col justify-between items-start mb-2">
                    <label
                      htmlFor="username"
                      className="text-left block text-sm text-independence-200"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      name="username"
                      id="username"
                      placeholder="Username"
                      className="block w-full px-4 py-2 mt-2 border border-independence-100 rounded-md placeholder-independence-0 bg-white text-independence-300 border-gray-700 focus:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6 flex flex-col justify-between items-start mb-2">
                    <label
                      htmlFor="email"
                      className="text-left block text-sm text-independence-200"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 border border-independence-100 rounded-md placeholder-independence-0 bg-white text-independence-300 border-gray-700 focus:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-end mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-independence-200"
                      >
                        Password
                      </label>
                    </div>

                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md placeholder-independence-0 bg-white text-independence-200 border-gray-700 focus:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-end mb-2">
                      <label
                        htmlFor="repeatPassword"
                        className="text-sm text-independence-200"
                      >
                        Repeat password
                      </label>
                    </div>

                    <input
                      type="password"
                      name="repeatPassword"
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                      id="repeatPassword"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md placeholder-independence-0 bg-white text-independence-200 border-gray-700 focus:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-wine-100 rounded-md hover:bg-wine-100 focus:outline-none focus:bg-wine-    0 focus:ring focus:ring-wine-0 focus:ring-opacity-50">
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
