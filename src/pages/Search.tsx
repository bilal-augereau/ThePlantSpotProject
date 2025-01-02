import { useEffect, useState } from "react";
import "../components/PlantList.css";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Filterssliders from "../components/Filterssliders.tsx";
import PlantList from "../components/PlantList.tsx";
import SearchBar from "../components/SearchBar.tsx";
import "../components/SearchBar.css";
import "./Search.css";
import plantData from "../data/plants.json";

export type Plant = {
	id: number;
	index: number;
	Family: string;
	"Light tolered": string;
	Watering: string;
	"Temperature max": {
		C: number;
		F: number;
	};
	"Temperature min": {
		C: number;
		F: number;
	};
	Growth: string;
	Pruning: string;
	Img: string;
	"Common name": string;
	"Latin name": string;
};

const Search = () => {
	const [plants, setPlants] = useState<Plant[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
	const [displayedPlants, setDisplayedPlants] = useState<Plant[]>([]);
	const [showFilters, setShowFilters] = useState(false);

	const handleSearch = (searchTerm: string) => {
		const filtered = plants.filter(
			(plant) =>
				plant["Common name"].toLowerCase().includes(searchTerm) ||
				plant["Latin name"].toLowerCase().includes(searchTerm) ||
				plant.Family.toLowerCase().includes(searchTerm),
		);
		setFilteredPlants(filtered);
		setDisplayedPlants(filtered);
	};

	/* API is disabled atm due to external API fees
	
	useEffect(() => {
		const url = "https://house-plants2.p.rapidapi.com/all";
		const options = {
			method: "GET",
			headers: {
				"x-rapidapi-key": "f7d7a6cec8mshc1d48ccb38fedeep1077a0jsn585dfb20d4b4",
				"x-rapidapi-host": "house-plants2.p.rapidapi.com",
			},
		};

		fetch(url, options)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						"Une erreur s'est produite lors de la récupération des données",
					);
				}
				return response.json();
			})
			.then((data) => {
				const formattedData = data.map((plant: Plant) => ({
					id: Number(plant.id),
					Family: plant.Family || "",
					"Light tolered": plant["Light tolered"] || "",
					Watering: plant.Watering || "",
					"Temperature max": plant["Temperature max"] || 0,
					"Temperature min": plant["Temperature min"] || 0,
					Growth: plant.Growth || "",
					Pruning: plant.Pruning || "",
					Difficulties: plant.Difficulties || "",
					C: plant.C || "",
					Img: plant.Img || "",
					"Common name": Array.isArray(plant["Common name"]) ? plant["Common name"].join(", ") : plant["Common name"] || "",
					"Latin name": plant["Latin name"] || "",
				}));
				setPlants(formattedData);
				setFilteredPlants(formattedData);
				setDisplayedPlants(formattedData);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []); */

	useEffect(() => {
		try {
			// fichier JSON
			const formattedData = plantData.map((plant, index) => ({
				id: Number(plant.id),
				index: index,
				Family: plant.Family || "",
				"Light tolered": plant["Light tolered"] || "",
				Watering: plant.Watering || "",
				"Temperature max": plant["Temperature max"] || { C: 0, F: 0 },
				"Temperature min": plant["Temperature min"] || { C: 0, F: 0 },
				Growth: plant.Growth || "",
				Pruning: plant.Pruning || "",
				Img: plant.Img || "",
				"Common name": Array.isArray(plant["Common name"])
					? plant["Common name"].join(", ")
					: plant["Common name"] || "",
				"Latin name": plant["Latin name"] || "",
			}));
			setPlants(formattedData);
			setFilteredPlants(formattedData);
			setDisplayedPlants(formattedData);
			setLoading(false);
		} catch (err) {
			setError("Erreur lors du chargement des données");
			setLoading(false);
		}
	}, []);

	if (loading)
		return (
			<Stack
				sx={{
					color: "grey.500",
					height: "100vh",
					justifyContent: "center",
					alignItems: "center",
				}}
				spacing={2}
				direction="row"
			>
				<CircularProgress color="success" />
			</Stack>
		);
	if (error) return <div>Erreur: {error}</div>;

	return (
		<div className="search">
			<SearchBar
				onSearch={handleSearch}
				showFilters={showFilters}
				setShowFilters={setShowFilters}
			/>
			<div>
				{showFilters && (
					<Filterssliders
						plants={filteredPlants}
						setDisplayedPlants={setDisplayedPlants}
					/>
				)}
			</div>
			<div>
				<div className="plant-card">
					<table>
						<thead>
							<tr className="plant-htitles-desktop">
								<th>Plants</th>
								<th>Common Name / Family / Latin Name</th>
								<th>Light tolered</th>
								<th>Watering</th>
								<th>Temperature</th>
								<th>Growth</th>
								<th>Pruning</th>
								<th>Global Difficulty</th>
							</tr>
						</thead>
						<tbody>
							{displayedPlants.map((plant, index) => (
								<PlantList key={plant.id} plant={plant} index={index} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Search;
