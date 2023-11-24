import React, { useContext } from "react";
import HeroSection from "./HeroSection";
import MidSection from "./MidSection";
import BottomSection from "./BottomSection";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

function MainPage() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  // If the user is already logged in, redirect to the "yourboard" page
    if (isLoggedIn) {
      return <Navigate to="/yourboard" />;
    }

  // Otherwise, display the main page content

  return (
    <div className="mainWraper">
      <HeroSection />
      <MidSection />
      <BottomSection />
    </div>
  );
}

export default MainPage;
