import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LearningHub.css";

const LearningHub = () => {
  const [tutorials, setTutorials] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [activeTutorial, setActiveTutorial] = useState(null);

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tutorials");
        setTutorials(res.data);
      } catch (err) {
        console.log("API error:", err.message);
      }
    };

    fetchData();
  }, []);

  // ======================
  // FILTER LOGIC
  // ======================
  const filtered = tutorials.filter((t) => {
    const matchLang =
      selectedLanguage === "all" || t.language === selectedLanguage;

    const matchCat =
      selectedCategory === "all" || t.category === selectedCategory;

    const matchSearch =
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase());

    return matchLang && matchCat && matchSearch;
  });

  // ======================
  // UI
  // ======================
  return (
    <div className="hub">

      {/* HEADER */}
      <div className="hub-header">
        <h1>📘 Learning Hub</h1>
        <p>Learn Programming by Language & Category</p>

        <input
          type="text"
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTERS */}
      <div className="filters">

        <select onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="all">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>

        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="basics">Basics</option>
          <option value="data-structures">Data Structures</option>
          <option value="algorithms">Algorithms</option>
          <option value="oop">OOP</option>
          <option value="advanced">Advanced</option>
        </select>

      </div>

      {/* CONTENT */}
      {!activeTutorial ? (
        <div className="grid">

          {filtered.length > 0 ? (
            filtered.map((t) => (
              <div
                key={t._id}
                className="card"
                onClick={() => setActiveTutorial(t)}
              >

                <div className="badge">
                  {t.language?.toUpperCase()}
                </div>

                <h3>{t.title}</h3>
                <p>{t.description}</p>

                <span className="category">
                  {t.category}
                </span>

              </div>
            ))
          ) : (
            <div className="empty">
              No tutorials found
            </div>
          )}

        </div>
      ) : (
        <div className="detail">

          <button onClick={() => setActiveTutorial(null)}>
            ← Back
          </button>

          <h1>{activeTutorial.title}</h1>
          <p>{activeTutorial.description}</p>

          <pre>{activeTutorial.content}</pre>

        </div>
      )}

    </div>
  );
};

export default LearningHub;