import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text} </button>;

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const votesCopy = [...votes ];
    
    const VotesUpdate = () => {
        votesCopy[selected]++;
        setVotes(votesCopy);
    };
    
    const i = votes.indexOf(Math.max(...votes));
    
    return (
        <div>
            <h1>Anecdote Of The Day</h1>
            {anecdotes[selected]}
            <p>The anecdote has {votes[selected]} votes</p>
            <br />
            <Button handleClick={VotesUpdate} text="Vote" />
            <Button
                handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
                text="New Anecdote"
            />

            <h1>Anecdote With Most Votes</h1>
            {anecdotes[i]}
            <p>has {votes[i]} votes</p>
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
