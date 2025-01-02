import "./PlantList.css";
import { useState } from "react";
import difficultiesImg from "../img/picto/difficulties.png";
import difficultiesBWImg from "../img/picto/difficultiesBW.png";
import dropImg from "../img/picto/drop.png";
import dropBWImg from "../img/picto/dropBW.png";
import growthImg from "../img/picto/hibiscus.png";
import growthBWImg from "../img/picto/hibiscusBW.png";
import pruningImg from "../img/picto/pruning-shears.png";
import pruningBWImg from "../img/picto/pruning-shearsBW.png";
import sunImg from "../img/picto/sun.png";
import sunBWImg from "../img/picto/sunBW.png";
import thermometerImg from "../img/picto/thermometer.png";
import thermometerBWImg from "../img/picto/thermometerBW.png";
import type { Plant } from "../pages/Search.tsx";

const getLightDifficulty = (lightType: string): number => {
	switch (lightType) {
		case "Full sun (+21,500 lux /+2000 fc )":
			return 3; // Difficile
		case "Strong light ( 21,500 to 3,200 lux/2000 to 300 fc)":
			return 2; // Moyenne
		case "Diffuse light ( Less than 5,300 lux / 500 fc)":
			return 1; // Facile
		default:
			return 0;
	}
};

const getWateringDifficulty = (wateringType: string): number => {
	switch (wateringType) {
		case "Keep moist between watering & Must not dry between watering":
			return 2; // Moyenne
		case "Water when soil is half dry & Can dry between watering":
			return 1; // Facile
		case "Change water regularly in the cup & Water when soil is half dry":
			return 3; // Difficile
		case "Must dry between watering & Water only when dry":
			return 1; // Facile
		case "Water when soil is half dry & Change water regularly in the cup":
			return 3; // Difficile
		default:
			return 0;
	}
};

const getTemperatureDifficulty = (minTemp: number, maxTemp: number): number => {
	if (minTemp === undefined || maxTemp === undefined) return 0;

	const range = maxTemp - minTemp;
	if (range < 15) {
		return 3; // Difficile
	}
	if (range >= 15 && range < 25) {
		return 2; // Moyenne
	}
	if (range >= 25) {
		return 1; // Facile
	}
	return 0;
};

const getGrowthDifficulty = (growthType: string): number => {
	switch (growthType) {
		case "Slow":
			return 3; // Difficile
		case "Regular":
		case "Seasonal":
			return 2; // Moyenne
		case "Fast":
			return 1; // Facile
		default:
			return 0;
	}
};

const getPruningDifficulty = (pruningType: string): number => {
	switch (pruningType) {
		case "Never":
			return 1; // Facile
		case "After blooming":
			return 2; // Moyenne
		case "If needed":
			return 3; // Difficile
		default:
			return 0;
	}
};

const calculateAverageDifficulty = (plant: Plant): number => {
	const lightDifficulty = getLightDifficulty(plant["Light tolered"]);
	const wateringDifficulty = getWateringDifficulty(plant.Watering);
	const temperatureDifficulty = getTemperatureDifficulty(
		plant["Temperature min"].C,
		plant["Temperature max"].C,
	);
	const growthDifficulty = getGrowthDifficulty(plant.Growth);
	const pruningDifficulty = getPruningDifficulty(plant.Pruning);

	const totalDifficulty =
		lightDifficulty +
		wateringDifficulty +
		temperatureDifficulty +
		growthDifficulty +
		pruningDifficulty;
	const averageDifficulty = totalDifficulty / 5;
	return averageDifficulty;
};

const getDifficultyImage = (averageDifficulty: number) => {
	if (averageDifficulty <= 1.5) {
		return [difficultiesImg, difficultiesBWImg, difficultiesBWImg]; // Facile
	}
	if (averageDifficulty > 1.5 && averageDifficulty <= 3) {
		return [difficultiesImg, difficultiesImg, difficultiesBWImg]; // Moyenne
	}
	if (averageDifficulty > 3) {
		return [difficultiesImg, difficultiesImg, difficultiesImg]; // Difficile
	}
	return null;
};

const getLightImage = (lightType: string) => {
	switch (lightType) {
		case "Diffuse light ( Less than 5,300 lux / 500 fc)":
			return [sunImg, sunBWImg, sunBWImg];
		case "Strong light ( 21,500 to 3,200 lux/2000 to 300 fc)":
			return [sunImg, sunImg, sunBWImg];
		case "Full sun (+21,500 lux /+2000 fc )":
			return [sunImg, sunImg, sunImg];
		default:
			return null;
	}
};

const getDropImage = (dropType: string) => {
	if (
		dropType.includes("half dry & Can dry") ||
		dropType.includes("watering & Water only when dry")
	) {
		return [dropImg, dropBWImg, dropBWImg];
	}
	if (dropType.includes("Keep moist between")) {
		return [dropImg, dropImg, dropBWImg];
	}
	if (
		dropType.includes("in the cup & Water") ||
		dropType.includes("half dry & Change water")
	) {
		return [dropImg, dropImg, dropImg];
	}
	return null;
};

const getGrowthImage = (growthType: string) => {
	switch (growthType) {
		case "Slow":
			return [growthImg, growthBWImg, growthBWImg];
		case "Regular":
		case "Seasonal":
			return [growthImg, growthImg, growthBWImg];
		case "Fast":
			return [growthImg, growthImg, growthImg];
		default:
			return null;
	}
};

const getPruningImage = (pruningType: string) => {
	switch (pruningType) {
		case "Never":
			return [pruningImg, pruningBWImg, pruningBWImg];
		case "After blooming":
			return [pruningImg, pruningImg, pruningBWImg];
		case "If needed":
			return [pruningImg, pruningImg, pruningImg];
		default:
			return null;
	}
};

const getTemperatureImage = (minTemp: number, maxTemp: number) => {
	const range = maxTemp - minTemp;
	if (range < 15) {
		return [thermometerImg, thermometerBWImg, thermometerBWImg];
	}
	if (range >= 15 && range < 25) {
		return [thermometerImg, thermometerImg, thermometerBWImg];
	}
	if (range >= 25) {
		return [thermometerImg, thermometerImg, thermometerImg];
	}
	return null;
};

interface PlantListProps {
	plant: Plant;
	index: number;
}

const PlantList = ({ plant, index }: PlantListProps) => {
	const averageDifficulty = calculateAverageDifficulty(plant);
	const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

	const handlePlantClick = (plant: Plant) => {
		setSelectedPlant(plant);
	};

	const handleCloseCard = () => {
		setSelectedPlant(null);
	};
	return (
		<>
			<tr
				className={`main-display ${index % 2 === 0 ? "even-background" : "odd-background"}`}
				key={plant.id}
			>
				<td className="imgplant-column">
					{selectedPlant && (
						<div>
							<img
								className="imgplantsized"
								src={plant.Img}
								alt={plant.Family}
								width="200"
							/>
							<button
								className="close-button"
								type="button"
								onClick={handleCloseCard}
							>
								Close
							</button>
						</div>
					)}
					{!selectedPlant && (
						<div
							className="imgplant-container"
							onClick={() => handlePlantClick(plant)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handlePlantClick(plant);
								}
							}}
						>
							<img className="imgplant" src={plant.Img} alt={plant.Family} />
							<div className="imgoverlay">
								<div className="imgtext">View more</div>
							</div>
						</div>
					)}
				</td>
				<td className="details-column">
					<p className="commonname">{plant["Common name"]}</p>
					<p className="plantfamily">{plant.Family}</p>
					<p className="latinname">{plant["Latin name"]}</p>
				</td>

				{/* Groupes d'images */}
				<td className="images-column">
					<div className="image-group">
						{getLightImage(plant["Light tolered"])?.map((image, index) => (
							<img
								key={`Light tolered ${plant.id}-${index}`}
								src={image}
								alt={plant["Light tolered"]}
								title={plant["Light tolered"]}
								className="colpic"
							/>
						))}
						{selectedPlant && (
							<div className="picdetails">
								<h2>
									Light Tolerance: <br />
								</h2>
								<p className="descpic">{plant["Light tolered"]}</p>
							</div>
						)}
					</div>
				</td>
				<td className="images-column">
					<div className="image-group">
						{getDropImage(plant.Watering)?.map((image, index) => (
							<img
								key={`Watering ${plant.id}-${index}`}
								src={image}
								alt={plant.Watering}
								title={`${plant.Watering}`}
								className="colpic"
							/>
						))}
						{selectedPlant && (
							<div className="picdetails">
								<h2>
									{" "}
									Watering: <br />
								</h2>
								<p className="descpic">{plant.Watering}</p>
							</div>
						)}
					</div>
				</td>
				<td className="images-column">
					<div className="image-group">
						{getTemperatureImage(
							plant["Temperature min"].C,
							plant["Temperature max"].C,
						)?.map((image, index) => {
							const range =
								plant["Temperature max"].C - plant["Temperature min"].C;
							return (
								<img
									key={`Temperature ${plant.id}-${index}`}
									src={image}
									alt="Temperature"
									title={`${range}`}
									className="colpic"
									width="50"
								/>
							);
						})}
						{selectedPlant && (
							<div className="picdetails">
								<h2>
									Temperature range: <br />
								</h2>
								<p className="descpic">
									{plant["Temperature min"].C}-{plant["Temperature max"].C}°C
								</p>
							</div>
						)}
					</div>
				</td>
				<td className="images-column">
					<div className="image-group">
						{getGrowthImage(plant.Growth)?.map((image, index) => (
							<img
								key={`Growth ${plant.id}-${index}`}
								src={image}
								alt={plant.Growth}
								title={`${plant.Growth}`}
								className="colpic"
							/>
						))}
						{selectedPlant && (
							<div className="picdetails">
								<h2>
									Growth: <br />
								</h2>
								<p className="descpic">{plant.Growth}</p>
							</div>
						)}
					</div>
				</td>
				<td className="images-column">
					<div className="image-group">
						{getPruningImage(plant.Pruning)?.map((image, index) => (
							<img
								key={`Pruning ${plant.id}-${index}`}
								src={image}
								alt={plant.Pruning}
								title={`${plant.Pruning}`}
								className="colpic"
							/>
						))}
						{selectedPlant && (
							<div className="picdetails">
								<h2>
									Pruning: <br />
								</h2>
								<p className="descpic">{plant.Pruning}</p>
							</div>
						)}
					</div>
				</td>
				<td className="images-column">
					<div className="image-group">
						{getDifficultyImage(averageDifficulty)?.map((image, index) => (
							<img
								key={`Difficulty ${plant.id}-${index}`}
								src={image}
								alt="Difficulty"
								title={`${averageDifficulty}`}
								className="colpic"
							/>
						))}
						{selectedPlant && (
							<div className="picdetails">
								<h2>
									Difficulty: <br />
								</h2>
								<p className="descpic">{averageDifficulty}</p>
							</div>
						)}
					</div>
				</td>
			</tr>

			{/*petites résolutions */}
			<div className="details-display">
				<img
					className="imgplant"
					src={plant.Img}
					alt={plant.Family}
					width="100"
				/>
				<div className="card-details">
					<p className="commonname">{plant["Common name"]}</p>
					<p className="plantfamily">{plant.Family}</p>
					<p className="latinname">{plant["Latin name"]}</p>
					<div className="imagegroup">
						<img
							src="src/img/picto/sun.png"
							alt={plant["Light tolered"]}
							title={plant["Light tolered"]}
							className="colpic"
						/>
						<img
							src="src/img/picto/drop.png"
							alt={plant.Watering}
							title={`${plant.Watering}`}
							className="colpic"
						/>
						<img
							src="src/img/picto/thermometer.png"
							alt={`${plant["Temperature min"].C} & ${plant["Temperature max"].C}°C`}
							title={`${plant["Temperature min"].C} & ${plant["Temperature max"].C}°C`}
							className="colpic"
						/>
						<img
							src="src/img/picto/hibiscus.png"
							alt={plant.Growth}
							title={`${plant.Growth}`}
							className="colpic"
						/>
						<img
							src="src/img/picto/pruning-shears.png"
							alt={plant.Pruning}
							title={`${plant.Pruning}`}
							className="colpic"
						/>
						<img
							src="src/img/picto/difficulties.png"
							alt="Difficulty"
							title={`${averageDifficulty}`}
							className="colpic"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export {
	getLightDifficulty,
	getWateringDifficulty,
	getTemperatureDifficulty,
	getGrowthDifficulty,
	getPruningDifficulty,
	calculateAverageDifficulty,
};
export default PlantList;
