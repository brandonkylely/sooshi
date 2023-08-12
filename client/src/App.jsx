import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/feed" element={<FeedPage/>} />
        </Routes>
      </Router>
  );
}

export default App;