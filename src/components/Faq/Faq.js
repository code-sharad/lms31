import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Faq() {
  const [selected, setSelected] = useState(null);
  const [likes, setLikes] = useState(Array(5).fill(0)); // Assuming 5 questions

  const questions = [
    {
      id: 1,
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, simply go to the course page and click on the 'Enroll Now' button.",
    },
    {
      id: 2,
      question: "Can I access course materials offline?",
      answer: "Yes, you can download course materials for offline access. Look for the download option on the course page.",
    },
    {
      id: 3,
      question: "How can I reset my password?",
      answer: "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the instructions to reset your password.",
    },
    {
      id: 4,
      question: "Do you offer refunds for courses?",
      answer: "Refund policies vary depending on the course. Please refer to the course details page for information about refunds.",
    },
    {
      id: 5,
      question: "Is technical support available for students?",
      answer: "Yes, we provide technical support to our students. You can reach out to our support team via email or chat for assistance.",
    },
  ];

  const toggleQuestion = (index) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index]++;
    setLikes(newLikes);
  };

  return (
    <div className="max-w-7xl text-2xl ml-32 mt-4 mb-20">
        <h1 className='text-center text-4xl text-cyan-400 mb-20'>FAQ</h1>
      {questions.map((faq, index) => (
        <div key={faq.id} className="mb-4">
          <div
            className="text-white px-4 py-2 flex justify-between  items-center cursor-pointer rounded-md"
            onClick={() => toggleQuestion(index)}
          >
            <p className="text-lg font-medium">{faq.question}</p>
            <div className="flex items-center">
              <button
                className="focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(index);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-10 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18l-1.225-1.12C4.637 13.454 2 10.346 2 6.5 2 3.463 4.462 1 7.5 1c1.582 0 3.033.803 4 2.09C11.467 1.802 12.918 1 14.5 1 17.538 1 20 3.463 20 6.5c0 3.846-2.637 6.954-6.775 10.38L10 18z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1">{likes[index]}</span>
              </button>
            </div>
          </div>
          {selected === index && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
              className="bg-cyan-200  px-4 py-2 mt-2 rounded-md"
            >
              <p className="text-black">{faq.answer}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
