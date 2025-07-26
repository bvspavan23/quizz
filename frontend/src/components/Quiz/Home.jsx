import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => {
  const quizFeatures = [
    {
      title: "Engaging Quizzes",
      description: "Test your knowledge with our interactive quizzes",
      icon: "🧠"
    },
    {
      title: "Real-time Results",
      description: "Get instant feedback on your performance",
      icon: "⚡"
    },
    {
      title: "Diverse Categories",
      description: "From tech to trivia, we've got it all",
      icon: "🌐"
    },
    {
      title: "Compete with Friends",
      description: "Challenge others and climb the leaderboard",
      icon: "🏆"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 font-baloo">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-100/50"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.3
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              transition: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.section 
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            QuizMaster Pro
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Challenge yourself with our interactive quiz platform. Learn, compete, and have fun!
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link 
              to="/quizzes/login"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
            <Link 
              to="/quizzes/register"
              className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Create Account
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose QuizMaster?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quizFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:border-indigo-200/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-indigo-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who are improving their skills with our quizzes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/quizzes/login"
                className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Login Now
              </Link>
              <Link 
                to="/quizzes/register"
                className="px-8 py-4 bg-indigo-800 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Floating Quiz Cards Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/30 backdrop-blur-sm rounded-xl shadow-md border border-white/20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 150 + 100,
              rotate: Math.random() * 20 - 10
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.5
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              transition: {
                duration: Math.random() * 40 + 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;