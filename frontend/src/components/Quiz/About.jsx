import { motion } from "framer-motion";

const About = () => {
  const quizTypes = [
    {
      title: "Normal Quizzes",
      description: "Traditional quiz experience where participants can take quizzes at their own pace. Answer questions, submit responses, and get instant feedback on your performance.",
      features: [
        "Self-paced learning environment",
        "Instant score calculation",
        "Review answers after submission",
        "Multiple attempts allowed",
        "Various quiz categories"
      ],
      icon: "📝"
    },
    {
      title: "Real-time Quizzes",
      description: "Interactive live quiz sessions hosted by quiz masters. Experience the thrill of competing with other participants in real-time!",
      features: [
        "Live host-controlled questions",
        "Synchronized question display",
        "Real-time participant tracking",
        "Interactive leaderboard updates",
        "Dynamic quiz progression"
      ],
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 font-baloo">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.section
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About QuizMaster Pro
          </motion.h1>

          <motion.p
            className="text-xl text-gray-700 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Welcome to QuizMaster Pro, where learning meets excitement! Our platform offers two unique ways to engage with quizzes: traditional self-paced quizzes and dynamic real-time quiz experiences.
          </motion.p>
        </motion.section>

        {/* Quiz Types Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {quizTypes.map((type, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20"
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.8 }}
            >
              <div className="text-5xl mb-4">{type.icon}</div>
              <h2 className="text-3xl font-bold mb-4 text-indigo-700">{type.title}</h2>
              <p className="text-gray-700 mb-6">{type.description}</p>
              <div className="space-y-3">
                {type.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center text-gray-600">
                    <span className="text-indigo-500 mr-2">•</span>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information Section */}
        <motion.section
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Normal Quizzes</h3>
              <p className="text-white/90">
                Our traditional quiz format allows you to challenge yourself at your own pace. Browse through various categories, select a quiz, and start answering questions. Each quiz has a set time limit, and you'll receive immediate feedback upon submission. Perfect for self-assessment and learning!
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Real-time Experience</h3>
              <p className="text-white/90">
                In real-time quizzes, a host controls the flow of questions, creating an engaging and competitive atmosphere. All participants see the same question simultaneously, and the host manages when to proceed to the next question. This format is ideal for classroom settings, team building events, or any group activity where synchronized participation adds to the excitement!
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
