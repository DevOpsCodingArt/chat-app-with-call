import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, PenLine, Lock, Key } from "lucide-react";
import useSignUp from "../Hooks/useSignUp";

const SignUpPage = () => {
  // ...existing code for focus, handleChange, handleFocus, handleBlur, handleSubmit...

  // Example placeholder state and handlers to avoid reference errors
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const { isPending, error, signUpMutation } = useSignUp();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    signUpMutation(form);
  };

  return (
    <div className="min-h-screen bg-neutral flex flex-col items-center justify-center px-2 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-5xl font-bold text-green-400">Sign Up</h1>
        <Lock className="w-10 h-10 text-green-400" />
        <Key className="w-9 h-9 text-yellow-400 ml-2" />
      </div>
      {/* Card */}
      <div className="bg-base-200 rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden min-h-[520px]">
        {/* Left: Form */}
        <div className="flex-1 p-12 flex flex-col justify-center min-w-[340px]">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-8 h-8 text-green-400" />
            <span className="text-3xl font-mono font-bold text-green-400 tracking-wide">
              Streamify
            </span>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            Create an Account
          </h2>
          <p className="text-base text-gray-400 mb-8">
            Join Streamify and start your language learning adventure!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                required
                autoComplete="name"
                className="input input-bordered w-full bg-base-100 text-white"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="input input-bordered w-full bg-base-100 text-white"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="input input-bordered w-full bg-base-100 text-white"
                placeholder="Password"
              />
              <span className="text-xs text-gray-500 block mt-1">
                Password must be at least 6 characters long
              </span>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={form.agree}
                onChange={handleChange}
                required
                className="mr-2 accent-green-400"
              />
              <label
                htmlFor="agree"
                className="text-gray-400 text-sm select-none"
              >
                I agree to the{" "}
                <a href="#" className="text-green-400 underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-400 underline">
                  privacy policy
                </a>
              </label>
            </div>
            {errorMsg && (
              <div className="text-red-400 text-sm mb-2">{errorMsg}</div>
            )}
            <button
              type="submit"
              className="btn btn-success w-full mt-3 normal-case font-semibold text-xl py-3"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Create Account"}
            </button>
          </form>
          <div className="text-center mt-6">
            <span className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-400 underline hover:text-green-300 transition"
              >
                Sign in
              </Link>
            </span>
          </div>
        </div>
        {/* Right: Illustration & Info */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1 bg-base-300 p-12 relative">
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-60 h-80 flex items-center justify-center">
              <img src="./Videocall-bro.png" alt="" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-green-300 mb-3 text-center">
            Connect with language partners worldwide
          </h3>
          <p className="text-base text-gray-300 text-center max-w-sm">
            Practice conversations, make friends, and improve your language
            skills together
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
