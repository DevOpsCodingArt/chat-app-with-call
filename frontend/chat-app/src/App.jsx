import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import PageLoader from "./Components/PageLoader";
import useAuthUser from "./Hooks/useAuthUser";
import Layout from "./Components/Layout";
import { useThemeStore } from "./Store/useThemeStore";

function App() {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnBoarding;
  const { theme } = useThemeStore();

  if (isLoading) return <PageLoader />;

  const routes = (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated && isOnBoarded ? (
            <Layout showSidebar={true}>
              <HomePage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          !isAuthenticated ? (
            <SignUpPage />
          ) : (
            <Navigate to={!isOnBoarded ? "/" : "/onboarding"} />
          )
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginPage />
          ) : (
            <Navigate to={!isOnBoarded ? "/" : "/onboarding"} />
          )
        }
      />
      <Route
        path="/notifications"
        element={
          isAuthenticated && isOnBoarded ? (
            <Layout showSidebar={true}>
              <NotificationPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        }
      />
      <Route
        path="/call/:id"
        element={
          isAuthenticated && isOnBoarded ? (
            <CallPage />
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        }
      />
      <Route
        path="/chat/:id"
        element={
          isAuthenticated && isOnBoarded ? (
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        }
      />
      <Route
        path="/onboarding"
        element={
          isAuthenticated ? (
            !isOnBoarded ? (
              <OnBoardingPage />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );

  return (
    <div className="wfull h-screen" data-theme={theme}>
      {routes}
      <Toaster />
    </div>
  );
}

export default App;
