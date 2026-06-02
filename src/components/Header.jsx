import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header-container">
            <h1 className="header-title">GeoTravel</h1>
            <nav className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/tools" className="nav-link">Tools</Link>
                <Link to="/quiz" className="nav-link">Quiz</Link>
            </nav>
        </header>
    );
}

export default Header;