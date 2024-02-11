import { useEffect } from "react";
import { useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((r) => setQuestions(r));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestions) => {
        const updateQuestions = questions.map((q) => {
          if (q.id === updatedQuestions.id) return updateQuestions;
          return q;
        });
        setQuestions(updateQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteClick={handleDelete}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
