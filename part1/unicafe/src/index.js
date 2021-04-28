import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = ((good - bad) / total).toFixed(2) || 0;
    const positive = ((good * 100) / total).toFixed(2) || 0;

    if (total === 0) {
        return <p>No feedback given</p>;
    } else {
        return (
            <table>
                <tbody>
                    <Statistic text="Good" value={good} />
                    <Statistic text="Neutral" value={neutral} />
                    <Statistic text="Bad" value={bad} />
                    <Statistic text="Total" value={total} />
                    <Statistic text="Average" value={average} />
                    <Statistic text="Positive" value={positive + ' %'} />
                </tbody>
            </table>
        );
    }
};

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>Provide Feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />

            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
