import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./MuseyScreens/Contexts/AuthContext";
import Header from "./Shared/Component/Header";
import MainPage from "./MuseyScreens/Component/LandingPages/MainPage";
// import FeedBackBoard from "./MuseyScreens/Component/UserDashBoard/FeedBackBoard";
import YourBoard from "./MuseyScreens/Component/UserDashBoard/YourBoard";
import UploadBoard from "./MuseyScreens/Component/UserDashBoard/UploadBoard";
import AddImageBoard from "./MuseyScreens/Component/UserDashBoard/AddImageBoard";
import Forgot from "./Shared/Component/Forgot";
import EmailVerify from "./Shared/Component/EmailVerify";
import ImageRequestBoard from "./MuseyScreens/Component/UserDashBoard/ImageRequestBoard";
import ChangePassword from "./Shared/Component/ChangePassword";
import LogOut from "./Shared/Component/LogOut";
import StripeCheckout from "./StripeCheckout";
import Success from "./Success";
import Cancel from "./Cancel";
import Profile from "./Shared/Component/Profile";
import EditMoodboard from "./MuseyScreens/Component/UserDashBoard/EditMoodboard";

// ProtectedRoute component to handle protected routes
const ProtectedRoute = ({ element, redirectTo, condition }) => {
  return condition ? element : <Navigate to={redirectTo} />;
};

function App() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  const userId = localStorage.getItem("UserId");

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/forgetpassword" element={<Forgot />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/passwordchange" element={<ChangePassword />} />
          <Route path="/emailverified" element={<EmailVerify />} />

          {/* other routes */}
          <Route
            path="/yourboard"
            element={
              <ProtectedRoute
                element={<YourBoard />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={<Profile />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
          <Route
            path="/uploadboard"
            element={
              <ProtectedRoute
                element={<UploadBoard />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
          <Route
            path="/generateImage"
            element={
              <ProtectedRoute
                element={<EditMoodboard />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
          <Route
            path="/addimage"
            element={
              <ProtectedRoute
                element={<AddImageBoard />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
          <Route
            path="/requestboard"
            element={
              <ProtectedRoute
                element={<ImageRequestBoard />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
          {/* <Route
            path="/feedbackboard"
            element={
              <ProtectedRoute
                element={<FeedBackBoard />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          /> */}
          <Route
            path="/subscription"
            element={
              <ProtectedRoute
                element={<StripeCheckout userId={userId} />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute
                element={<Success />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
          <Route
            path="/cancel"
            element={
              <ProtectedRoute
                element={<Cancel />}
                redirectTo="/"
                condition={isLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
