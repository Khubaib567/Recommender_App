import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import ReactCardFlip from "react-card-flip";
import "./App.css";
import BarChart from "./components/BarChart";


export default function App() {
	const questions = [
		{
			questionText: 'Little interest or pleasure in doing things?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
		{
			questionText: 'Feeling down, depressed, or hopeless?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
		{
			questionText: 'Trouble falling or staying asleep, or sleeping too much?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
		{
			questionText: 'Feeling tired or having little energy?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
		{
			questionText: 'Poor appetite or overeating?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
		{
			questionText: 'Feeling bad about yourself or that you are a failure or have let yourself or your family down?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
		{
			questionText: 'Trouble concentrating on things, such as reading the newspaper or watching television?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
		{
			questionText: 'Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
		{
			questionText: 'Thoughts that you would be better off dead, or of hurting yourself?',
			answerOptions: [
				{ answerText: 'Not at all',label:0},
				{ answerText: 'Several days',label:1},
				{ answerText: 'More than half the days',label:2},
				{ answerText: 'Nearly every day',label:3},
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [data,setdata] = useState([]);
	const [flip,setflip] = useState(false);
	const [userData, setUserData] = useState({
		labels: ["Depression level", "Anxiety level"],
		datasets: [{ 
				data:[27],
				label: "Depression",
				borderColor: "black",
	  			borderWidth: 2,
				backgroundColor: "rgba(75,192,192,1)",
				fill: false,
				
		},
			{ 
				data:[0,20],
				label: "Anxiety",
				borderColor: "black",
	  			borderWidth: 2,
				backgroundColor: "#ecf0f1",
				fill: false,
			
			} 
  		]
	}
);

	const setData = () =>{

		// event.preventDefault(); //Prevent the default behaivior of web page
		const userScore = {
			score:score
		}
		//for giving the data to the server.
		axios.post('http://localhost:4000/setscore',userScore)
			.then(response => {
				console.log(response.data)
			}) // it will give the response as object.

	}

	const getData = () =>{

		// for accessing the data from the server.
	axios.get('http://localhost:4000/predict')
	.then(response => {
		const result=response.data;
		setdata(result);
		console.log(result);
				
	})
}

	

	const handleAnswerOptionClick = (label) => {
		if (label > 0){
			setScore(score => score + label );
			
		}
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		}
		else{	
			setData()
			setInterval(function(){setShowScore(true)},10000);
			getData()

		}
		
	};
	
	const handleClick = () => {
		setflip(!flip);
	};

	return (
		<div className='app'>
			{showScore ? (
					<ReactCardFlip isFlipped={flip} flipDirection="vertical">
					<div className='score-section'>
        			<center><h3>{data}</h3></center>
					<br />
					<button type="submit" onClick={handleClick}>Click to see the BarChart!</button>
					</div>
					<div className='result-section'>
					<BarChart chartData={userData} />
					<button type="submit" onClick={handleClick}>Click to see the Result!</button>
					</div>
					</ReactCardFlip>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.label)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
