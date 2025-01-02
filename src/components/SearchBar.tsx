import { useState } from "react";
import "./SearchBar.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importation des icônes Font Awesome

export interface SearchBarProps {
	onSearch: (searchTerm: string) => void;
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({
	onSearch,
	showFilters,
	setShowFilters,
}: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value;
		setSearchTerm(term);
		onSearch(term);
	};

	const toggleFilters = () => {
		setShowFilters((prevState) => !prevState);
	};

	return (
		<div className="searchkit">
			<div className="search-bar-container">
				<i className="fas fa-seedling search-icon" />
				<input
					type="text"
					className="search-bar"
					placeholder="Search a plant..."
					value={searchTerm}
					onChange={handleChange}
				/>
			</div>
			<button type="button" className="dropdown-button" onClick={toggleFilters}>
				{showFilters ? "Hide Filters" : "Show Filters"}
			</button>
		</div>
	);
};

export default SearchBar;
