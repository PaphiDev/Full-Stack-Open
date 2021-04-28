import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    // render course name
    return <h1>{props.course}</h1>;
};

const Content = (props) => {
    // render course names & num of assignments
    const p = props.parts;
    return (
        <div>
            <Part part={p[0]} />
            <Part part={p[1]} />
            <Part part={p[2]} />
        </div>
    );
};

const Part = (props) => {
    // return course name & num of assignments to Content
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
};

const Total = (props) => {
    // returns exercises total
    let sum = 0;
    const total = props.total;
    for (let i = 0; i < total.length; i++) {
        sum += total[i].exercises;
    }
    return <p> {sum} </p>;
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
