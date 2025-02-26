import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return (
    <button type="button" onClick={handleClick}>
      {text}
    </button>
  );
};

const Votes = ({ total }) => {
  return <div>has {total} votes</div>;
};

const Anecdote = ({ title, content, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
      <Votes total={votes} />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [highest, setHighest] = useState(0);

  const noteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    setHighest(Math.max(...copy));
  };

  const changeAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        content={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button text="note" handleClick={noteAnecdote} />
      <Button text="next anecdote" handleClick={changeAnecdote} />

      <Anecdote
        title="Anecdote with most votes"
        content={anecdotes[votes.findIndex((element) => element === highest)]}
        votes={highest}
      />
    </div>
  );
};

export default App;
