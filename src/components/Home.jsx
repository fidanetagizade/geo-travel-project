import "./Home.css";
import Filter from "./Filter";
import Header from "./Header";
import { useEffect, useState } from "react";


function Home({ list, setList }) {
    const [countries, setCountries] = useState([]);
    const [visibleCount, setVisibleCount] = useState(15);
    const [searchItem, setSearchItem] = useState("");
    
    

 useEffect(() => {
    fetch(`https://api.restcountries.com/countries/v5?limit=100`, {
        headers: {
            'Authorization': 'Bearer ' + import.meta.env.VITE_API_KEY
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);

            const rawList = json.data.objects; 

            const normalized = rawList.map(country => ({
                name: { common: country.names.common },
                flags: { png: country.flag.url_png },
                region: country.region,
                capital: country.capitals?.map(c => c.name) || [],
                population: country.population,
                cca3: country.codes.alpha_3,
                borders: country.borders,
            }));

            setCountries(normalized);
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