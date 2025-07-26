import React from "react";

const LiveQuestion = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerChange,
  onSubmit,
  submissionStatus
}) => {
  if (!question) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {questionNumber}
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {submissionStatus.submissions}/{submissionStatus.totalUsers} answered
        </span>
      </div>

      <div className="prose max-w-none">
        <p className="text-lg text-gray-800">{question.text}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={onAnswerChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`option-${index}`}
              className="ml-3 block text-gray-700"
            >
              {option.text}
            </label>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          onClick={onSubmit}
          disabled={selectedAnswer === null}
          className={`px-4 py-2 rounded-md text-white ${
            selectedAnswer === null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default LiveQuestion;