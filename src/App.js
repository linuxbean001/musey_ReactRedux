import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Shared/Component/SignUp";
import Header from "./Shared/Component/Header";
import MainPage from "./MuseyScreens/Component/LandingPages/MainPage";
import FinalBoard from "./MuseyScreens/Component/UserDashBoard/FinalBoard";
import FeedBackBoard from "./MuseyScreens/Component/UserDashBoard/FeedBackBoard";
import RequestBoard from "./MuseyScreens/Component/UserDashBoard/ImageRequestBoard";
import AdvanceRender from "./MuseyScreens/Component/UserDashBoard/AdvanceRenderBoard";
import YourBoard from "./MuseyScreens/Component/UserDashBoard/YourBoard";
import UploadBoard from "./MuseyScreens/Component/UserDashBoard/UploadBoard";
import TestRenderingBoard from "./MuseyScreens/Component/UserDashBoard/TestRenderingBoard";
import AddImageBoard from "./MuseyScreens/Component/UserDashBoard/AddImageBoard";
import Forgot from "./Shared/Component/Forgot";
import EmailVerify from "./Shared/Component/EmailVerify"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* Other routes */}
          <Route path="/signup" element={<SignUp />} /> {/* Other routes */}
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/emailverified" element={<EmailVerify />} />
          <Route path="/yourboard" element={<YourBoard />} />
          <Route path="/uploadboard" element={<UploadBoard />} />
          <Route path="/addimage" element={<AddImageBoard />} />
          <Route path="/testrender" element={<TestRenderingBoard />} />
          <Route path="/advancerender" element={<AdvanceRender />} />
          <Route path="/requestboard" element={<RequestBoard />} />
          <Route path="/feedbackboard" element={<FeedBackBoard />} />
          <Route path="/finalboard" element={<FinalBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
