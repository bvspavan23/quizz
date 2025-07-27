import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getQuizByIdAPI } from "../../services/quizzes/QuizServices";
import { getPublicQuestionByIdAPI } from "../../services/quizzes/QuestionServices";
import { submitAPI } from "../../services/quizzes/JoinServices";
import Panel from "./Panel";
import Question from "./Question";
import LiveQuestion from "./LiveQuestion";

const QuizTest = () => {
  const { id, joinId, roomId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Live quiz specific states
  const [socket, setSocket] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState({
    totalUsers: 0,
    submissions: 0
  });
  const [quizMembers, setQuizMembers] = useState([]);

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        const quizResponse = await getQuizByIdAPI(id);
        setQuiz(quizResponse);
        
        if (quizResponse.isRealtime) {
          // Initialize socket connection for live quiz
          const socketInstance = io("https://quizz-9oua.onrender.com");
          setSocket(socketInstance);

          // Set up event listeners for live quiz
          socketInstance.on("show-question", (data) => {
            setCurrentQuestion(data.question);
            setCurrentQuestionIndex(data.index);
            setSelectedAnswer(null);
          });

          socketInstance.on("submission-status", (data) => {
            setSubmissionStatus(data);
          });

          socketInstance.on("room-users", (users) => {
            setQuizMembers(users);
          });
        } else {
          // Regular quiz flow
          const questionIds = quizResponse.questions;
          const questionsPromises = questionIds.map((questionId) =>
            getPublicQuestionByIdAPI(questionId)
          );
          const questionsResponses = await Promise.all(questionsPromises);
          const questionsData = questionsResponses.map((res) => res);
          setQuestions(questionsData);
          setVisitedQuestions(new Set([0]));
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuizAndQuestions();

    return () => {
      if (socket) socket.disconnect();
    };
  }, [id, roomId]);

  // Regular quiz handlers
  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions((prev) => new Set(prev).add(index));
  };

  const handleAnswerChange = (e) => {
    if (quiz?.isRealtime) {
      setSelectedAnswer(parseInt(e.target.value));
    } else {
      const { value } = e.target;
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: parseInt(value),
      }));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setVisitedQuestions((prev) => new Set(prev).add(currentQuestionIndex - 1));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setVisitedQuestions((prev) => new Set(prev).add(currentQuestionIndex + 1));
    }
  };

  const handleSubmit = async () => {
    if (quiz?.isRealtime) {
      if (socket && selectedAnswer !== null) {
        socket.emit("submit-answer", { roomId });
      }
    } else {
      setIsSubmitting(true);
      try {
        const questionIds = quiz.questions;
        const formattedAnswers = questionIds.map((questionId, index) => ({
          questionId: questionId,
          chosenOptions: answers[index] !== undefined ? 
            [answers[index]] :
            []
        }));

        const submissionData = {
          joinId: joinId,
          answers: formattedAnswers
        };
        
        const response = await submitAPI(submissionData);
        navigate(`/quiz/${id}/results`, { state: { result: response } });
      } catch (error) {
        console.error("Submission error:", error);
        setError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading quiz...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (!quiz) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quiz Not Found</h2>
        <p className="text-gray-600">The requested quiz could not be found.</p>
      </div>
    </div>
  );

  if (quiz.isRealtime) {
    // Live quiz rendering
    if (!currentQuestion) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Waiting for quiz to start...
            </p>
            <p className="mt-2 text-gray-600">
              {quizMembers.length} participants in room
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        {/* Side Panel */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-md p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-800">Live Quiz</h1>
            <p className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {submissionStatus.submissions}/{submissionStatus.totalUsers} answered
            </p>
          </div>
          
          <Panel
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            visitedQuestions={new Set([currentQuestionIndex])}
            answers={{}}
            onQuestionSelect={() => {}}
          />
        </div>
        
        {/* Main Question Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
            <LiveQuestion
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={selectedAnswer}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleSubmit}
              submissionStatus={submissionStatus}
            />
          </div>
        </div>
      </div>
    );
  } else {
    // Regular quiz rendering
    if (questions.length === 0) return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">No Questions</h2>
          <p className="text-gray-600">This quiz doesn't contain any questions yet.</p>
        </div>
      </div>
    );

    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        {/* Side Panel */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-md p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-800 truncate">{quiz.title}</h1>
            <p className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          <Panel
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            visitedQuestions={visitedQuestions}
            answers={answers}
            onQuestionSelect={handleQuestionSelect}
            progress={(Object.keys(answers).length / questions.length) * 100}
          />
        </div>
        
        {/* Main Question Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
            <Question
              question={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={answers[currentQuestionIndex]}
              onAnswerChange={handleAnswerChange}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === questions.length - 1}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default QuizTest;