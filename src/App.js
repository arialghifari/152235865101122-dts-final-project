import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import ChapterInfo from "./containers/ChapterInfo.js";
import ChapterDetail from "./containers/ChapterDetail.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Search from "./containers/Search";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App container mx-auto px-3">
      <Header />
      <div className="mt-24" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:chapter"
          element={
            <ProtectedRoute>
              <ChapterInfo />
            </ProtectedRoute>
          }
        />
        <Route path="/:chapter/:verse" element={<ChapterDetail />} />
        <Route path="/search/:query/:page" element={<Search />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute loginOnlyPage={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute loginOnlyPage={false}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<>404 Not Found</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
