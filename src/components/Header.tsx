import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/illustrations/Logo.png";
import "./Header.css";

const Header = () => {
	const [navClass, setNavClass] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 60) {
				setNavClass("scrolled");
			} else {
				setNavClass("");
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	return (
		<nav className={`nav ${navClass}`}>
			<div className="column-logo">
				<img src={logo} alt="logo" className="Logo" />

				<div className="ho-ligne" />
			</div>

			<h1>
				The Plant <span style={{ fontWeight: "bold" }}>Spot</span>
			</h1>

			<hr />
			<ul className="liste-lien">
				<li className="house-green">
					{" "}
					<Link to="/"> Home </Link>
				</li>{" "}
				<li className="contact">Contact </li>{" "}
				<li className="catalogue">
					<Link to="/Search"> Catalogue </Link>{" "}
				</li>
			</ul>
		</nav>
	);
};

export default Header;
