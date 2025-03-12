import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [telescopes, setTelescopes] = useState([]);
    const [eyepieces, setEyepieces] = useState([]);
    const [selectedTelescope, setSelectedTelescope] = useState("");
    const [selectedEyepiece, setSelectedEyepiece] = useState("");
    useEffect(() => {
        axios.get("http://localhost:5000/telescopes")
        .then(res => {
            console.log("Telescopes Data:", res.data);  // Log telescope data
            setTelescopes(res.data);
        })
        .catch(error => console.error("Error fetching telescopes:", error));
    
        axios.get("http://localhost:5000/Eyepieces")  
        .then(res => {
            console.log("Eyepieces Data:", res.data);  // Log eyepiece data
            setEyepieces(res.data);
        })
        .catch(error => console.error("Error fetching eyepieces:", error));
    }, []);
    

    return (
        <div className="dashboard">
            <nav className="navbar">Virtual Telescope Dashboard</nav>
    
            <div className="controls">
                {/* Telescope Dropdown */}
                <label>Telescope:</label>
                <select 
                    value={selectedTelescope} 
                    onChange={(e) => setSelectedTelescope(e.target.value)}
                >
                    <option value="">Select a telescope</option>
                    {telescopes.map((t) => (
                        <option key={t._id} value={t.tel_name}>{t.tel_name}</option>
                    ))}
                </select>
    
                {/* Eyepiece Dropdown */}
                <label>Eyepiece:</label>
                <select 
                    value={selectedEyepiece} 
                    onChange={(e) => setSelectedEyepiece(e.target.value)}
                >
                    <option value="">Select an eyepiece</option>
                    {eyepieces.map((e) => (
                        <option key={e._id} value={e.focal_length}>
                            {e.focal_length}mm
                        </option>
                    ))}
                </select>
            </div>
    
            <div className="sky-map">
                <h2>Sky Map</h2>
                <div className="solar-system">
                    {["Sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"].map((obj) => (
                        <div key={obj} className="planet" title={obj}>
                            {obj[0]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
    
};

export default App;
