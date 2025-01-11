import "./Home.css";
import "../components/Quiz.css";
import Quiz from "../components/Quiz";
import PhotoWoman from "../img/illustrations/GreenIllustrated.png";

const Home = () => {
	return (
		<>
			<div className="upper-body">
				<div className="textes">
					<h2 className="green-path"> The green path </h2>
					<h3 className="find-spot">
						<br />
						Where Every Plant Find Its Spot
					</h3>
				</div>
				<img className="woman-ia" src={PhotoWoman} alt="green" />
			</div>

			<div className="home-container">
				<div className="first-paragraph">
					<h1>Who we are ?</h1>
					<p>
						The Plant Spot is a user-friendly online platform designed to help
						plant enthusiasts of all levels find the ideal houseplants for their
						homes, based on specific needs, preferences, and environmental
						conditions. Whether you're a seasoned plant parent or a beginner
						looking for your first indoor garden, The Plant Spot offers tailored
						recommendations to ensure your plants thrive in your unique space.
					</p>
				</div>
				<div className="quiz-container">
					<h2 className="quiz-title">Quiz</h2>
					<div className="quiz-section">
						<Quiz />
					</div>
				</div>
			</div>
			<div className="footer-line" />
		</>
	);
};

export default Home;
