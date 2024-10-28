import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Form({ isSignUp, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsSubmiting(true)
    e.preventDefault();

    try {
      const data = isSignUp
        ? { username, password, email }
        : { username, password };

      const res = await api.post(route, data);
      if (!isSignUp) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.detail) {
          toast.error(errorData.detail);
          return;
        }
        if (errorData.username) {
          toast.error(errorData.username);
          return;
        }

        if (errorData.email) {
          toast.error(errorData.email);
          return;
        }

        if (errorData.password) {
          toast.error(errorData.password[0]);
          return;
        }
      }
      toast.error("An unexpected error occurred. Please try again.");
    }finally{
      setIsSubmiting(false)
    }
  };

  return (
    <>
      <Toaster />
      <section className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="overflow-hidden flex items-center w-full max-w-4xl">
          {/* Image Section */}
          <div className="hidden md:block w-1/2">
            <img
              src="images/travel.svg"
              alt="Sign Up Image"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              {isSignUp ? "Create an Account" : "Login"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="font-semibold">
                  Username:
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              {isSignUp && (
                <div>
                  <label htmlFor="email" className="font-semibold">
                    Email:
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
              )}
              <div>
                <label htmlFor="password" className="font-semibold">
                  Password:
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <Button className="w-full">{isSignUp ? (isSubmiting ? "Signing Up..." : "Sign Up") : (isSubmiting ? "Logging In..." : "Login")}</Button>
              {isSignUp ? (
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline text-blue-600 font-bold">
                    Login
                  </Link>
                </div>
              ) : (
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline text-blue-600 font-bold">
                    Sign up
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;
