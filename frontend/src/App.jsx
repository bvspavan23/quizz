import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import HomePage from "./components/Quiz/Home";
import Login from "./components/Quiz/Login";
import Register from "./components/Quiz/Register";
import QuizTest from "./components/Quiz/QuizTest.jsx";
import Join from "./components/Quiz/Join.jsx";
import PrivateNav from "./components/Nav/PrivateNav";
import Navbar from "./components/Nav/Navbar";
import AuthRoute from './components/Auth/AuthRoute.jsx';
import QuizList from "./components/Quiz/QuizList.jsx";
import AddQuiz from "./components/Quiz/AddQuiz.jsx";
import ManageQuiz from "./components/Quiz/ManageQuiz.jsx";
import HostQuiz from "./components/RealTime/HostQuiz.jsx";
import Leaderboard from "./components/Quiz/LeaderBoard.jsx";
import Update from "./components/Quiz/Update.jsx";
import End from "./components/Quiz/End.jsx";
// import Compiler from "./components/Compiler.jsx";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  // useEffect(() => {
  //   dispatch(eventlistApi());
  // }, [dispatch]);

  return (
    <Router>
      {user ? <PrivateNav /> : <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes/login" element={<Login />} />
        <Route path="/quizzes/register" element={<Register />} />
        <Route path="/quizzes/:id/:joinId/:roomId" element={<QuizTest />} />
        <Route path="/quizzes/join-quizz" element={<Join />} />
        {/* <Route path="/chat-bot" element={<ChatBot />} /> */}
        <Route path="/quiz/end" element={<End/>} />
        <Route
          path="/:id/admin/quizzes"
          element={
            <AuthRoute>
              <QuizList />
            </AuthRoute>
          }
        />
        <Route
          path="/create-quizz"
          element={
            <AuthRoute>
              <AddQuiz />
            </AuthRoute>
          }
        />
        <Route
          path="/quiz/update/:id"
          element={
            <AuthRoute>
              <Update/>
            </AuthRoute>
          }
        />
        <Route
          path="/manage/quiz/:id"
          element={
            <AuthRoute>
              <ManageQuiz />
            </AuthRoute>
          }
        />
        <Route
          path="/host-quiz/:roomId/:id"
          element={
            <AuthRoute>
              <HostQuiz/>
            </AuthRoute>
          }
        />
        <Route
          path="/quizzes/leaderboard/:QuizId"
          element={
            <AuthRoute>
              <Leaderboard/>
            </AuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
