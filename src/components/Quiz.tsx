import { useState } from "react";
import "./Quiz.css";
import { useQuiz } from "../contexts/QuizContext";

const Quiz = () => {
	const { setAnswers } = useQuiz();
	const questions = [
		{
			question: "Is your house well-lit?",
			options: ["Very well lit", "Moderately lit", "Poorly lit"],
		},
		{
			question: "Do you water your plants often?",
			options: [
				"Yes, I water them every day.",
				"No, I water them once a week.",
				"I water them whenever the soil feels dry.",
			],
		},
		{
			question: "Do you have large temperature fluctuations in your home?",
			options: [
				"Yes, the temperature varies a lot, especially between seasons.",
				"Sometimes, there are slight fluctuations, but it's generally manageable.",
				"No, the temperature in my home remains pretty stable throughout the year.",
			],
		},
		{
			question: "Do you like plants that grow quickly?",
			options: [
				"Yes, I love fast-growing plants! They’re so rewarding to watch.",
				"I don't mind them, but I also enjoy plants that grow more slowly.",
				"No, I prefer plants that grow at a slower, more manageable pace.",
			],
		},
		{
			question: "Do you like pruning your plants?",
			options: [
				"Yes, I enjoy it! It's satisfying to shape and maintain my plants.",
				"I don't mind doing it, but it's not something I particularly look forward to.",
				"No, I prefer to let my plants grow naturally without too much intervention",
			],
		},
	];

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [isStarted, setIsStarted] = useState(false);
	const [userAnswers, setUserAnswers] = useState<string[]>([]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const startQuiz = () => {
		setIsStarted(true);
	};

	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const prevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newAnswers = [...userAnswers];
		newAnswers[currentQuestionIndex] = event.target.value;
		setUserAnswers(newAnswers);
	};

	const handleSubmit = () => {
		setAnswers(userAnswers);
		setIsSubmitted(true);
	};

	const isAnswerSelected = userAnswers[currentQuestionIndex];

	return (
		<section className="quiz">
			{!isStarted && (
				<div className="welcomequiz">
					<p>
						Let’s start by some few questions about who you are and which plants
						could match with you?
					</p>
					<button type="button" onClick={startQuiz} className="start-button">
						Let's Go
					</button>
				</div>
			)}
			{isStarted && !isSubmitted && (
				<>
					<p>{questions[currentQuestionIndex].question}</p>

					<div className="buttonsquiz">
						<form>
							{questions[currentQuestionIndex].options.map((option) => (
								<div key={option}>
									<input
										type="radio"
										id={`question-${currentQuestionIndex}-option-${option}`}
										name={`question-${currentQuestionIndex}`}
										value={option}
										checked={userAnswers[currentQuestionIndex] === option}
										onChange={handleAnswerChange}
										disabled={isSubmitted}
									/>
									<label
										htmlFor={`question-${currentQuestionIndex}-option-${option}`}
									>
										{option}
									</label>
								</div>
							))}
						</form>

						<div className="buttonnav">
							<button
								type="button"
								onClick={prevQuestion}
								disabled={currentQuestionIndex === 0}
							>
								Précédent
							</button>
							<button
								type="button"
								onClick={
									currentQuestionIndex === questions.length - 1
										? handleSubmit
										: nextQuestion
								}
								disabled={!isAnswerSelected}
							>
								{currentQuestionIndex === questions.length - 1
									? "Confirmer"
									: "Suivant"}
							</button>
						</div>
					</div>
				</>
			)}

			{isSubmitted && (
				<div>
					<h2>Quiz completed!</h2>
					<p>Thank you for completing the quiz.</p>
				</div>
			)}
		</section>
	);
};

export default Quiz;
