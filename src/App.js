import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Shared/Component/SignUp";
import Header from "./Shared/Component/Header";
import MainPage from "./MuseyScreens/Component/LandingPages/MainPage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/> 
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
