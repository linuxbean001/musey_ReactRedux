import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Shared/Component/SignUp";
import Header from "./Shared/Component/Header";
import MainPage from "./MuseyScreens/Component/LandingPages/MainPage";
import FinalBoard from "./MuseyScreens/Component/Activity/FinalBoard";
import FeedBackBoard from "./MuseyScreens/Component/Activity/FeedBackBoard";
import RequestBoard from "./MuseyScreens/Component/Activity/ImageRequestBoard";
import AdvanceRender from "./MuseyScreens/Component/Activity/AdvanceRenderBoard";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/> 
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/final_board" element={<FinalBoard/>} />
          <Route path="/feedback_board" element={<FeedBackBoard/>}/>
          <Route path="/request_board" element={<RequestBoard/>}/>
          <Route path="/advance_render" element={<AdvanceRender/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
