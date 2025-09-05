import React, { useState } from "react";
import { Lock, Key, PenLine, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLogin from "../Hooks/useLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isPending, error, loginMutation } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <div className="min-h-screen bg-neutral flex flex-col items-center justify-center px-2 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-5xl font-bold text-green-400">Login</h1>
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
            Welcome Back
          </h2>
          <p className="text-base text-gray-400 mb-8">
            Sign in to your account to continue your language journey
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-base-100 text-white"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full bg-base-100 text-white"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-full mt-3 normal-case font-semibold text-xl py-3"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
            {error && (
              <div className="text-red-400 text-sm mt-2">
                {error?.response?.data?.message ||
                  error?.message ||
                  "Login failed."}
              </div>
            )}
          </form>
          <div className="mt-4 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-400 hover:underline">
              Create one
            </Link>
          </div>
        </div>
        {/* Right: Illustration & Info */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1 bg-base-300 p-12 relative">
          <img
            src="/Videocall-bro.png"
            alt="Connect with language partners"
            className="max-w-xs w-full h-auto object-contain mb-6"
          />
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

export default LoginPage;
