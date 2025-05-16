import React, { useState, useEffect } from 'react';

const sampleQuestions = [
  {
    question: "What does 'Minga' mean?",
    correctAnswer: "A community gathering",
    options: ["A dance", "A river", "A community gathering", "A greeting"],
  },
  {
    question: "Translate 'Hello' in Quechua",
    correctAnswer: "Rimaykullayki",
    options: ["Hola", "Rimaykullayki", "Namaste", "Sannu"],
  },
];

function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selected) => {
    if (selected === sampleQuestions[index].correctAnswer) {
      setScore(score + 1);
    }

    if (index + 1 < sampleQuestions.length) {
      setIndex(index + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {!showResult ? (
        <>
          <h2>{sampleQuestions[index].question}</h2>
          {sampleQuestions[index].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              style={{ display: 'block', margin: '10px 0' }}
            >
              {opt}
            </button>
          ))}
        </>
      ) : (
        <h3>Your Score: {score} / {sampleQuestions.length}</h3>
      )}
    </div>
  );
}

export default Quiz;
