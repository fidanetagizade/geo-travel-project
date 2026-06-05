import { useState } from "react";
import "./Favorites.css";
import Header from "./Header";

function Favorites({ list, setList }) {
    const [visibleCount, setVisibleCount] = useState(12);

    const removeFromFavorites = (country) => {
        setList(list.filter(item => item.cca3 !== country.cca3));
    };

    return (
        <div>
            <Header />
            <div className="main">
                <h1 className="favorite-input">
                    My Favorite Countries!
                </h1>
                
                {list.length === 0 ? (
                    <h2 className="not-found-msg" style={{ marginTop: "50px" }}>
                        Your favorite list is empty...
                    </h2>
                ) : (
                    <>
                        <div className="countries-container">
                            {list.slice(0, visibleCount).map((country) => (
                                <div key={country.cca3} className="country-card">
                                    <button 
                                        className="heart-btn" 
                                        onClick={() => removeFromFavorites(country)}
                                    >
                                        ❤️
                                    </button>

                                    <img
                                        src={country.flags.png}
                                        alt={`${country.name.common} bayrağı`}
                                        className="country-flag"
                                    />
                                    <div className="country-details">
                                        <h3>{country.name.common}</h3>
                                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                                        <p><strong>Region:</strong> {country.region}</p>
                                        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {list.length > visibleCount && (
                            <div className="btn-container">
                                <button 
                                    className="show-more-btn" 
                                    onClick={() => setVisibleCount(prev => prev + 12)}
                                >
                                    Show More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Favorites;