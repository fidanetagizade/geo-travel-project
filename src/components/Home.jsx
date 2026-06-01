import "./Home.css"
import Header from "./Header";
import { useEffect, useState } from "react";

function Home() {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca3,borders`)
            .then(res => res.json())
            .then(data => {
                setCountries(data);
                console.log(data);
            })
            .catch(err => console.log("Xəta baş verdi:", err));

    }, [])

    return (
        <div>
            <Header />
            <div className="countries-container">
                {countries.map((country) => {
                    return (
                        <div key={country.cca3} className="country-card">

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
        </div>
    );
}


export default Home;