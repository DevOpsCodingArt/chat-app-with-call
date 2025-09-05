import { axiosInstance } from "./axios";

export const signUp = async (form) => {
  try {
    const response = await axiosInstance.post("/auth/signup", form);
    return response.data;
  } catch (error) {
    // Optionally, you can throw error.response?.data or a custom error message
    throw error;
  }
};
export const login = async (form) => {
  try {
    const response = await axiosInstance.post("/auth/login", form);
    return response.data;
  } catch (error) {
    // Optionally, you can throw error.response?.data or a custom error message
    throw error;
  }
};
export const logout = async (form) => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    // Optionally, you can throw error.response?.data or a custom error message
    throw error;
  }
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    return null;
  }
};

export const completeOnBoarding = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`
  );
  return response.data;
}
export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
