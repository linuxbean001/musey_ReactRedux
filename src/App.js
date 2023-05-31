import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Shared/Component/SignUp";
import Header from "./Shared/Component/Header";
import MainPage from "./MuseyScreens/Component/LandingPages/MainPage";
import FinalBoard from "./MuseyScreens/Component/Activity/FinalBoard";
import FeedBackBoard from "./MuseyScreens/Component/Activity/FeedBackBoard";
import RequestBoard from "./MuseyScreens/Component/Activity/ImageRequestBoard";
import AdvanceRender from "./MuseyScreens/Component/Activity/AdvanceRenderBoard";
import YourBoard from "./MuseyScreens/Component/Activity/YourBoard";
import UploadBoard from "./MuseyScreens/Component/Activity/UploadBoard";
import TestRenderingBoard from "./MuseyScreens/Component/Activity/TestRenderingBoard";
import AddImageBoard from "./MuseyScreens/Component/Activity/AddImageBoard";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
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
