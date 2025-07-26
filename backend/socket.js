const socketIo = (io) => {
  const quizMembers = {};
  const currentQuestionIndex = {};
  const submittedAnswers = {};
  const questionList = {};

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("join-room", ({ name, roomId }) => {
      if (!name || !roomId) return;
      socket.join(roomId);
      if (!quizMembers[roomId]) quizMembers[roomId] = [];
      quizMembers[roomId] = quizMembers[roomId].filter(
        (p) => p.socketId !== socket.id
      );
      const existingUserIndex = quizMembers[roomId].findIndex(
        (p) => p.name === name
      );
      if (existingUserIndex === -1) {
        quizMembers[roomId].push({ name, socketId: socket.id });
        console.log(`${name} joined room ${roomId}`);
        io.to(roomId).emit("user-joined", { name, action: "joined" });
      } else {
        quizMembers[roomId][existingUserIndex].socketId = socket.id;
        console.log(`${name} reconnected to room ${roomId}`);
      }
      io.to(roomId).emit("room-users", quizMembers[roomId]);
    });

    // Admin sends the questions list
    socket.on("init-questions", ({ roomId, questions }) => {
      if (!roomId || !questions || !Array.isArray(questions)) return;
      questionList[roomId] = questions;
      currentQuestionIndex[roomId] = -1;
      submittedAnswers[roomId] = {};
      console.log(`Questions initialized for room ${roomId}`);
    });

    socket.on("start-quiz", ({ roomId }) => {
      if (!roomId || !questionList[roomId]) return;
      currentQuestionIndex[roomId] = 0;
      submittedAnswers[roomId][0] = new Set();
      const question = questionList[roomId][0];
      DisplayQuestion(roomId);
      console.log(`Quiz started in room ${roomId}`);
    });

    // Admin moves to next question
    socket.on("next-question", ({ roomId }) => {
      if (!roomId || !questionList[roomId]) return;
      const currentIndex = currentQuestionIndex[roomId];
      if (currentIndex + 1 < questionList[roomId].length) {
        currentQuestionIndex[roomId]++;
        const nextIndex = currentQuestionIndex[roomId];
        submittedAnswers[roomId][nextIndex] = new Set();
        DisplayQuestion(roomId);
        console.log(`Next question in room ${roomId}`);
      }
    });

    // Admin moves to previous question
    socket.on("prev-question", ({ roomId }) => {
      if (!roomId || !questionList[roomId]) return;
      const currentIndex = currentQuestionIndex[roomId];
      if (currentIndex - 1 >= 0) {
        currentQuestionIndex[roomId]--;
        DisplayQuestion(roomId);
        console.log(`Previous question in room ${roomId}`);
      }
    });

    // User submits answer
    socket.on("submit-answer", ({ roomId }) => {
      if (!roomId || currentQuestionIndex[roomId] === undefined) return;
      const index = currentQuestionIndex[roomId];
      if (!submittedAnswers[roomId][index]) {
        submittedAnswers[roomId][index] = new Set();
      }
      submittedAnswers[roomId][index].add(socket.id);
      DisplaySubmissions(roomId);
    });

    socket.on("Quiz-disconnect", () => {
      console.log("User Quiz-disconnected:", socket.id);
      for (const roomId in quizMembers) {
        const index = quizMembers[roomId].findIndex(
          (p) => p.socketId === socket.id
        );
        if (index !== -1) {
          const [removed] = quizMembers[roomId].splice(index, 1);
          io.to(roomId).emit("user-left", {
            name: removed.name,
            action: "left",
          });
          io.to(roomId).emit("room-users", quizMembers[roomId]);
        }

        // Also remove from submission list
        const currentIndex = currentQuestionIndex[roomId];
        if (submittedAnswers[roomId]?.[currentIndex]) {
          submittedAnswers[roomId][currentIndex].delete(socket.id);
          DisplaySubmissions(roomId);
        }
      }
    });

    // Admin ends the quiz
socket.on("end-quiz", ({ roomId }, callback) => {
  // Broadcast to all participants in the room
  io.to(roomId).emit("quiz-ended");
  if (callback) callback({ success: true });
});
    function DisplayQuestion(roomId) {
      const index = currentQuestionIndex[roomId];
      const question = questionList[roomId]?.[index];

      console.log(`Displaying question for room ${roomId}:`, {
        index,
        question,
        members: quizMembers[roomId]?.length,
        currentIndex: currentQuestionIndex[roomId],
      });

      if (!question) {
        console.error("No question found for index", index);
        return;
      }

      io.to(roomId).emit("show-question", {
        index,
        question: {
          ...question,
          // Ensure consistent structure
          id: question._id || question.id,
          options: question.options || [],
        },
      });

      console.log(`Question ${index} emitted to room ${roomId}`);
    }

    function DisplaySubmissions(roomId) {
      const index = currentQuestionIndex[roomId];
      const totalUsers = quizMembers[roomId]?.length || 0;
      const submissions = submittedAnswers[roomId]?.[index]?.size || 0;
      io.to(roomId).emit("submission-status", {
        totalUsers,
        submissions,
      });
    }
  });
};

module.exports = socketIo;
