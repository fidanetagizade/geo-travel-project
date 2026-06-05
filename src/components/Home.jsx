import "./Home.css";
import Filter from "./Filter";
import Header from "./Header";
import { useEffect, useState } from "react";


function Home({ list, setList }) {
    const [countries, setCountries] = useState([]);
    const [visibleCount, setVisibleCount] = useState(15);
    const [searchItem, setSearchItem] = useState("");
    
    

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca3,borders`)
            .then(res => res.json())
            .then(data => {
                setCountries(data);
                console.log(data);
            })
            .catch(err => console.log("Xəta baş verdi:", err));
    }, []);

    
    const toggleBucketList = (country) => {
        const isExist = list.some(item => item.cca3 === country.cca3);
        if (isExist) {
            setList(list.filter(item => item.cca3 !== country.cca3));
        } else {
            setList([...list, country]);
        }
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchItem.toLowerCase())
    );

    return (
        <div>
            <Header />
            <Filter setSearchItem={setSearchItem} />
            <div className="main">
                
                {filteredCountries.length === 0 ? (
                    <h2 className="not-found-msg">Country not found...</h2>
                ) : (
                    <div className="countries-container">
                        {filteredCountries.slice(0, visibleCount).map((country) => {
                            const isFavorite = list.some(item => item.cca3 === country.cca3);

                            return (
                                <div key={country.cca3} className="country-card">
                                    
                                    
                                    <button 
                                        className="heart-btn" 
                                        onClick={() => toggleBucketList(country)}
                                    >
                                        {isFavorite ? '❤️' : '🤍'}
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
                            );
                        })}
                    </div>
                )}

                {filteredCountries.length > visibleCount && (
                    <div className="btn-container">
                        <button className="show-more-btn" onClick={() => setVisibleCount(visibleCount + 12)}>
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;