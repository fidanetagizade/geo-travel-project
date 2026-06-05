import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Tools from "./components/Tools";
import Favorites from "./components/Favorites"; 
import { useState } from "react";

function App() {
    const [list, setList] = useState([]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home list={list} setList={setList} />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/favorites" element={<Favorites list={list} setList={setList} />} />
            </Routes>
        </div>
    );
}

export default App;