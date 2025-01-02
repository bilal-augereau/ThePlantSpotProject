import { useCallback, useEffect, useState } from "react";
import {
	calculateAverageDifficulty,
	getGrowthDifficulty,
	getLightDifficulty,
	getPruningDifficulty,
	getTemperatureDifficulty,
	getWateringDifficulty,
} from "./PlantList";
import "./Filterssliders.css";
import { useQuiz } from "../contexts/QuizContext";
import type { Plant } from "../pages/Search";

const Filterssliders = ({
	plants,
	setDisplayedPlants,
}: {
	plants: Plant[];
	setDisplayedPlants: (plants: Plant[]) => void;
}) => {
	const { answers } = useQuiz();

	const [valueToleredlight, setValueToleredlight] = useState<number>(0);
	const [valueWatering, setValueWatering] = useState<number>(0);
	const [valueTemperaturerange, setValueTemperaturerange] = useState<number>(0);
	const [valueGrowth, setValueGrowth] = useState<number>(0);
	const [valuePruning, setValuePruning] = useState<number>(0);

	const [interactedToleredlight, setInteractedToleredlight] =
		useState<boolean>(false);
	const [interactedWatering, setInteractedWatering] = useState<boolean>(false);
	const [interactedTemperaturerange, setInteractedTemperaturerange] =
		useState<boolean>(false);
	const [interactedGrowth, setInteractedGrowth] = useState<boolean>(false);
	const [interactedPruning, setInteractedPruning] = useState<boolean>(false);

	const choicesToleredlight = [
		"",
		"Diffuse light ( Less than 5,300 lux / 500 fc)",
		"Strong light ( 21,500 to 3,200 lux/2000 to 300 fc)",
		"Full sun (+21,500 lux /+2000 fc )",
	];

	const choicesWatering = [
		"",
		"Keep moist between watering & Must not dry between watering",
		"Water when soil is half dry & Can dry between watering",
		"Change water regularly in the cup & Water when soil is half dry",
	];

	const choicesTemperaturerange = ["", "Small", "Middle", "Long"];

	const choicesGrowth = ["", "Slow", "Regular", "Fast"];

	const choicesPruning = ["", "Never", "After blooming", "If needed"];

	// Associer les réponses du quiz aux sliders
	useEffect(() => {
		if (answers.length > 0) {
			setValueToleredlight(
				answers[0] === "Very well lit"
					? 3
					: answers[0] === "Moderately lit"
						? 2
						: 1,
			);

			setValueWatering(
				answers[1] === "Yes, I water them every day."
					? 1
					: answers[1] === "No, I water them once a week."
						? 2
						: 3,
			);

			setValueTemperaturerange(
				answers[2] ===
					"Yes, the temperature varies a lot, especially between seasons."
					? 1
					: answers[2] ===
							"Sometimes, there are slight fluctuations, but it's generally manageable."
						? 2
						: 1,
			);

			setValueGrowth(
				answers[3] ===
					"Yes, I love fast-growing plants! They’re so rewarding to watch."
					? 3
					: answers[3] ===
							"I don't mind them, but I also enjoy plants that grow more slowly."
						? 2
						: 1,
			);

			setValuePruning(
				answers[4] ===
					"Yes, I enjoy it! It's satisfying to shape and maintain my plants."
					? 3
					: answers[4] ===
							"I don't mind doing it, but it's not something I particularly look forward to."
						? 2
						: 1,
			);

			setInteractedToleredlight(true);
			setInteractedWatering(true);
			setInteractedTemperaturerange(true);
			setInteractedGrowth(true);
			setInteractedPruning(true);
		}
	}, [answers]);

	// Fonction de filtrage des plantes
	const filterPlants = useCallback(() => {
		return plants.filter((plant) => {
			let lightMatch = true;
			let wateringMatch = true;
			let tempMatch = true;
			let growthMatch = true;
			let pruningMatch = true;

			if (interactedToleredlight && valueToleredlight !== 0) {
				lightMatch =
					getLightDifficulty(plant["Light tolered"]) === valueToleredlight;
			}
			if (interactedWatering && valueWatering !== 0) {
				wateringMatch = getWateringDifficulty(plant.Watering) === valueWatering;
			}
			if (interactedTemperaturerange && valueTemperaturerange !== 0) {
				tempMatch =
					getTemperatureDifficulty(
						plant["Temperature min"].C,
						plant["Temperature max"].C,
					) === valueTemperaturerange;
			}
			if (interactedGrowth && valueGrowth !== 0) {
				growthMatch = getGrowthDifficulty(plant.Growth) === valueGrowth;
			}
			if (interactedPruning && valuePruning !== 0) {
				pruningMatch = getPruningDifficulty(plant.Pruning) === valuePruning;
			}

			return (
				lightMatch && wateringMatch && tempMatch && growthMatch && pruningMatch
			);
		});
	}, [
		plants,
		valueToleredlight,
		valueWatering,
		valueTemperaturerange,
		valueGrowth,
		valuePruning,
		interactedToleredlight,
		interactedWatering,
		interactedTemperaturerange,
		interactedGrowth,
		interactedPruning,
	]);

	useEffect(() => {
		const filtered = filterPlants();
		setDisplayedPlants(filtered);
	}, [filterPlants, setDisplayedPlants]);

	// Réinitialiser tous les sliders
	const resetFilters = () => {
		setValueToleredlight(0);
		setValueWatering(0);
		setValueTemperaturerange(0);
		setValueGrowth(0);
		setValuePruning(0);

		setInteractedToleredlight(false);
		setInteractedWatering(false);
		setInteractedTemperaturerange(false);
		setInteractedGrowth(false);
		setInteractedPruning(false);
	};

	return (
		<div className="sliders-container">
			<div className="slideritem">
				<h3>Tolered Light</h3>
				<input
					type="range"
					min="0"
					max="3"
					className={`slider ${interactedToleredlight ? "active" : "inactive"}`}
					value={valueToleredlight}
					onChange={(e) => {
						setValueToleredlight(Number(e.target.value));
						setInteractedToleredlight(true);
					}}
				/>
				<p>
					<strong>{choicesToleredlight[valueToleredlight]}</strong>
				</p>
			</div>

			<div className="slideritem">
				<h3>Watering</h3>
				<input
					type="range"
					min="0"
					max="3"
					className={`slider ${interactedWatering ? "active" : "inactive"}`}
					value={valueWatering}
					onChange={(e) => {
						setValueWatering(Number(e.target.value));
						setInteractedWatering(true);
					}}
				/>
				<p>
					<strong>{choicesWatering[valueWatering]}</strong>
				</p>
			</div>

			<div className="slideritem">
				<h3>Temperature Range</h3>
				<input
					type="range"
					min="0"
					max="3"
					className={`slider ${interactedTemperaturerange ? "active" : "inactive"}`}
					value={valueTemperaturerange}
					onChange={(e) => {
						setValueTemperaturerange(Number(e.target.value));
						setInteractedTemperaturerange(true);
					}}
				/>
				<p>
					<strong>{choicesTemperaturerange[valueTemperaturerange]}</strong>
				</p>
			</div>

			<div className="slideritem">
				<h3>Growth</h3>
				<input
					type="range"
					min="0"
					max="3"
					className={`slider ${interactedGrowth ? "active" : "inactive"}`}
					value={valueGrowth}
					onChange={(e) => {
						setValueGrowth(Number(e.target.value));
						setInteractedGrowth(true);
					}}
				/>
				<p>
					<strong>{choicesGrowth[valueGrowth]}</strong>
				</p>
			</div>

			<div className="slideritem">
				<h3>Pruning</h3>
				<input
					type="range"
					min="0"
					max="3"
					className={`slider ${interactedPruning ? "active" : "inactive"}`}
					value={valuePruning}
					onChange={(e) => {
						setValuePruning(Number(e.target.value));
						setInteractedPruning(true);
					}}
				/>
				<p>
					<strong>{choicesPruning[valuePruning]}</strong>
				</p>
			</div>

			<button type="button" onClick={resetFilters} className="reset-button">
				RESET
			</button>
		</div>
	);
};

export default Filterssliders;
