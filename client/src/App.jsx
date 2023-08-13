import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import PostPage from "./pages/PostPage";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/feed" element={<FeedPage/>} />
          <Route path="/post" element={<PostPage/>} />
        </Routes>
      </Router>
  );
}

export default App;