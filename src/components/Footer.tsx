import "./Footer.css";
import logoFace from "../img/picto/Face.png";
import logoInsta from "../img/picto/Insta.png";
import logolink from "../img/picto/link.png";

const Footer = () => {
	return (
		<footer>
			<div className="footer-left">
				<p>© The Plant Spot</p>
			</div>

			<div className="footer-center">
				<a
					href="https://www.instagram.com/?hl=fr"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={logoInsta} alt="Logo Instagram" />
				</a>
				<a
					href="https://www.linkedin.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={logolink} alt="Logo LinkedIn" />
				</a>
				<a
					href="https://www.facebook.com/?locale=fr_FR"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={logoFace} alt="Logo Facebook" />
				</a>
			</div>

			<div className="footer-right">
				<a href="/terms">Terms & Conditions</a>
				<a href="/privacy">Privacy</a>
			</div>
		</footer>
	);
};

export default Footer;
