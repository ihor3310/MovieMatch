// src/App.js
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDMfja8IRBhmj5XirkJvF_J_ar_qzYiOTM" });

function App() {
  const [aiResp, setAIRes] = useState('');
  const [loading, setLoading] = useState(false);

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAIRes('');

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Ти фільмознавець і давай відповідь на промт який зараз отримаєш максимально серйозно, ти повнен дійсно допомогти і якщо треба - довго подумати, отже:\n
      дай мені три фільми які НАЙКРАЩЕ підійдуть під такі категорії які я зараз напишу. ТИ МАЄШ лише написати три назви фільму і роки уих фільмів:\n\n
      1) жанр: ${input1}\n
      2) нахил (тобто який би жанр не був, нахил повинен його посилювати або навпаки помʼякшувтаи і шукати щось помірне): ${input3} \n
      3) і найголовніше - назва фільму який мені сподобався і хочу щоб ти за цими троьма критеріями знайшов підходящий (тобто за схожим вайбіком): ${input2}

      \n\nще раз повторю лише три назви фільмів мовою оригіналу, дати до них. Самі фільми разом з їхніми датами мають бути розділені комою, а між фільмом і датою - знак долара: і ніяких більше слів/символів/букв/виділень - зовсім`,
    });
    console.log(response);
    setAIRes(response.text || JSON.stringify(response));

    const [omdbMovies, setOmdbMovies] = useState([]);
    const titles = response.text.split(",").map(s => s.trim());
    const fetchOMDB = async () => {
      const movies = await Promise.all(
        titles.map(async (entry) => {
          const [title, year] = entry.split("$");
          const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=8ebfbe58`;
          const res = await fetch(url);
          return res.json();
        })
      );
      setOmdbMovies(movies);
    };
    fetchOMDB();


    setLoading(false);
  };



  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 head-font">AI-movies secret club</h1>
      <p className="text-center head-font2">Explore films — with AI-generated offers</p>
      <p className="text-center head-font3">Suggestions are created based on your preferences and desires at the moment</p>
      <p className="text-center head-font4">Select three categories for the best movie search, or leave some blank for a more general search</p>
      <p className="text-center head-font5">Сlick on search several times to get more information</p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row mb-3 search-form">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Genre"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Tilt (film direction)"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="A vibe from another movie that is similar to (the name of this movie)"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading..' : 'Search'}
          </button>
        </div>
      </form>

      {omdbMovies.length > 0 && (
      <div className="mt-4">
        {omdbMovies.map((movie, idx) => (
          <div key={idx} className="p-3 mb-3 border rounded bg-white">
            <h4>{movie.Title} ({movie.Year})</h4>
            <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: "200px" }} />
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        ))}
      </div>
    )}

    </div>
  );
}

export default App;
