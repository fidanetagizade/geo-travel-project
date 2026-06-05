import { useState } from "react";
import "./Filter.css";

function Filter({ setSearchItem }) {
    
    const [localSearch, setLocalSearch] = useState("");
    
    const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    const cleanedSearch = localSearch.trim();
    setSearchItem(cleanedSearch); 
};

    return (
        <form className="filter-container" onSubmit={handleSearchSubmit}>
            <input
                className="input"
                type="text"
                placeholder="Search for a country..."
                value={localSearch} 
                onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button type="submit" className="search">SEARCH</button>
        </form>
    );
}

export default Filter;