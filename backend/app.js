require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
const QuizRoutes=require('./routes/QuizRoutes');
const errorHandler=require('./middlewares/errHandler');
const QuestionRoutes=require('./routes/QuestionRoutes');
const adminRoutes=require('./routes/AdminRoutes');
const joinRoutes=require('./routes/JoinRoutes');
const botRoutes=require('./routes/ChatbotRoutes');
const http = require("http");
const socketio = require("socket.io");
const socketIo = require("./socket");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const URL=process.env.MONGO_URL

const io = socketio(server, {
  cors: {
    origin: ["http://localhost:5173","https://quizz-self.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});

mongoose
  .connect(URL)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

  const corsOptions = {
    origin: ["https://quizz-self.vercel.app","http://localhost:5173"], 
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  
  
  app.use(errorHandler);
  app.use("/",QuizRoutes);
  app.use("/",QuestionRoutes);
  app.use("/",adminRoutes);
  app.use("/",joinRoutes);
  app.use("/",botRoutes);

  socketIo(io);

  server.listen(PORT, () =>
    console.log(`Server is running on this port... ${PORT} `)
)