import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Shared/Component/SignUp";
import Header from "./Shared/Component/Header";
import MainPage from "./MuseyScreens/Component/LandingPages/MainPage";
import FeedBackBoard from "./MuseyScreens/Component/UserDashBoard/FeedBackBoard";
import YourBoard from "./MuseyScreens/Component/UserDashBoard/YourBoard";
import UploadBoard from "./MuseyScreens/Component/UserDashBoard/UploadBoard";
import AddImageBoard from "./MuseyScreens/Component/UserDashBoard/AddImageBoard";
import Forgot from "./Shared/Component/Forgot";
import EmailVerify from "./Shared/Component/EmailVerify"
import ImageRequestBoard from "./MuseyScreens/Component/UserDashBoard/ImageRequestBoard";
import ChangePassword from "./Shared/Component/ChangePassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/passwordchange" element={<ChangePassword />} />
          <Route path="/emailverified" element={<EmailVerify />} />
          <Route path="/yourboard" element={<YourBoard />} />
          <Route path="/uploadboard" element={<UploadBoard />} />
          <Route path="/addimage" element={<AddImageBoard />} />
          <Route path="/requestboard" element={<ImageRequestBoard />} />
          <Route path="/feedbackboard" element={<FeedBackBoard />} />
        </Routes>
      </BrowserRouter>
      {/* <ImageRequestBoard/>   */}
    </div>
  );
}

export default App;
