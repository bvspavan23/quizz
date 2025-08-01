import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "./Quizz";
import { getQuizesAPI } from "../../services/quizzes/QuizServices";
import { setquizAction } from "../../redux/slice/quizSlice";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const QuizList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminId } = useParams();
  const quizzes = useSelector((state) => state.quiz?.quizzes || []);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Check if user is authenticated
        const token = getUserFromStorage();
        if (!token) {
          navigate('/quizzes/login');
          return;
        }

        if (!adminId) {
          throw new Error("Admin ID is required");
        }

        setLoading(true);
        const response = await getQuizesAPI(adminId);
        console.log("API RESPONSE:", response);
        
        if (!response || !response.quizzes) {
          throw new Error("No quizzes data received");
        }

        const quizData = response.quizzes;
        if (!Array.isArray(quizData)) {
          throw new Error("Invalid data format received from API");
        }

        dispatch(setquizAction(quizData));
      } catch (err) {
        console.error("Fetch quizzes error:", err);
        if (err.response?.status === 401) {
          setError("Please login to view your quizzes");
          navigate('/quizzes/login');
        } else {
          setError(err.message || "Failed to fetch quizzes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [dispatch, navigate, adminId]);

  const handleHostQuiz = (quizCode, quizId) => {
    navigate(`/host-quiz/${quizCode}/${quizId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Quizzes</h1>
      
      {quizzes.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-[0.5rem]">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="w-full max-w-2xl">
              <Quiz
                id={quiz.id}
                name={quiz.name || "Unnamed Quiz"}
                quizCode={quiz.quizcode || "N/A"}
                startDate={quiz.startdate}
                endDate={quiz.enddate}
                startTime={quiz.starttime}
                endTime={quiz.endtime}
                maxPoints={quiz.maxpoints || 0}
                duration={quiz.duration || 30}
              />
              {quiz.isRealtime && (
                <button
                  onClick={() => handleHostQuiz(quiz.quizcode, quiz.id)}
                  className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                >
                  Host Quiz
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No quizzes available yet!</p>
          <p className="text-gray-400 mt-2">Create your first quiz to get started</p>
        </div>
      )}
    </div>
  );
};

export default QuizList;