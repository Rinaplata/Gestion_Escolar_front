import { Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import  login  from "../services/authServices";
import React, { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = { username, password };
      const response = await login(credentials);
      console.log(response + "siiii lo haceeeee");
      localStorage.setItem("token", response.data.token);
      navigate("/adminLayout");
    } catch (error) {
      setError("credenciales incorrectas re odioooooo");
    }
  };

  return (
    <div className="flex items-center p-28 justify-center">
      <div className="bg-white px-20 py-20 rounded-3xl border-9 border-transparent shadow-2xl sm:max-w-lg">
        <div className="sm:max-w-md sm:w-full">
          <h2 className="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  type="username"
                  required
                  placeholder="user.plata"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*********"
                  required
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#006732] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#009e4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/SignUp"
              className="font-semibold leading-6 text-[#8dc109] hover:text-[#4f6d02]"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
