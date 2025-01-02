import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { QuizProvider } from "./contexts/QuizContext";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
	return (
		<QuizProvider>
			<Router>
				<Header />
				<div>
					{/* Navigation */}

					{/* Routes */}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/search" element={<Search />} />
					</Routes>
				</div>
				<Footer />
			</Router>
		</QuizProvider>
	);
}

export default App;
