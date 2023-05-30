import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Shared/Component/SignUp";
import Header from "./Shared/Component/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
