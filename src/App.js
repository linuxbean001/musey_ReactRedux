import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Shared/Component/SignUp";
import Header from "./Shared/Component/Header";
import MainPage from "./MuseyScreens/Component/LandingPages/MainPage";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
