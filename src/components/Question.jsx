import {useState, useEffect} from "react";

export default function Question() {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);

  useEffect (() => {
    const getQuestion = async () => {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=1&type=boolean"
      );
      let data = await response.json();
      //console.log(data);
      setCategory(data.results[0].category);
      setQuestion(data.results[0].question);
      setAnswer(data.results[0].correct_answer);
    }
    getQuestion();
  }, [])

  //conditional rendering
  function handleClick(e) {
    e.preventDefault();
    setRevealed(true);
  }
  let answerResult = <div></div>;
  if (revealed === true) {
    answerResult = <div className="answer"><em>{answer}</em></div>;
  }

  return (
    <div>
      <div>{category}</div>
      <h3>{question}</h3>
      {answerResult}
      <button onClick={handleClick} type="button">Reveal Answer</button>
    </div>
  )
}