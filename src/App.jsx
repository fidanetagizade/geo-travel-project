import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Tools from "./components/Tools";
import Favorites from "./components/Favorites"; 
import { useState } from "react";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    const [list, setList] = useState([]);

    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<Home list={list} setList={setList} />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/favorites" element={<Favorites list={list} setList={setList} />} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;