import React, { useState, useEffect } from "react";
import useAuthUser from "../Hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnBoarding } from "../libs/apis";
import { ShipWheel, Loader, MapPin, User } from "lucide-react";
import { LANGUAGES } from "../Constant";

const OnBoardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  useEffect(() => {
    setFormState({
      fullName: authUser?.fullName || "",
      bio: authUser?.bio || "",
      nativeLanguage: authUser?.nativeLanguage || "",
      learningLanguage: authUser?.learningLanguage || "",
      location: authUser?.location || "",
      profilePic: authUser?.profilePic || "",
    });
  }, [authUser]);

  const { mutate: onBoardingMutation, isPending } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Onboarding completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(formState);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-md shadow-xl flex flex-col items-center py-10 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Profile
        </h2>
        <div className="flex flex-col items-center mb-6">
          <div className="avatar mb-3">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {formState.profilePic ? (
                <img src={formState.profilePic} alt="Profile" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-base-300">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-info btn-md normal-case font-semibold"
            onClick={() =>
              setFormState((prev) => ({
                ...prev,
                profilePic: `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()
                  .toString(36)
                  .substring(2, 10)}`,
              }))
            }
          >
            <span className="mr-2">🎲</span> Generate Random Avatar
          </button>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formState.fullName}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, fullName: e.target.value }))
              }
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Bio</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={formState.bio}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Tell others about yourself and your language learning goals"
              rows={3}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-semibold">
                  Native Language
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    nativeLanguage: e.target.value,
                  }))
                }
                required
              >
                <option value="" disabled>
                  Select your native language
                </option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-semibold">
                  Learning Language
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    learningLanguage: e.target.value,
                  }))
                }
                required
              >
                <option value="" disabled>
                  Select language you're learning
                </option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 flex items-center">
                <MapPin className="w-5 h-5" />
              </span>
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="City, Country"
                value={formState.location}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <button
            className="btn btn-primary w-full"
            disabled={isPending}
            type="submit"
          >
            {!isPending ? (
              <>
                <ShipWheel className="size-5 mr-2" />
                Complete Onboarding
              </>
            ) : (
              <>
                <Loader className="animate-spin size-5 mr-2" />
                Onboarding...
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnBoardingPage;
